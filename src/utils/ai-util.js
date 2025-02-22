import { GoogleGenerativeAI } from "@google/generative-ai";

const handleApiKey = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  
  if (!API_KEY) {
    throw new Error("Missing OpenAI API key. Set VITE_API_KEY environment variable.");
  }
  
  return API_KEY;
}

const API_KEY = handleApiKey();
const genAI = new GoogleGenerativeAI(API_KEY);

export const getAIResponse = async (message) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent(message);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, I couldn't process your request. Please try again.";
  }
};
