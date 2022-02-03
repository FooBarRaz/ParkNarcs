import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import { narcABitchOut } from "../narc.slice";
import { useNavigate } from 'react-router-dom';
import { Storage } from 'aws-amplify';
import { withAuthenticator } from "@aws-amplify/ui-react";
import { makeStyles } from "@mui/styles";
import { Button, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import { US_STATES } from '../../../data/states';
import Resizer from 'react-image-file-resizer';

const useStyles = makeStyles({
    content: {
        margin: '1em',
        justifyContent: 'space-around'
    },
    inputField: {
        marginBottom: '0.5em'
    }

})

type FormFields = {
    comment: string;
    location: string;
    licensePlate: string;
    state: string;
}

export const NarcForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imageKey, setImageKey] = useState<string>('');
    const {content, inputField: inputFieldStyle} = useStyles();

    const formik = useFormik<FormFields>({
        initialValues: {comment: '', location: '', licensePlate: '', state: ''},
        validationSchema: yup.object({
            comment: yup.string().required(),
            location: yup.string().required(),
            licensePlate: yup.string().required(),
            state: yup.string().max(2),
        }),
        onSubmit: (values) => {
            const request = {...values, image: imageKey};
            if (!!imageKey) {
                console.log('submitting...', request);
                dispatch(narcABitchOut(request));
                navigate('/');
            }
        },
    });

    function resizeImage(file: File): Promise<File> {
        const maxSize = 1280;
        return new Promise(resolve => {
            Resizer.imageFileResizer(file,
                maxSize,
                maxSize,
                'WEBP',
                100,
                0,
                uri => resolve(uri as File),
                'file')
        })
    }

    async function onUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = (e.target.files || [])[0];
        const resizedFile = await resizeImage(file);
        try {
            let key = nanoid();
            await Storage.put(key, resizedFile, {
                contentType: "image/webp", // contentType is optional
            }).then((result) => {
                console.log('file upload result: ', result);
                setImageKey(key);
            });
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }

    return (
        <div>
            <Typography variant={'h6'}>Narc 'em out</Typography>
            <form className={content} onSubmit={formik.handleSubmit}>
                {
                    (['comment', 'location', 'licensePlate'] as Array<keyof FormFields>).map((field: keyof FormFields) => (
                        < TextField
                            className={inputFieldStyle}
                            key={`input-${field}`}
                            fullWidth
                            id={field}
                            name={field}
                            label={field}
                            type={field}
                            value={formik.values[field]}
                            onChange={formik.handleChange}
                            error={formik.touched[field] && Boolean(formik.errors[field])}
                            helperText={formik.touched[field] && formik.errors[field]}
                        />
                    ))
                }
                <FormControl fullWidth className={inputFieldStyle}>
                    <InputLabel>State</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={US_STATES[formik.values.state as keyof typeof US_STATES]}
                        label="State"
                        onChange={formik.handleChange}
                    >
                        {Object.entries(US_STATES).map(([stateAbbrv, stateLabel]) => {
                            return <MenuItem value={stateAbbrv}>{stateLabel}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <label htmlFor="contained-button-file">
                    <input
                        style={{display: 'none'}}
                        name="image"
                        accept="image/*"
                        id="contained-button-file"
                        onChange={onUploadImage}
                        multiple type="file"/>
                    <Button variant="contained" component="span">
                        Upload
                    </Button>
                </label>
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};


export default withAuthenticator(NarcForm);
