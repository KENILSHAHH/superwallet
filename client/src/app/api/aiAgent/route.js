import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  bridgeTokenFrom1To2Private,
  totalEthBalancePrivate,
  totalTokenBalancePrivate,
} from "@/utils/superWallet";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
    You are a highly accurate and reliable AI assistant designed to extract structured data from user prompts related to cryptocurrency transactions. 
    Your task is to analyze the user's input and return a structured JSON response with the following fields: "action", "amount", "token", and "receiverAddress".
    
    "action" should be one of: "send_token", "fetch_balance".
    "amount" should be a numeric value (if applicable).
    "token" should be the cryptocurrency name (e.g., USDC, ETH, BTC).
    "receiverAddress" should be a valid blockchain address if provided, or an empty string if not mentioned.

    If the user requests a balance check, only return the "action" and "token" fields. 
    Always ensure correctness and avoid hallucinations. If any required data is missing, respond with an error message in JSON format explaining the missing fields.
  `,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function POST(req) {
  try {
    const { userInput } = await req.json(); // Get user input from request body

    if (!userInput) {
      return Response.json(
        { error: "Missing userInput in request body" },
        { status: 400 }
      );
    }

    const chatSession = model.startChat({ generationConfig });

    const result = await chatSession.sendMessage(userInput);
    const responseText = result.response.text();

    // Extract JSON from the model response
    const match = responseText.match(/```json\n([\s\S]*?)\n```/);
    const jsonResponse = match ? JSON.parse(match[1]) : {};

    console.log("Parsed Response:", jsonResponse);

    if (!jsonResponse.action) {
      return Response.json(
        { error: "Could not determine action from input" },
        { status: 400 }
      );
    }

    let txn;

    if (jsonResponse.action === "send_token") {
      if (!jsonResponse.amount || !jsonResponse.receiverAddress) {
        return Response.json(
          { error: "Missing amount or receiverAddress for token transfer" },
          { status: 400 }
        );
      }
      txn = await bridgeTokenFrom1To2Private(
        jsonResponse.receiverAddress,
        jsonResponse.amount.toString(),
        "0x69C34FC75d7445129562B98540bc60B0Dc7D8849"
      );
      return Response.json(
        { message: `Transaction successful: ${txn}` },
        { status: 200 }
      );
    } else if (jsonResponse.action === "fetch_balance") {
      if (!jsonResponse.token) {
        return Response.json(
          { error: "Missing token for balance check" },
          { status: 400 }
        );
      }

      if (jsonResponse.token.toUpperCase() === "ETH") {
        txn = await totalEthBalancePrivate();
      } else if (jsonResponse.token.toUpperCase() === "USDC") {
        txn = await totalTokenBalancePrivate(
          "0x69C34FC75d7445129562B98540bc60B0Dc7D8849"
        );
      } else {
        return Response.json(
          { error: "Unsupported token for balance check" },
          { status: 400 }
        );
      }

      return Response.json({ balance: txn }, { status: 200 });
    } else {
      return Response.json({ error: "Unknown action type" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
