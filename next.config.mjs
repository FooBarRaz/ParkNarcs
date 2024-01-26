/** @type {import('next').NextConfig} */
import aws_config from './aws-exports.mjs';
import aws_sdk from 'aws-sdk';

// Load AWS credentials
aws_sdk.config.loadFromPath('~/.aws/credentials');

// Now you can use AWS.config.credentials to access your credentials
const credentials = aws_sdk.config.credentials;
const nextConfig = {
    env: {
      S3_BUCKET: aws_config.aws_user_files_s3_bucket,
      AWS_ACCESS_KEY_ID: credentials.accessKeyId,
      AWS_SECRET_ACCESS_KEY: credentials.secretAccessKey,
      AWS_REGION: aws_config.aws_user_files_s3_bucket_region
    },
  };
  
  export default nextConfig;