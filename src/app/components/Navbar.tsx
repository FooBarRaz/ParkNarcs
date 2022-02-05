import {AppBar, Box, IconButton, Toolbar, Typography} from '@mui/material';
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import BackIcon from '@mui/icons-material/ArrowBack';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {MyAccountButton} from "./MyAccountButton";
import {useLocation, useNavigate} from "react-router-dom";
import {makeStyles, withStyles} from '@mui/styles';

type Props = {};

const useStyles = makeStyles({
    navbar: {
        boxShadow: '12px'
    }
});


const BackButton = () => {
    const navigate = useNavigate();

    return (
        <BackIcon onClick={() => navigate(-1)}/>
    )
}
export const Navbar = (props: Props) => {
    const location = useLocation();
    const {navbar} = useStyles();
    return (
        <AppBar className={navbar} position="fixed">
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
                <img src={"car-parking-svgrepo-com.svg"} alt={"logo"} width="24px" color="white" />
                <Typography variant="h6" component="div">
                    Park Narcs
                </Typography>
                <Box sx={{ ml: 'auto', mr: 0 }}>
                    <MyAccountButton/>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
