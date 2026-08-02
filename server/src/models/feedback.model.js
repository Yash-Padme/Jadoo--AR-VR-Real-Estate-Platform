import { Schema, model } from "mongoose";

const feedbackSchema = new Schema({
    user_id: 
    { type: Schema.Types.ObjectId, ref: 'User' },
    property_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Property' 
    },
    rating: Number,
    comment: String,
    timestamp: Date,
});
  
export const Feedback = model('Feedback', feedbackSchema);
  