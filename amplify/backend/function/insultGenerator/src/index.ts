import aws from "aws-sdk";
import OpenAI from "openai";

const getOpenAiApiKey = async (): Promise<string> => {
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["OPENAI_API_KEY"],
      WithDecryption: true,
    })
    .promise();


  return Parameters?.map((param) => param.Value)[0] || "";
};

interface Event {
  queryStringParameters: {
    model: string;
    temperature: number;
    prompt: string;
    max_tokens: number;
  };
}

const handler = async (event: Event): Promise<string> => {
  try {
    const apiKey = await getOpenAiApiKey();
    const openai = new OpenAI({ apiKey });

    const { model, temperature, prompt, max_tokens } =
      event.queryStringParameters;

    const response = await openai.chat.completions.create({
      model,
      temperature,
      messages: [{ role: "user", content: prompt }],
      max_tokens,
    });

    return response.choices[0].message.content || "No response from Generator";
  } catch (error) {
    console.error(error);
    return `Failed to generate insult: ${error}`;
  }
};

export { handler };