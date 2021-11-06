import React from 'react';
import {withAuthenticator} from '@aws-amplify/ui-react'
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
                    <Route index element={<Home/>}/>
                    {signedIn && <Route path="/narc" element={<NarcForm/>}/>}
                    <Route path="/list" element={<NarcList/>}/>
                </Routes>
            </div>
        </div>
    )
        ;
}


export default App;
