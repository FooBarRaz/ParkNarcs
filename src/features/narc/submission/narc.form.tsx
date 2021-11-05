// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import NarcService from './narc.service';

const NarcForm = () => (
    <div>
        <h1>Form</h1>
        <Formik
            initialValues={{ comment: '', location: '', licensePlate: '', state: ''}}
            validate={() => ({})}
            onSubmit={(values, { setSubmitting }) => {
                console.log('submitting...', values);
                NarcService.narc(values);
                // setTimeout(() => {
                //     alert(JSON.stringify(values, null, 2));
                //     setSubmitting(false);
                // }, 400);
            }}
        >
            {({ isSubmitting}) => (
                <Form>
                    <Field type="textarea" name="comment" />
                    <ErrorMessage name="comment" component="div" />
                    <Field type="text" name="licensePlate" />
                    <ErrorMessage name="licensePlate" component="div" />
                    <Field type="text" name="location" />
                    <ErrorMessage name="location" component="div" />
                    <Field type="text" name="state" />
                    <ErrorMessage name="state" component="div" />
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);

export default NarcForm;
