import {AppBar, Box, IconButton, Toolbar, Typography} from '@mui/material';
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import BackIcon from '@mui/icons-material/ArrowBack';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {MyAccountButton} from "./MyAccountButton";
import {useLocation, useNavigate} from "react-router-dom";

type Props = {};

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <BackIcon onClick={() => navigate(-1)}/>
    )
}
export const Navbar = (props: Props) => {
    const location = useLocation();
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    {

                        location.pathname === '/'
                            ? <MenuIcon/>
                            : <BackButton/>
                    }
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Park Narcs
                </Typography>
                <MyAccountButton/>
            </Toolbar>
        </AppBar>
    );
};
