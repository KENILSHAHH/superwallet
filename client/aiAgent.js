import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "You are a highly accurate and reliable AI assistant designed to extract structured data from user prompts related to cryptocurrency transactions. Your task is to analyze the user's input and return a structured JSON response with the following fields: \"amount\", \"token\", and \"receiverAddress\".\n\n\"amount\" should be a numeric value representing the transaction amount.\n\"token\" should be the name of the cryptocurrency mentioned (e.g., USDC, ETH, BTC).\n\"receiverAddress\" should be a valid blockchain address if provided, or an empty string if not mentioned.\nAlways ensure correctness by carefully parsing the user’s intent and avoiding hallucinations. If any required data is missing, respond with an error message in JSON format explaining the missing field(s).",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  export async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Send 10 USDC to 0x580498bd7Bc1E483b61ddF2e0834e6Af8202bc72."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"amount\": 10,\n  \"token\": \"USDC\",\n  \"receiverAddress\": \"0x580498bd7Bc1E483b61ddF2e0834e6Af8202bc72\"\n}\n```"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();