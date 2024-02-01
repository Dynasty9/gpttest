import axios from "axios";
//FIX env to not be public 
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const url = "https://api.openai.com/v1/images/generations";

export async function queryChatGPT(prompt: string) {
  if (!apiKey) {
    throw new Error(
      "API key is not defined. Please set your API key in the .env file"
    );
  }

  try {
    const response = await axios.post(
      url,
      {
        prompt: prompt,
        n: 1, // Number of images to generate
        size: "512x512", // Image size
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data[0].url
  } catch (error) {
    console.error("Error in making request to OpenAI:", error);
    throw error;
  }
}
