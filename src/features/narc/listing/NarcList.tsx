import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchReports} from "../narc.slice";
import {RootState} from "../../../app/store";
import {ReportItem} from "./ReportItem";
import {makeStyles} from "@mui/styles";

type Props = {};

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
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
