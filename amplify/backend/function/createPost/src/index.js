/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_PARKNARCSIMAGESBUCKET_BUCKETNAME
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  //base64 decode the body
  const bodyDecoded = Buffer.from(event.body, "base64").toString();
  const bodyObject = JSON.parse(bodyDecoded);
  const image = bodyObject.image;

  //upload the body to S3
  const AWS = require("aws-sdk");
  const s3 = new AWS.S3();
  const bucketName = process.env.STORAGE_PARKNARCSIMAGESBUCKET_BUCKETNAME;
  const key = `${Date.now()}.json`;
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: image,
  };

  const result = await s3.putObject(params).promise();

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },

    // include result key in body
    body: JSON.stringify(result),
  };
};
