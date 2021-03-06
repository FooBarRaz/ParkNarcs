import * as React from 'react';
import { useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { fetchReports } from '../narc.slice';
import { LinkFab } from '../../../app/components/LinkFab';
import { Box } from '@mui/material';

export default () => {
    const dispatch = useDispatch();
    const {reports} = useSelector((state: RootState) => state.narcs);

    useEffect(() => {
        dispatch(fetchReports());
    }, []);

    return (
        <>
            <ImageList
                cols={2}
                variant="quilted"
                sx={{
                    margin: '0.5em'
                }}
            >
                {reports.map((item) => (
                    <ImageListItem key={item.image}>
                        <Box sx={{
                            width: '100%',
                        }}>
                            <img
                                width="100%"
                                src={item.image}
                                srcSet={item.image}
                                alt={item.comment}
                                loading="lazy"
                            />
                        </Box>
                        <ImageListItemBar
                            title={item.comment}
                            subtitle={item.location}
                            // actionIcon={
                            //     <IconButton
                            //         sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                            //         aria-label={`info about ${item.comment}`}
                            //     >
                            //         <InfoIcon/>
                            //     </IconButton>
                            // }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <LinkFab linkTo="narc"/>
        </>
    );
}
