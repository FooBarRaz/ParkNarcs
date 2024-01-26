/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_PARKNARCSIMAGESBUCKET_BUCKETNAME
Amplify Params - DO NOT EDIT */

import { S3Event, S3Handler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import sharp from 'sharp';

const s3 = new S3();
const TARGET_WIDTH = 800;  // Or whatever your desired width is
const PROCESSED_METADATA_KEY = 'resized';

export const handler: S3Handler = async (event: S3Event) => {
    // For simplicity, assume only 1 record is processed at a time
    const record = event.Records[0];

    const bucketName = record.s3.bucket.name;
    const objectKey = record.s3.object.key;

    // Check if the image was previously processed
    const existingObject = await s3.headObject({
        Bucket: bucketName,
        Key: objectKey,
    }).promise();

    if (existingObject.Metadata && existingObject.Metadata[PROCESSED_METADATA_KEY]) {
        console.log('Image was already processed. Skipping...');
        return;
    }

    // Fetch the image from S3
    const s3Object = await s3.getObject({
        Bucket: bucketName,
        Key: objectKey
    }).promise();

    if (!s3Object.Body) {
        throw new Error('Failed to retrieve object body');
    }

    // Resize the image
    const resizedImage = await sharp(s3Object.Body as Buffer)
        .resize(TARGET_WIDTH)
        .toBuffer();

    // Upload the resized image back to S3 and set metadata
    await s3.putObject({
        Bucket: bucketName,
        Key: objectKey,
        Body: resizedImage,
        ContentType: s3Object.ContentType,
        Metadata: {
            [PROCESSED_METADATA_KEY]: 'true'
        }
    }).promise();

    console.log(`Resized image ${objectKey} and saved to ${bucketName}`);
};
