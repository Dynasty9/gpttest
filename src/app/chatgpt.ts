"use server";
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
  return convertImageToBase64(response.data.data[0].url);
}

async function convertImageToBase64(url: string) {
  // Fetch the image with a response type of 'arraybuffer'
  const response = await axios.get(url, { responseType: "arraybuffer" });

  // Convert the array buffer to a Base64 string
  const base64Image = Buffer.from(response.data, "binary").toString("base64");

  // Determine the content type of the image (assuming JPEG; adjust as needed)
  const contentType = "image/png"; // Or dynamically determine this if possible

  return `data:${contentType};base64,${base64Image}`;
}
