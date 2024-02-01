import axios from "axios";

const apiKey = process.env.OPENAI_API_KEY;
const url = "https://api.openai.com/v1/engines/davinci/completions";

async function queryChatGPT(prompt: string) {
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
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in making request to OpenAI:", error);
    throw error;
  }
}

// Example usage
queryChatGPT(
  "Translate the following English text to French: Hello, how are you?"
)
  .then((response) => {
    console.log(response);
    console.log("Response:", response.choices[0].text);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
