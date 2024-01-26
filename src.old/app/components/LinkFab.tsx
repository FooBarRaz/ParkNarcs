// @flow
import * as React from 'react';
import { Box, Fab } from '@mui/material';
import { Link } from 'react-router-dom';
import { Add as AddIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    fab: {
        position: 'fixed',
        bottom: '1em',
        right: '1em',
    }
});
type Props = {
    linkTo: string;
};

export const LinkFab = (props: Props) => {
    const { linkTo } = props;
    const styles = useStyles();

    return (
        <Box className={styles.fab} sx={{'& > :not(style)': {m: 0}}}>
            <Link to={linkTo}>
                <Fab color="primary" aria-label="add">
                    <AddIcon/>
                </Fab>
            </Link>
        </Box>
    );
};
