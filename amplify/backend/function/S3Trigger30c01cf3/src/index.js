const {getItem, putItem} = require("./s3Client");
const {resizeImage} = require("./imageResizer");
const {streamToBuffer} = require('./streamToBuffer');

exports.handler = function (event, context) {
    console.log('Received S3 event:', JSON.stringify(event, null, 2));
    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
    const key = event.Records[0].s3.object.key; //eslint-disable-line
    const { principalId } = event.Records[0].userIdentity;
    const { functionName } = context;


    if (!principalId.includes(functionName)) {
        getItem(bucket, key)
            .then(stream => streamToBuffer(stream))
            .then(item => resizeImage(item))
            .then(resizedImage => putItem(bucket, key, resizedImage))
            .then(() => {
                console.log(`Bucket: ${bucket}`, `Key: ${key}`);
                context.done(null, 'Successfully processed S3 event'); // SUCCESS with message
            })
            .catch(err => console.log('Error handling object update: ', err.message))
    }
};
