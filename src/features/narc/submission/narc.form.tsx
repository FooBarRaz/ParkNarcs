import React from 'react';
import {ErrorMessage, Field, Form, Formik, useFormik} from 'formik';
import {useDispatch} from "react-redux";
import {narcABitchOut} from "../narc.slice";
import {useNavigate} from 'react-router-dom';
import {withAuthenticator} from "@aws-amplify/ui-react";
import {makeStyles} from "@mui/styles";
import {Button, TextField} from '@mui/material';

const useStyles = makeStyles({
    content: {
        display: 'flex',
        flexDirection: 'column',
        margin: '1em'

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
    const {content} = useStyles();

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
            <form onSubmit={formik.handleSubmit}> {
                (['comment', 'location', 'licensePlate', 'state'] as Array<keyof FormFields>).map((field: keyof FormFields) => (
                    < TextField
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
