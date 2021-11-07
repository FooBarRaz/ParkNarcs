import {Card, CardContent, CardHeader, CardMedia, Typography} from '@mui/material';
import * as React from 'react';
import {NarcReportEntity} from "../types";
import faker from 'faker';

type Props = {
    report: NarcReportEntity;
};

export const ReportItem = (props: Props) => {
    const { comment, licensePlate, state, date, location, id } = props.report;
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={`${licensePlate} ${state}`}
                subheader={comment}
            />
            <CardMedia
                component="img"
                height="194"
                image={faker.image.transport()}
                alt={`pig-parker-${id}`}
            />
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
