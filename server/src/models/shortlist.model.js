import { Schema, model } from "mongoose";

// Stores the properties saved by a user for later viewing.
const shortlistSchema = new Schema({
    // Each shortlist belongs to one user.
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        // Ensures a user has one shortlist document containing all saved properties.
        unique: true
    },
    // References the properties added to the user's shortlist.
    properties: [{
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }]
}, { timestamps: true });

// Export the model used to add, remove, and retrieve shortlisted properties.
export const Shortlist = model('Shortlist', shortlistSchema);