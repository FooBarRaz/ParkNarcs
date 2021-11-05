import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react'
import logo from './logo.svg';
import {Counter} from './features/counter/Counter';
import './App.css';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import NarcForm from "./features/narc/submission/narc.form";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Routes>
                    <Route index element={<>
                        <div>Homepage</div>
                        <Link to="/narc">Narc a bitch out</Link></>}/>
                    <Route path="/narc" element={<NarcForm />}/>
                </Routes>
            </header>
        </div>
    )
        ;
}


export default withAuthenticator(App);
