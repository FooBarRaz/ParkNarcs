// @flow
import * as React from 'react';
import { Box } from '@mui/material';
import ReactCrop from 'react-image-crop';
import { useEffect, useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';

type Props = {
    src: string;
};

export const ImagePreview = (props: Props) => {
    const {src} = props;
    const [crop, setCrop] = useState<any>();

    useEffect(() => {
        console.log(crop);
    }, [crop]);

    return <Box
        sx={{
            paddingTop: '1rem',
            margin: 'auto',
            width: '50%'
        }}
    >
        {src &&
        <ReactCrop
            src={src}
            crop={crop}
            onChange={setCrop}/>

            // <img
            //     src={src}
            //     alt="preview"
            //     width="100%"
            // />
        }
    </Box>

};
