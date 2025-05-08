import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getGeminiResponse = async (messages) => {
  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash-latest" });

    // 1. Map the history
    const history = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // 2. Important: Make sure first message is a user
    let trimmedHistory = [...history];
    while (trimmedHistory.length && trimmedHistory[0].role !== "user") {
      trimmedHistory.shift(); // Remove assistant messages at the beginning
    }

    if (trimmedHistory.length === 0) {
      throw new Error("No user messages to start the chat.");
    }

    // 3. The chat history should be without the latest user input
    const chatHistory = trimmedHistory.slice(0, -1);
    const latestUserMessage = trimmedHistory[trimmedHistory.length - 1].parts[0].text;

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(latestUserMessage);

    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error getting response. Try again later.";
  }
};
