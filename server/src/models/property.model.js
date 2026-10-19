import { Schema, model } from "mongoose";

// Defines the details stored for each property listed on the platform.
const propertySchema = new Schema({
    // Basic information used to identify and describe the property.
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    // Address and size information shown in property listings.
    location: { type: String, required: true },
    pincode: { type: String, required: true },
    price: { type: String, required: true },
    size: { type: String, required: true },
    // Path or URL of the image used for the property's VR experience.
    VRImage: { type: String, required: true },
    type: { type: String, required: true },
    area: { type: String, required: true, trim: true }, 
    // Available facilities and contact details for interested users.
    amenities: { type: String, required: true },
    contact: { type: String, required: true, trim: true }, 
    // References the user who owns or manages the property.
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    
    // PRD Rental Fields (Optional for backward compatibility)
    // Rental-specific values are optional so older property records remain valid.
    rent: { type: Number, required: false },
    deposit: { type: Number, required: false },
    maintenance: { type: Number, required: false },
    bhk: { type: String, required: true },
    propertyType: { type: String, required: false },
    // Restricts furnishing values to the options supported by the application.
    furnished: { 
        type: String, 
        enum: ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'], 
        required: false 
    },
    // Optional location data used for commute calculations or map features.
    commuteTime: { type: Number, required: false }, 
    latitude: { type: String, required: false },
    longitude: { type: String, required: false }
}, { timestamps: true });

// Export the model used to create, search, and update property listings.
export const Property = model('Property', propertySchema);