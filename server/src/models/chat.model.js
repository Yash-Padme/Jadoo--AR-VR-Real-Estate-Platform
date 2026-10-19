import { Schema, model } from "mongoose";

// Stores one conversation per user, including the messages exchanged with the model.
const chatSchema = new Schema({
    // Linking the chat to a user lets us retrieve that user's conversation history.
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        // A user can have only one chat document; new messages are appended to history.
        unique: true
    },
    // Messages are kept in order so the full conversation context can be reconstructed.
    history: [{
        role: { 
            type: String, 
            // "user" identifies the visitor's message and "model" identifies the reply.
            enum: ['user', 'model'], 
            required: true 
        },
        text: { 
            type: String, 
            required: true 
        }
    }]
// Mongoose automatically records when the conversation is created and last updated.
}, { timestamps: true });

// Export the model used by controllers and services to read and update chats.
export const Chat = model('Chat', chatSchema);