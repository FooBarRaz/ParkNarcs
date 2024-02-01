const AWS = require("aws-sdk");
const S3 = new AWS.S3({ signatureVersion: "v4" });
const sharp = require("sharp");

exports.handler = async function (event) {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const prefix = "resized_";

  if (key.startsWith(prefix)) {
    console.log(`Image ${key} has already been resized. Skipping.`);
    return;
  }
  const image = await S3.getObject({ Bucket: bucket, Key: key }).promise();
  const resizedImage = await sharp(image.Body)
    .resize(800)
    .toBuffer();

  const newKey = prefix + key;

  await S3.putObject({
    Body: resizedImage,
    Bucket: bucket,
    Key: newKey
  }).promise();

  console.log(`Successfully resized and saved ${newKey}`);
};;