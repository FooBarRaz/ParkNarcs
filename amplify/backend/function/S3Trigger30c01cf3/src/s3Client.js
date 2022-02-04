const {GetObjectCommand, PutObjectCommand, S3Client} = require("@aws-sdk/client-s3");
// Set the AWS Region.
const REGION =  "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });


const getItem = (bucket, key) => {
    const params = {
        Bucket: bucket,
        Key: key
    }

    return s3Client.send(new GetObjectCommand(params)).then(data => data.Body)
}

const putItem = (bucket, key, item) => {
    const params = {
        Body: item,
        Bucket: bucket,
        Key: key
    }

    return s3Client.send(new PutObjectCommand(params)).then(data => data.Body)
}

module.exports = {
    putItem,
    getItem
}


// export { s3Client, getItem, putItem };
