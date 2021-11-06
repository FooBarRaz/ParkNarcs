import {AppBar, Box, IconButton, Toolbar, Typography} from '@mui/material';
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {MyAccountButton} from "./MyAccountButton";


type Props = {};

export const Navbar = (props: Props) => {
    const {username, signedIn} = useSelector((state: RootState) => state.user);
    return (
        // <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Park Narcs
                    </Typography>
                    { signedIn &&  <MyAccountButton /> }
                </Toolbar>
            </AppBar>
        // </Box>
    );
};
