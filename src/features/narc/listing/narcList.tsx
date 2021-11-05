import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchReports} from "../narc.slice";
import {RootState} from "../../../app/store";

type Props = {};

export const NarcList = (props: Props) => {
    const dispatch = useDispatch();
    const {reports} = useSelector((state: RootState) => state.narcs);

    useEffect(() => {
        dispatch(fetchReports());
    });

    return (
        <>
            {
                reports.map(eachReport => (
                    <div>comment: {eachReport.comment}</div>
                ))
            }
        </>
    )
        ;
};
