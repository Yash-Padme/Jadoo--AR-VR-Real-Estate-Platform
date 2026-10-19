import { Schema, model } from "mongoose";

// Stores the property-search preferences for a user.
const userPreferenceSchema = new Schema({
    // Each user has one preference profile.
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    // Main filters used when recommending properties.
    city: { type: String, required: true, trim: true },
    budget: { type: Number, required: true },
    propertyType: { type: String, required: true },
    bhk: { type: Number, required: true },
    maxCommute: { type: Number, required: true }, 
    // List of facilities the user prefers in a property.
    amenities: [{ type: String }] 
}, { timestamps: true });

// Export the model used to save and retrieve a user's search preferences.
export const UserPreference = model('UserPreference', userPreferenceSchema);