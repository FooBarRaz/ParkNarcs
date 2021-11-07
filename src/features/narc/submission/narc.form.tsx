import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import { narcABitchOut } from "../narc.slice";
import { useNavigate } from 'react-router-dom';
import { Storage } from 'aws-amplify';
import { withAuthenticator } from "@aws-amplify/ui-react";
import { makeStyles } from "@mui/styles";
import {Button, Input, TextField, Typography} from '@mui/material';
import { nanoid } from 'nanoid';

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
    const {content, inputField: inputFieldStyle} = useStyles();

    const formik = useFormik<FormFields>({
        initialValues: {comment: '', location: '', licensePlate: '', state: ''},
        onSubmit: (values) => {
            console.log('submitting...', values);
            dispatch(narcABitchOut(values));
            navigate('/');
        },
    });

    async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = (e.target.files || [])[0];
        try {
            await Storage.put(nanoid(), file, {
                contentType: "image/png", // contentType is optional
            }).then((result) => console.log('file upload result: ', result));
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }

    return (
        <div>
            <Typography variant={'h6'}>Narc 'em out</Typography>
            <form className={content} onSubmit={formik.handleSubmit}> {
                (['comment', 'location', 'licensePlate', 'state'] as Array<keyof FormFields>).map((field: keyof FormFields) => (
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
                <label htmlFor="contained-button-file">
                    <input style={{display: 'none'}} accept="image/*" id="contained-button-file" multiple type="file" />
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
