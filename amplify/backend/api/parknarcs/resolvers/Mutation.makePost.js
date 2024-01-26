import { util } from '@aws-appsync/utils';
import { nanoid } from 'nanoid';

export async function request(ctx) {
  const {title } = ctx.args
  console.log('received values from client', title);

  const id = nanoid();
  const filename = `${id}.png`;


  // get pre-signed URL
  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filename,
    Expires: 60,
    ContentType: 'image/png',
    ACL: 'public-read',
  };
  const url = s3.getSignedUrl('putObject', params);
  console.log('url', url);

  const image = { 

  }
  
  return {
    operation: 'PutItem',
    key: util.dynamodb.toMapValues({title, bar}),
    attributeValues: util.dynamodb.toMapValues(values),
  };
}