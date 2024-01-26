// @flow
import * as React from 'react';
import { Box } from '@mui/material';

type Props = {
    src: string;
};

export const ImagePreview = (props: Props) => {
    const {src} = props;
    return <Box
        sx={{
            paddingTop: '1rem',
            margin: 'auto',
            width: '50%'
        }}
    >
        {src && <img
            src={src}
            alt="preview"
            width="100%"
        />}
    </Box>

};
