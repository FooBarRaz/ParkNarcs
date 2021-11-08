import {Card, CardContent, CardHeader, CardMedia, Typography} from '@mui/material';
import * as React from 'react';
import {NarcReportEntity} from "../types";
import faker from 'faker';
import { makeStyles } from '@mui/styles';
import NarcService from '../submission/narc.service';
import {AmplifyS3Image} from "@aws-amplify/ui-react";

type Props = {
    report: NarcReportEntity;
};


const classes = makeStyles({
    item: {
        marginBottom: '1rem'
    }
})

export const ReportItem = (props: Props) => {
    const { comment, licensePlate, state, date, location, id, image } = props.report;
    const { item: itemStyle } = classes();
    return (
        <Card className={itemStyle}>
            <CardHeader
                title={`${licensePlate} ${state}`}
                subheader={comment}
            />
            <AmplifyS3Image imgKey={image} imgProps={{ height: '4rem' }}/>
            {/*<CardMedia*/}
            {/*    component="img"*/}
            {/*    height="194"*/}
            {/*    image={image}*/}
            {/*    alt={`pig-parker-${id}`}*/}
            {/*/>*/}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {location}
                </Typography>
            </CardContent>
            {/*<CardActions disableSpacing>*/}
            {/*    <IconButton aria-label="share">*/}
            {/*        <ShareIcon />*/}
            {/*    </IconButton>*/}
            {/*</CardActions>*/}
        </Card>
    );
};
