import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    IconButton,
    Typography
} from '@mui/material';
import * as React from 'react';
import {NarcReport} from "../types";
import {red} from "@mui/material/colors";
import {ExpandMore, Menu as MenuIcon, Favorite as FavoriteIcon, Share as ShareIcon } from "@mui/icons-material";
import faker from 'faker';

type Props = {
    report: NarcReport;
};

export const ReportItem = (props: Props) => {
    const { comment, licensePlate, state, date, location } = props.report;
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                // avatar={
                //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                //         R
                //     </Avatar>
                // }
                // action={
                //     <IconButton aria-label="settings">
                //         <MenuIcon />
                //     </IconButton>
                // }
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
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};
