import aws from "aws-sdk";
import OpenAI from "openai";

const getOpenAiApiKey = async (): Promise<string> => {
  const name = process.env.OPENAI_API_KEY;
  if (!name) throw new Error("OPENAI_API_KEY not set");

  const { Parameters } = await new aws.SSM({})
    .getParameters({
      Names: [name],
      WithDecryption: true,
    })
    .promise();

  return Parameters?.map((param) => param.Value)[0] || "";
};

interface AppSyncEvent {
  arguments: {
    model: string;
    temperature: number;
    prompt: string;
    max_tokens: number;
  };
}

const handler = async (event: AppSyncEvent): Promise<string> => {
  try {
    const apiKey = await getOpenAiApiKey();
    const openai = new OpenAI({ apiKey });

    const { model, temperature, prompt, max_tokens } = event.arguments;

    const response = await openai.chat.completions.create({
      model: model || "gpt-3.5-turbo",
      temperature: temperature || 0.7,
      messages: [
        {
          role: "user",
          content: prompt || "Generate a spicy insult for a bad parking job",
        },
      ],
      max_tokens: max_tokens || 150,
    });

    return response.choices[0].message.content || "No response from Generator";
  } catch (error) {
    console.error(error);
    return `Failed to generate insult: ${error}`;
  }
};

export { handler };
