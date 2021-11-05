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
import { Home } from './app/pages/home';
import { NarcList } from './features/narc/listing/narcList';



function App() {
    const {username, signedIn} = useSelector((state: RootState) => state.user);
    return (
        <div className="App">
            <nav>
                <AmplifySignOut  buttonText={`Sign out ${username}`}/>
            </nav>
            <header className="App-header">
                <Routes>
                    <Route index element={<Home />}/>
                    {signedIn && <Route path="/narc" element={<NarcForm/>}/>}
                    <Route path="/list" element={<NarcList />} />
                </Routes>
            </header>
        </div>
    )
        ;
}


export default withAuthenticator(App);
