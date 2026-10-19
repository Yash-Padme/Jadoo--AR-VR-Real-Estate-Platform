import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Property } from "../models/property.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { calculateTrueCost } from "../utils/trueCostCalculator.js";

// Create a new property listing for the logged-in user.
// This endpoint accepts form data + uploaded VR media from the frontend.
const addProperty = asyncHandler(async(req, res) => {
    // Pull all relevant fields from the request body.
    // These include both old property fields and newer listing metadata.
    const { 
        name, title, description, location, price, amenities, contact, size, type, pincode,
        rent, deposit, maintenance, bhk, propertyType, furnished, commuteTime, latitude, longitude
    } = req.body;

    const user = req.user;

    // Required fields for a valid property listing.
    if (!title || !description || !size || !location || !amenities || !price || !contact || !type || !pincode || !bhk) {
        return res.status(400).json(new ApiError(400, "All required fields must be provided!!"));
    }

    // VR image is mandatory because this platform supports 360-degree virtual tours.
    const VRImageLocalPath = req.files?.VRImage?.[0]?.path;
    if (!VRImageLocalPath) {
        return res.status(400).json(new ApiError(400, "VRImage file is required!!"));
    }

    // Upload the local file to Cloudinary and store the hosted URL in MongoDB.
    const VRImage = await uploadOnCloudinary(VRImageLocalPath);

    if (!VRImage) {
        return res.status(500).json(new ApiError(500, "Something went wrong while uploading VRImage"));
    }

    // Save the property document with both legacy and newer field names.
    // This keeps older frontend code and newer AI/search features compatible.
    const property = await Property.create({
        title,
        name,
        description,
        location,
        price,
        size,
        VRImage: VRImage.secure_url,
        type,
        amenities,
        pincode,
        contact,
        owner: user._id,
        rent,
        deposit,
        maintenance,
        bhk,
        propertyType,
        furnished,
        commuteTime,
        latitude,
        longitude
    });

    if (!property) {
        return res.status(500).json(new ApiError(500, "Something went wrong while creating the property"));
    }

    return res.status(201).json(new ApiResponse(201, property, "Property is added!!"));
});

// Fetch all properties using optional filters from the query string.
// This supports searching by budget, bedroom type, furnishing, locality, and commute time.
const getAllProperty = asyncHandler(async (req, res) => {
  const { budget, bhk, furnished, locality, maxCommute } = req.query;

  // Build a Mongo query dynamically based on which filters were passed in.
  let query = {};
  if (bhk) query.bhk = { $regex: bhk, $options: "i" }; // Match BHK values case-insensitively for string-based data
  if (furnished) query.furnished = furnished;
  if (locality) query.location = { $regex: locality, $options: "i" };
  if (maxCommute) query.commuteTime = { $lte: Number(maxCommute) };

  // Fetch all matching properties from MongoDB.
  let properties = await Property.find(query).lean();

  if (!properties || properties.length === 0) {
    return res.status(404).json(new ApiError(404, "Properties not found!!"));
  }

  // Add a derived field that reflects the true monthly cost, used for budget filtering and UI display.
  properties = properties.map((prop) => ({
    ...prop,
    trueMonthlyCost: calculateTrueCost(prop),
  }));

  // Apply budget filtering after calculating effective monthly cost.
  if (budget) {
    properties = properties.filter(
      (prop) => prop.trueMonthlyCost <= Number(budget)
    );
  }

  return res.status(200).json(new ApiResponse(200, properties, "Properties found"));
});

// Fetch one property by ID and enrich it with the virtual tour URL and true monthly cost.
const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id).lean();

  if (!property) {
    return res.status(404).json(new ApiError(404, "Property not found!!"));
  }

  // Add derived fields for client-side display without mutating the DB record.
  const propertyWithTour = {
    ...property,
    trueMonthlyCost: calculateTrueCost(property),
    virtualTour: {
      tourUrl: property.VRImage, 
      type: "360-equirectangular",
    },
  };

  return res.status(200).json(new ApiResponse(200, propertyWithTour, "Property found"));
});

// Update a property record by ID.
// This accepts partial updates from the frontend and returns the updated document.
const updatePropertyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const property = await Property.findByIdAndUpdate(id, req.body, { new: true });
  if (!property) {
    return res.status(404).json(new ApiError(404, "Property not found"));
  }
  return res.status(200).json(new ApiResponse(200, property, "Property updated successfully!!"));
});

// Delete a property by ID.
const deletePropertyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const property = await Property.findByIdAndDelete(id);
  if (!property) {
    return res.status(404).json(new ApiError(404, "Property not found"));
  }
  return res.status(200).json(new ApiResponse(200, "Property deleted successfully!!"));
});

export {
  addProperty,
  getPropertyById,
  getAllProperty,
  updatePropertyById,
  deletePropertyById,
};