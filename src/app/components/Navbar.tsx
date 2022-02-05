import {AppBar, Box, Toolbar, Typography} from '@mui/material';
import * as React from 'react';
import {MyAccountButton} from "./MyAccountButton";
import {NavLink, useLocation} from "react-router-dom";
import {makeStyles} from '@mui/styles';
import BackButton from "./BackButton";

type Props = {};

const useStyles = makeStyles({
    navbar: {
        boxShadow: '12px'
    }
});

export const Navbar = (props: Props) => {
    const location = useLocation();
    const {navbar} = useStyles();
    return (
        <AppBar className={navbar} position="fixed">
            <Toolbar>
                {location.pathname !== '/' && <BackButton />}
                <NavLink to="/" style={{textDecoration: 'none'}}>
                    <Box component="span">
                        <img src={"car-parking-svgrepo-com.svg"} alt={"logo"} width="18px" color="white"/>
                        <Typography sx={{fontWeight: 'bold'}} variant="h6" component="span">
                            Park Narcs
                        </Typography>
                    </Box>
                </NavLink>
                <Box sx={{ml: 'auto', mr: 0}}>
                    <MyAccountButton/>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
