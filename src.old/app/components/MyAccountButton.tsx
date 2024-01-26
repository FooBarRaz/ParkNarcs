import * as React from "react";
import {Box, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {AmplifySignOut} from "@aws-amplify/ui-react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import { Link, useNavigate } from "react-router-dom";
import './buttons.css';

export function MyAccountButton() {
    const {username, signedIn} = useSelector((state: RootState) => state.user);
    let navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event: { currentTarget: any }) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <div>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
        >
            <AccountCircle/>
        </IconButton>
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        ><MenuItem>
            {signedIn
                ? <Box>
                    <Typography variant={"h6"}>{username}</Typography>
                    <AmplifySignOut class="amplify-button" handleAuthStateChange={() => { handleClose(); navigate('/'); } } /></Box>
                : <Link to="/signin">
                    <button onClick={handleClose}> Sign In
                    </button>
                </Link>
            }
        </MenuItem>
        </Menu>
    </div>;
}

