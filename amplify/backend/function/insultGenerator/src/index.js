/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["OPEN_AI_API_KEY","OPENAI_API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
"use strict";
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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const openai_1 = __importDefault(require("openai"));
const getOpenAiApiKey = () => __awaiter(void 0, void 0, void 0, function* () {
    const { Parameters } = yield new aws_sdk_1.default.SSM()
        .getParameters({
        Names: ["OPENAI_API_KEY"],
        WithDecryption: true,
    })
        .promise();
    return (Parameters === null || Parameters === void 0 ? void 0 : Parameters.map((param) => param.Value)[0]) || "";
});
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = yield getOpenAiApiKey();
        const openai = new openai_1.default({ apiKey });
        const { model, temperature, prompt, max_tokens } = event.queryStringParameters;
        const response = yield openai.chat.completions.create({
            model,
            temperature,
            messages: [{ role: "user", content: prompt }],
            max_tokens,
        });
        return response.choices[0].message.content || "No response from Generator";
    }
    catch (error) {
        console.error(error);
        return `Failed to generate insult: ${error}`;
    }
});
exports.handler = handler;
