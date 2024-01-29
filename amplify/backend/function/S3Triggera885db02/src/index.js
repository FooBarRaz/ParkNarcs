const AWS = require("aws-sdk");
const S3 = new AWS.S3({ signatureVersion: "v4" });
const sharp = require("sharp");

exports.handler = async function (event) {
  console.log("Received S3 event:", JSON.stringify(event, null, 2));

  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );

  console.log(`Bucket: ${bucket}`, `Key: ${key}`);

  const image = await S3.getObject({ Bucket: bucket, Key: key }).promise();

  const resizedImage = await sharp(image.Body)
    .resize(800, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .toBuffer();

  await S3.putObject({
    Body: resizedImage,
    Bucket: bucket,
    Key: key, // Use the same key to overwrite the existing object
  }).promise();

  console.log(`Successfully resized and overwritten ${key}`);
};
