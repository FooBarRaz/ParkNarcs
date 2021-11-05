import React from 'react';
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'
import logo from './logo.svg';
import {Counter} from './features/counter/Counter';
import './App.css';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import NarcForm from "./features/narc/submission/narc.form";
import {Auth} from "aws-amplify";
import {useSelector} from "react-redux";
import {RootState} from "./app/store";

function App() {
    const {username, signedIn} = useSelector((state: RootState) => state.user);
    return (
        <div className="App">
            <nav>
                <AmplifySignOut  buttonText={`Sign out ${username}`}/>
            </nav>
            <header className="App-header">
                <Routes>
                    <Route index element={<>
                        <div>Homepage</div>
                        <Link to="/narc">Narc a bitch out</Link></>}/>
                    {signedIn && <Route path="/narc" element={<NarcForm/>}/>}
                </Routes>
            </header>
        </div>
    )
        ;
}


export default withAuthenticator(App);
