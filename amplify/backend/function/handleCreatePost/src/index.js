"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var AWS = require("aws-sdk");
var shortuuid = require("short-uuid");
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var s3, id, presignedUrl, db, now, bucketName, objectName, bucketRegion, s3Url;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("EVENT: ".concat(JSON.stringify(event)));
                s3 = new AWS.S3();
                id = shortuuid().new();
                console.log("id: ".concat(id));
                return [4 /*yield*/, s3.getSignedUrlPromise("putObject", {
                        Bucket: process.env.STORAGE_PARKNARCSIMAGESBUCKET_BUCKETNAME,
                        Key: "".concat(id, ".png"),
                        ContentType: "image/png",
                    })];
            case 1:
                presignedUrl = _a.sent();
                console.log("presignedUrl: ".concat(presignedUrl));
                db = new AWS.DynamoDB.DocumentClient();
                now = new Date().toISOString();
                bucketName = process.env.STORAGE_PARKNARCSIMAGESBUCKET_BUCKETNAME;
                objectName = "".concat(id, ".png");
                bucketRegion = process.env.REGION;
                s3Url = "https://".concat(bucketName, ".s3.").concat(bucketRegion, ".amazonaws.com/").concat(objectName);
                return [4 /*yield*/, db
                        .put({
                        TableName: process.env.API_PARKNARCS_POSTTABLE_NAME,
                        Item: {
                            id: id,
                            title: event.arguments.title,
                            image: objectName,
                            createdAt: now,
                            updatedAt: now
                        },
                    })
                        .promise()];
            case 2:
                _a.sent();
                return [2 /*return*/, {
                        id: id,
                        title: event.arguments.title,
                        s3PreSignedUrl: presignedUrl,
                    }];
        }
    });
}); };
exports.handler = handler;
