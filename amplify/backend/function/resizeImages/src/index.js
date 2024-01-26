"use strict";
/* Amplify Params - DO NOT EDIT
    ENV
    REGION
    STORAGE_PARKNARCSIMAGESBUCKET_BUCKETNAME
Amplify Params - DO NOT EDIT */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const sharp_1 = __importDefault(require("sharp"));
const s3 = new aws_sdk_1.S3();
const TARGET_WIDTH = 800; // Or whatever your desired width is
const PROCESSED_METADATA_KEY = 'resized';
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    // For simplicity, assume only 1 record is processed at a time
    const record = event.Records[0];
    const bucketName = record.s3.bucket.name;
    const objectKey = record.s3.object.key;
    // Check if the image was previously processed
    const existingObject = yield s3.headObject({
        Bucket: bucketName,
        Key: objectKey,
    }).promise();
    if (existingObject.Metadata && existingObject.Metadata[PROCESSED_METADATA_KEY]) {
        console.log('Image was already processed. Skipping...');
        return;
    }
    // Fetch the image from S3
    const s3Object = yield s3.getObject({
        Bucket: bucketName,
        Key: objectKey
    }).promise();
    if (!s3Object.Body) {
        throw new Error('Failed to retrieve object body');
    }
    // Resize the image
    const resizedImage = yield (0, sharp_1.default)(s3Object.Body)
        .resize(TARGET_WIDTH)
        .toBuffer();
    // Upload the resized image back to S3 and set metadata
    yield s3.putObject({
        Bucket: bucketName,
        Key: objectKey,
        Body: resizedImage,
        ContentType: s3Object.ContentType,
        Metadata: {
            [PROCESSED_METADATA_KEY]: 'true'
        }
    }).promise();
    console.log(`Resized image ${objectKey} and saved to ${bucketName}`);
});
exports.handler = handler;
