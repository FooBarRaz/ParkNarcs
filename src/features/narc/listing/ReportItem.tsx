import {Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography} from '@mui/material';
import * as React from 'react';
import {NarcReport} from "../types";
import {Favorite as FavoriteIcon, Share as ShareIcon} from "@mui/icons-material";
import faker from 'faker';

type Props = {
    report: NarcReport;
};

export const ReportItem = (props: Props) => {
    const { comment, licensePlate, state, date, location } = props.report;
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={`${licensePlate} ${state}`}
                subheader={location}
            />
            <CardMedia
                component="img"
                height="194"
                image={faker.image.transport()}
                alt="pig-parker"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {comment}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};
