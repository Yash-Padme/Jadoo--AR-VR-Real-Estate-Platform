import { Schema, model } from "mongoose";

const propertySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: { 
        type:String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    VRImage: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    area: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
    },
    amenities: {
        type: String,
        required: true
    },
    contact: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true,  
    },
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
  });

export const Property = model('Property', propertySchema);