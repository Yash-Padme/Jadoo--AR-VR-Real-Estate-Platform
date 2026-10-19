import { Schema, model } from "mongoose";

// Stores a user's review for a specific property.
const feedbackSchema = new Schema({
    // References the user who submitted the feedback.
    user_id: 
    { type: Schema.Types.ObjectId, ref: 'User' },
    // References the property being reviewed.
    property_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Property' 
    },
    // Numerical score given by the user.
    rating: Number,
    // Written feedback describing the user's experience.
    comment: String,
    // Date and time when the feedback was submitted.
    timestamp: Date,
});
  
// Export the model used to create and retrieve property feedback.
export const Feedback = model('Feedback', feedbackSchema);
  