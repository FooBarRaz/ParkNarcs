import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import { narcABitchOut } from "../narc.slice";
import { useNavigate } from 'react-router-dom';
import { withAuthenticator } from "@aws-amplify/ui-react";
import { makeStyles } from "@mui/styles";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { US_STATES } from '../../../data/states';
import Resizer from 'react-image-file-resizer';
import { ImagePreview } from './ImagePreview';
import CameraIcon from '@mui/icons-material/CameraAlt';

const useStyles = makeStyles({
    content: {
        margin: '1rem',
        marginTop: '5rem',
        justifyContent: 'space-around'
    },
    inputField: {
        marginBottom: '1rem'
    }
})

type FormFields = {
    comment: string;
    location: string;
    licensePlate: string;
    state: string;
}

export const formFieldLabels: Record<keyof FormFields, string> = {
    comment: 'Comment',
    location: 'Location',
    licensePlate: 'License Plate Number',
    state: 'License Plate State',
}

export const NarcForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imageKey, setImageKey] = useState<string>('');
    const {content, inputField: inputFieldStyles} = useStyles();

    const formik = useFormik<FormFields>({
        initialValues: {comment: '', location: '', licensePlate: '', state: ''},
        validationSchema: yup.object({
            comment: yup.string().required(),
            location: yup.string().required(),
            licensePlate: yup.string().matches(/^\w+(-?)\w+$/).required(),
            state: yup.string().max(2),
        }),
        onSubmit: (values) => {
            const request = {...values, image: imageKey};
            if (!!imageKey) {
                dispatch(narcABitchOut(request));
                navigate('/');
            }
        },
    });

    function resizeImage(file: File): Promise<string> {
        const maxSize = 1280;
        return new Promise(resolve => {
            Resizer.imageFileResizer(file,
                maxSize,
                maxSize,
                'WEBP',
                100,
                0,
                uri => resolve(uri as string),
            )
        })
    }

    async function onUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = (e.target.files || [])[0];
        const resizedFile = await resizeImage(file);
        setImageKey(resizedFile)
    }

    return (
        <div>
            {/*<Typography variant={'h6'}>Narc 'em out</Typography>*/}
            <form className={content} onSubmit={formik.handleSubmit}>
                {
                    (['comment', 'location', 'licensePlate'] as Array<keyof FormFields>).map((field: keyof FormFields) => (
                        <Box id={`input-box-${field}`} className={inputFieldStyles}>
                            < TextField
                                className={inputFieldStyles}
                                key={`input-${field}`}
                                fullWidth
                                id={field}
                                name={field}
                                label={formFieldLabels[field]}
                                type={field}
                                value={formik.values[field]}
                                onChange={formik.handleChange}
                                error={formik.touched[field] && Boolean(formik.errors[field])}
                                helperText={formik.touched[field] && formik.errors[field]}
                                variant="standard"
                            />
                        </Box>
                    ))
                }
                <Box className={inputFieldStyles}>
                    <FormControl fullWidth>
                        <TextField
                            select
                            value={US_STATES[formik.values.state as keyof typeof US_STATES]}
                            name="state"
                            onChange={formik.handleChange}
                            label={formFieldLabels['state']}
                            variant="standard"
                        >
                            {Object.entries(US_STATES).map(([stateAbbrv, stateLabel]) => {
                                return <MenuItem value={stateAbbrv}>{stateLabel}</MenuItem>
                            })}
                        </TextField>
                    </FormControl>
                </Box>
                <Box className={inputFieldStyles}>
                    <FormControl>
                        <label htmlFor="contained-button-file">
                            <input
                                style={{display: 'none'}}
                                name="image"
                                accept="image/*"
                                id="contained-button-file"
                                onChange={onUploadImage}
                                multiple type="file"/>
                            <Button variant="contained" component="span">
                                <CameraIcon sx={{mr: 1}}/>
                                Upload Image
                            </Button>
                        </label>
                    </FormControl>
                    <ImagePreview src={imageKey} />
                </Box>
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    )
        ;
};


export default withAuthenticator(NarcForm);
