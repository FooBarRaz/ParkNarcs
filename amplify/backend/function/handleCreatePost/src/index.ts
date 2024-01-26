/* Amplify Params - DO NOT EDIT
  API_PARKNARCS_GRAPHQLAPIIDOUTPUT
	API_PARKNARCS_GRAPHQLAPIENDPOINTOUTPUT
	API_PARKNARCS_GRAPHQLAPIIDOUTPUT
	API_PARKNARCS_GRAPHQLAPIKEYOUTPUT
  API_PARKNARCS_POSTTABLE_ARN
  API_PARKNARCS_POSTTABLE_NAME
	ENV
	REGION
	STORAGE_PARKNARCSDB_ARN
	STORAGE_PARKNARCSDB_NAME
	STORAGE_PARKNARCSDB_STREAMARN
	STORAGE_PARKNARCSIMAGESBUCKET_BUCKETNAME
Amplify Params - DO NOT EDIT */

import { AppSyncResolverHandler } from "aws-lambda";
import * as AWS from "aws-sdk";
import * as shortuuid from "short-uuid";

//https://docs.amplify.aws/cli-legacy/graphql-transformer/function/#usage

type HandlerType = AppSyncResolverHandler<
  { title: string },
  { id: string; title: string; s3PreSignedUrl: string }
>;

export const handler: HandlerType = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const s3 = new AWS.S3();
  const id = shortuuid().new();
  console.log(`id: ${id}`);

  const presignedUrl = await s3.getSignedUrlPromise("putObject", {
    Bucket: process.env.STORAGE_PARKNARCSIMAGESBUCKET_BUCKETNAME,
    Key: `${id}.png`,
    ContentType: "image/png",
  });

 console.log(`presignedUrl: ${presignedUrl}`);

  // save data to dynamoDb
  const db = new AWS.DynamoDB.DocumentClient();
  const now = new Date().toISOString();
  const bucketName = process.env.STORAGE_PARKNARCSIMAGESBUCKET_BUCKETNAME;
  const objectName = `${id}.png`;
  const bucketRegion = process.env.REGION;
  const s3Url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${objectName}`;

  await db
    .put({
      TableName: process.env.API_PARKNARCS_POSTTABLE_NAME!,
      Item: {
        id,
        title: event.arguments.title,
        image: objectName,
        createdAt: now,
        updatedAt: now
      },
    })
    .promise();

  return {
    id,
    title: event.arguments.title,
    s3PreSignedUrl: presignedUrl,
  };
};
