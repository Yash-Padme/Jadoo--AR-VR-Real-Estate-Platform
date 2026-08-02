//my code

import { extractSearchFilters, generateChatResponse } from "../services/ai.service.js";
import { searchProperties } from "../services/propertySearch.service.js";

export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: "Message field is required." });
    }

    // Step 1: Structural Analysis of user intent
    const filters = await extractSearchFilters(message);

    let properties = null;
    
    // Step 2: Conditional execution pipeline
    if (filters.isPropertySearch) {
      properties = await searchProperties(filters);
    }

    // Step 3: Synthesis of final prompt + response execution
    const reply = await generateChatResponse(message, properties);

    return res.status(200).json({
      success: true,
      reply,
      extractedFilters: filters.isPropertySearch ? filters : undefined
    });
  } catch (error) {
    console.error("Chat Controller Exception:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};