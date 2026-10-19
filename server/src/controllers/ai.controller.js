import { GoogleGenerativeAI } from "@google/generative-ai";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Property } from "../models/property.model.js";
import { Chat } from "../models/chat.model.js";
import { calculateTrueCost } from "../utils/trueCostCalculator.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Returns the previously saved chat history for the logged-in user.
// This is used by the front-end to continue the conversation context.
export const getChatHistory = asyncHandler(async (req, res) => {
    const chatDoc = await Chat.findOne({ user: req.user._id });
    
    if (!chatDoc) {
        return res.status(200).json(new ApiResponse(200, [], "No chat history found"));
    }

    return res.status(200).json(new ApiResponse(200, chatDoc.history, "History fetched"));
});

// Main AI property assistant endpoint.
// It builds a real-estate context from the DB, sends it to Gemini, and saves the chat transcript.
export const chatWithPropertyAssistant = asyncHandler(async (req, res) => {
    const { query, propertyIds } = req.body;
    const userId = req.user._id;

    // Prevent empty prompts before doing any expensive AI work.
    if (!query || !query.trim()) {
        return res.status(400).json(new ApiError(400, "Query prompt is required"));
    }

    // If the client sends a shortlist of properties, use only those for the answer.
    // Otherwise, fall back to a small general dataset so the assistant still works for broad searches.
    let properties = [];
    if (propertyIds && Array.isArray(propertyIds) && propertyIds.length > 0) {
        properties = await Property.find({ _id: { $in: propertyIds } }).lean();
    } else {
        // Limit to 50 listings to keep the prompt smaller and avoid huge payloads.
        properties = await Property.find({}).limit(50).lean(); 
    }

    // Convert MongoDB property documents into a compact JSON payload for Gemini.
    // We only include fields relevant to the user query and cost comparisons.
    let propertyContextString = "No properties found in the database.";
    if (properties.length > 0) {
        const propertiesWithCost = properties.map(prop => ({
            title: prop.title,
            location: prop.location,
            bhk: prop.bhk,
            size: prop.size, // Helps Gemini answer queries like "1 big hall" or room sizing questions.
            baseRent: prop.rent || prop.price,
            estimatedTrueMonthlyCost: calculateTrueCost(prop),
            amenities: prop.amenities
        }));
        propertyContextString = JSON.stringify(propertiesWithCost, null, 2);
    }

    // System instruction tells Gemini to act like a housing assistant and answer
    // using the provided property context, not generic assumptions.
    const systemPrompt = `
You are the Jadoo Housing Intelligence AI Assistant.
Always format your response using clean Markdown. Use Markdown tables for comparisons.
If the user asks to find, search, or recommend a property, suggest the best matches from the context provided below.
Answer based on factual numbers. Do not provide unverified claims.

Current Property Context (Database Listings):
${propertyContextString}
`;

    // Load or create the user's chat document so conversation context can persist.
    let chatDoc = await Chat.findOne({ user: userId });
    if (!chatDoc) {
        chatDoc = await Chat.create({ user: userId, history: [] });
    }

    // Convert previous chat messages into Gemini's expected format.
    // Each message becomes { role, parts: [{ text }] }.
    const geminiHistory = chatDoc.history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));

    // Create the Gemini model with the system prompt for property-aware responses.
    const model = genAI.getGenerativeModel({ 
        model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
        systemInstruction: systemPrompt 
    });

    // Start a chat session using prior history as context.
    const chatSession = model.startChat({ history: geminiHistory });

    // Send the latest query and get the model's answer.
    const result = await chatSession.sendMessage(query);
    const responseText = result.response.text();

    // Persist both user input and assistant response into the DB for future conversations.
    chatDoc.history.push({ role: 'user', text: query });
    chatDoc.history.push({ role: 'model', text: responseText });
    await chatDoc.save();

    return res.status(200).json(
        new ApiResponse(200, { answer: responseText }, "AI response generated successfully")
    );
});



// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { ApiError } from "../utils/ApiError.js";
// import { Property } from "../models/property.model.js";
// import { calculateTrueCost } from "../utils/trueCostCalculator.js";

