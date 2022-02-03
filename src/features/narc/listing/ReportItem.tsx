import {Box, Card, CardContent, CardHeader, CardMedia, Typography} from '@mui/material';
import * as React from 'react';
import {NarcReportEntity} from "../types";
import {makeStyles} from '@mui/styles';
import {AmplifyS3Image} from "@aws-amplify/ui-react";

type Props = {
    report: NarcReportEntity;
};


const classes = makeStyles({
    item: {
        marginBottom: '1rem',
        width: '75vw',
    }
})

export const ReportItem = (props: Props) => {
    const {comment, licensePlate, state, date, location, id, image} = props.report;
    const {item: itemStyle} = classes();
    return (
        <Card
            className={itemStyle}>
            {/*<AmplifyS3Image imgKey={image} imgProps={{width: '360px', height: '240px'}}/>*/}
            <CardMedia
                component="img"
                width="480px"
                image={image}
                alt={`pig-parker-${id}`}
            />
            {/*<AmplifyS3Image imgKey={image} imgProps={{style: { width: '100%' } }} />*/}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {comment}
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
