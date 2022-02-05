import {useNavigate} from "react-router-dom";
import BackIcon from "@mui/icons-material/ArrowBack";
import * as React from "react";
import {IconButton} from "@mui/material";

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
        >
            <BackIcon onClick={() => navigate(-1)}/>
        </IconButton>
    )
}

export default BackButton;
