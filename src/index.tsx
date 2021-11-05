import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {store} from './app/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import Amplify, {Auth, Hub} from 'aws-amplify';
import awsconfig from './aws-exports';
import {signIn, signOut} from "./features/user/user.slice";

Amplify.configure(awsconfig);
Auth.currentAuthenticatedUser()
    .then(({username, attributes: {sub: userId}}) =>
        store.dispatch(
            signIn({username, userId})));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);


const listener = (data: any) => {
    const {username, attributes} = data.payload.data;
    const {sub: userId} = attributes;
    switch (data.payload.event) {
        case 'signIn':
            console.log('sign in event', data.payload);
            store.dispatch(signIn({userId, username}))
            break;
        case 'signUp':
            break;
        case 'signOut':
            store.dispatch(signOut())
            break;
        case 'signIn_failure':
            break;
        case 'tokenRefresh':
            break;
        case 'tokenRefresh_failure':
            break;
        case 'configured':
            break;
    }
}

Hub.listen('auth', listener);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

