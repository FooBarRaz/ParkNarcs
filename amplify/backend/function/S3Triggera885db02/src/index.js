const AWS = require("aws-sdk");
const S3 = new AWS.S3({ signatureVersion: "v4" });
const sharp = require("sharp");

exports.handler = async function (event) {
  console.log("Received S3 event:", JSON.stringify(event, null, 2));

  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );

  // Get the current object metadata
  const currentObject = await S3.headObject({ Bucket: bucket, Key: key }).promise();

  // Check if the image has already been resized
  if (currentObject.Metadata && currentObject.Metadata.resized === 'true') {
    console.log(`Image ${key} has already been resized. Skipping.`);
    return;
  }

  console.log(`Bucket: ${bucket}`, `Key: ${key}`);

  const image = await S3.getObject({ Bucket: bucket, Key: key }).promise();

  const resizedImage = await sharp(image.Body)
    .resize(800)
    .toBuffer();

  await S3.putObject({
    Body: resizedImage,
    Bucket: bucket,
    Key: key, // Use the same key to overwrite the existing object
    Metadata: {
      resized: 'true' // Add metadata indicating the image has been resized
    }
  }).promise();

  console.log(`Successfully resized and overwritten ${key}`);
};