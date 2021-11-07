import React from 'react';
import {AmplifySignIn, withAuthenticator} from '@aws-amplify/ui-react'
import './App.css';
import {Route, Routes} from 'react-router-dom';
import NarcForm from "./features/narc/submission/narc.form";
import {useSelector} from "react-redux";
import {RootState} from "./app/store";
import {Home} from './app/components/Home';
import {NarcList} from './features/narc/listing/NarcList';
import {Navbar} from "./app/components/Navbar";

function App() {
    const {signedIn} = useSelector((state: RootState) => state.user);
    return (
        <div className="App">
            <header>
                <Navbar/>
            </header>
            <div className="content">
                <Routes>
                    <Route index element={<NarcList/>}/>
                    {signedIn && <Route path="/narc" element={<NarcForm/>}/>}
                    {!signedIn && <Route path="/signin" element={<AmplifySignIn />}/>}
                </Routes>
            </div>
        </div>
    )
        ;
}


export default App;
