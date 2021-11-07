import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchReports} from "../narc.slice";
import {RootState} from "../../../app/store";
import {ReportItem} from "./ReportItem";
import {makeStyles} from "@mui/styles";
import {Add as AddIcon} from "@mui/icons-material";
import {Box, Fab} from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {};

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    fab: {
        position: 'fixed',
        bottom: '1em',
        right: '1em',
    }
});

export const NarcList = (props: Props) => {
    const dispatch = useDispatch();
    const {reports} = useSelector((state: RootState) => state.narcs);
    const styles = useStyles();

    useEffect(() => {
        dispatch(fetchReports());
    }, []);

    return (
        <div className={styles.root}>
            <Box className={styles.fab} sx={{'& > :not(style)': {m: 1}}}>
                <Link to="narc">
                    <Fab color="primary" aria-label="add">
                        <AddIcon/>
                    </Fab>
                </Link>
            </Box>
            {
                reports.map(eachReport => (
                    <>
                        <ReportItem report={eachReport}/>
                        <hr/>
                    </>
                ))
            }
        </div>
    )
        ;
};
