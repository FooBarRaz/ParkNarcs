import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import { narcABitchOut } from "../narc.slice";
import { useNavigate } from 'react-router-dom';
import { withAuthenticator } from "@aws-amplify/ui-react";
import { makeStyles } from "@mui/styles";
import { Button, TextField, Typography } from '@mui/material';

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
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};


export default withAuthenticator(NarcForm);
