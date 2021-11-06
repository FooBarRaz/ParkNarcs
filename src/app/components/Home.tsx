import * as React from 'react';
import {Link} from "react-router-dom";

type Props = {};
export const Home = (props: Props) => {
    return <>
        <div>Homepage</div>
        <Link to="/narc">Narc a bitch out</Link>
        <Link to="/list">Look at bitches</Link>
    </>
};
