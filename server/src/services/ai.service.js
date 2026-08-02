//mycode

import { GoogleGenAI } from "@google/genative-ai";

// Initialize the Gemini client with your API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Extracts structured search filters from raw user text using Gemini
 */
export const extractSearchFilters = async (message) => {
  try {
    const prompt = `
      Analyze the following user query for real estate listings and extract search parameters.
      Return a valid JSON object ONLY. Do not wrap it in markdown code blocks.
      
      Query: "${message}"

      Expected JSON format:
      {
        "isPropertySearch": boolean,
        "location": string or null,
        "type": string or null (e.g., "1 BHK", "2 BHK", "Villa", "Flat"),
        "maxPrice": number or null,
        "purpose": "rent" or "sale" or null
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error in filter extraction:", error);
    return { isPropertySearch: false };
  }
};

/**
 * Generates the final chatbot answer using the system prompt and contextual data
 */
export const generateChatResponse = async (userMessage, dbContext = null) => {
  try {
    let contextString = "";
    if (dbContext && dbContext.length > 0) {
      contextString = `\nAvailable matching properties from Jadoo Database:\n${JSON.stringify(dbContext, null, 2)}`;
    } else if (dbContext) {
      contextString = `\nNo matching properties found in the database for this specific request.`;
    }

    const fullPrompt = `${SYSTEM_PROMPT}\n${contextString}\n\nUser: ${userMessage}\nJadoo AI:`;

    const result = await model.generateContent(fullPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating text from Gemini:", error);
    throw new Error("Failed to process message via AI engine.");
  }
};