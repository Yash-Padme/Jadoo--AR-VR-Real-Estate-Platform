import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Shortlist } from "../models/shortlist.model.js";
import { Property } from "../models/property.model.js";
import { calculateTrueCost } from "../utils/trueCostCalculator.js";

// Toggle a property in the user's shortlist.
// If it already exists, remove it; otherwise add it.
export const toggleShortlist = asyncHandler(async (req, res) => {
    const { propertyId } = req.body;
    const userId = req.user._id;

    // Find the shortlist document for this user.
    let shortlist = await Shortlist.findOne({ user: userId });

    // Create a new shortlist if the user has none yet.
    if (!shortlist) {
        shortlist = await Shortlist.create({ user: userId, properties: [propertyId] });
        return res.status(201).json(new ApiResponse(201, shortlist, "Property added to shortlist"));
    }

    // Check whether the property is already in the shortlist.
    const isShortlisted = shortlist.properties.includes(propertyId);

    // Update the array in-place: add or remove the property ID.
    if (isShortlisted) {
        shortlist.properties.pull(propertyId);
    } else {
        shortlist.properties.addToSet(propertyId);
    }

    await shortlist.save();

    return res.status(200).json(
        new ApiResponse(200, shortlist, isShortlisted ? "Property removed from shortlist" : "Property added to shortlist")
    );
});

// Fetch the current user's shortlist and append a calculated "true monthly cost" to each property.
export const getShortlist = asyncHandler(async (req, res) => {
    // Populate property details so the client gets full listing data, not just IDs.
    const shortlist = await Shortlist.findOne({ user: req.user._id })
        .populate("properties")
        .lean();

    if (!shortlist) {
        return res.status(200).json(new ApiResponse(200, { properties: [] }, "Shortlist is empty"));
    }

    // Add a derived metric for each property to help UX and comparison screens.
    shortlist.properties = shortlist.properties.map(prop => ({
        ...prop,
        trueMonthlyCost: calculateTrueCost(prop)
    }));

    return res.status(200).json(new ApiResponse(200, shortlist, "Shortlist fetched successfully"));
});

// Compare 2 to 3 properties side by side.
// This is typically used by the frontend comparison modal or property evaluation screen.
export const compareProperties = asyncHandler(async (req, res) => {
    const { propertyIds } = req.body; // Expects an array like: ["id1", "id2"]

    // Enforce a valid comparison size.
    if (!propertyIds || propertyIds.length < 2 || propertyIds.length > 3) {
        return res.status(400).json(new ApiError(400, "Please provide exactly 2 or 3 property IDs to compare."));
    }

    // Fetch only the selected listings and compute their effective monthly cost.
    let properties = await Property.find({ _id: { $in: propertyIds } }).lean();

    properties = properties.map(prop => ({
        ...prop,
        trueMonthlyCost: calculateTrueCost(prop)
    }));

    return res.status(200).json(new ApiResponse(200, properties, "Property comparison data generated"));
});