const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require("sharp");

const s3Client = new S3Client({ region: "us-east-1" }); 

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

  const getObjectParams = { Bucket: bucket, Key: key };
  const { Body } = await s3Client.send(new GetObjectCommand(getObjectParams));

  const resizedImage = await sharp(await Body.transformToByteArray())
    .resize(800)
    .toBuffer();

  const newKey = prefix + key;
  const putObjectParams = {
    Bucket: bucket,
    Key: newKey,
    Body: resizedImage,
  };

  await s3Client.send(new PutObjectCommand(putObjectParams));
  console.log(`Successfully resized and saved ${newKey}`);
};