// import { Property } from "../models/property.model.js"; // Note: .model.js (singular)

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const chatWithPropertyAssistant = asyncHandler(async (req, res) => {
//     const { query, propertyIds } = req.body;

//     if (!query || !query.trim()) {
//         return res.status(400).json(new ApiError(400, "Query prompt is required"));
//     }

//     if (!propertyIds || !Array.isArray(propertyIds) || propertyIds.length === 0) {
//         return res.status(400).json(new ApiError(400, "At least one property ID must be provided for context"));
//     }

//     // 1. Fetch referenced properties and compute costs
//     const properties = await Property.find({ _id: { $in: propertyIds } }).lean();

//     if (!properties || properties.length === 0) {
//         return res.status(404).json(new ApiError(404, "Referenced properties not found"));
//     }

//     const propertiesWithCost = properties.map(prop => ({
//         id: prop._id,
//         title: prop.title,
//         location: prop.location,
//         bhk: prop.bhk,
//         propertyType: prop.propertyType || prop.type,
//         furnishing: prop.furnished,
//         baseRent: prop.rent || prop.price,
//         deposit: prop.deposit || "Not specified",
//         maintenance: prop.maintenance || 0,
//         estimatedTrueMonthlyCost: calculateTrueCost(prop),
//         commuteTimeMinutes: prop.commuteTime || "Not specified",
//         transportDistanceKm: prop.transportDistance || "Not specified",
//         amenities: prop.amenities
//     }));

//     // 2. Formulate grounded system prompt matching PRD constraints
//     const systemPrompt = `
// You are the Jadoo Housing Intelligence AI Assistant.
// Answer the user's inquiry strictly using the provided property data context below.

// Formatting Constraints:
// - ALWAYS format your response using clean Markdown.
// - When comparing properties, ALWAYS use a Markdown table format (e.g., | Feature | Property A | Property B |).
// - Use **bold** text for emphasis on key numbers, costs, and property names.
// - Provide a short, polite, and direct summary before or after the table.
// - Do NOT output raw JSON to the user. Use bullet points for lists.

// Content Constraints:
// - Only answer based on factual numbers, commute times, amenities, and True Monthly Cost details provided.
// - Do not provide unverified claims or financial advice.

// Property Context:
// ${JSON.stringify(propertiesWithCost, null, 2)}
// `;

//     // 3. Query Gemini
//     const model = genAI.getGenerativeModel({ 
//         model: process.env.GEMINI_MODEL || "gemini-2.5-flash-lite",
//         systemInstruction: systemPrompt 
//     });

//     const result = await model.generateContent(query);
//     const responseText = result.response.text();

//     return res.status(200).json(
//         new ApiResponse(200, { answer: responseText }, "AI response generated successfully")
//     );
// });



// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { ApiError } from "../utils/ApiError.js";
// import { Property } from "../models/property.model.js";
// import { Chat } from "../models/chat.model.js";
// import { calculateTrueCost } from "../utils/trueCostCalculator.js";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Fetch existing chat history when user opens the widget
// export const getChatHistory = asyncHandler(async (req, res) => {
//     const chatDoc = await Chat.findOne({ user: req.user._id });
    
//     if (!chatDoc) {
//         return res.status(200).json(new ApiResponse(200, [], "No chat history found"));
//     }

//     return res.status(200).json(new ApiResponse(200, chatDoc.history, "History fetched"));
// });

// export const chatWithPropertyAssistant = asyncHandler(async (req, res) => {
//     const { query, propertyIds } = req.body;
//     const userId = req.user._id;

//     if (!query || !query.trim()) {
//         return res.status(400).json(new ApiError(400, "Query prompt is required"));
//     }

//     // Property Context Logic
//     let propertyContextString = "No specific properties shortlisted yet.";
//     if (propertyIds && Array.isArray(propertyIds) && propertyIds.length > 0) {
//         const properties = await Property.find({ _id: { $in: propertyIds } }).lean();
//         if (properties.length > 0) {
//             const propertiesWithCost = properties.map(prop => ({
//                 title: prop.title,
//                 location: prop.location,
//                 bhk: prop.bhk,
//                 baseRent: prop.rent || prop.price,
//                 estimatedTrueMonthlyCost: calculateTrueCost(prop),
//                 amenities: prop.amenities
//             }));
//             propertyContextString = JSON.stringify(propertiesWithCost, null, 2);
//         }
//     }

//     const systemPrompt = `
// You are the Jadoo Housing Intelligence AI Assistant.
// Always format your response using clean Markdown. Use Markdown tables for comparisons.
// Answer based on factual numbers. Do not provide unverified claims.

// Current Property Context:
// ${propertyContextString}
// `;

//     // 1. Get or Create Chat History in DB
//     let chatDoc = await Chat.findOne({ user: userId });
//     if (!chatDoc) {
//         chatDoc = await Chat.create({ user: userId, history: [] });
//     }

//     // 2. Format History for Gemini API
//     const geminiHistory = chatDoc.history.map(msg => ({
//         role: msg.role,
//         parts: [{ text: msg.text }]
//     }));

//     // 3. Initialize Gemini Chat Session
//     const model = genAI.getGenerativeModel({ 
//         model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
//         systemInstruction: systemPrompt 
//     });

//     const chatSession = model.startChat({ history: geminiHistory });

//     // 4. Send Message and Get Response
//     const result = await chatSession.sendMessage(query);
//     const responseText = result.response.text();

//     // 5. Save the new exchange to DB
//     chatDoc.history.push({ role: 'user', text: query });
//     chatDoc.history.push({ role: 'model', text: responseText });
//     await chatDoc.save();

//     return res.status(200).json(
//         new ApiResponse(200, { answer: responseText }, "AI response generated successfully")
//     );
// });

// ye code me pure db se search karke jawab dega + shortlist bhi compare karega 