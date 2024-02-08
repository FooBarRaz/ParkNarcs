/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const aws = require("aws-sdk");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

const getOpenAiApiKey = async () => {
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["OPEN_AI_API_KEY"].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const openAiApiKey = Parameters.find(
    (param) => param.Name === "OPEN_AI_API_KEY"
  ).Value;

  return openAiApiKey;
};

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


app.get("/", async (req, res) => {
  try {
    const apiKey = await getOpenAiApiKey();
    const openai = new OpenAI({ apiKey });

    const { model, temperature, prompt, max_tokens } = req.query;

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt || "Generate a humorous insult for a bad parking job",
        },
      ],
      model: model || "gpt-3.5-turbo",
      temperature: Number.parseInt(temperature) || 0.7,
      max_tokens: Number.parseInt(max_tokens) || 60,
    });

    res.json({ insult: response.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).send("Failed to generate insult");
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
