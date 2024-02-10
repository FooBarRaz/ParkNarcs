/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
import OpenAI from "openai";
import aws from "aws-sdk";
// const OpenAI = require("openai");
// const aws = require("aws-sdk");

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

const insult = async(args) => {
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
};

exports.handler = async function (event, context) {
  return event.arguments.msg;
}