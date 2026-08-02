//mycode

import Property from "../models/property.model.js";

/**
 * Dynamically builds a MongoDB query based on extracted criteria
 */
export const searchProperties = async (filters) => {
  const query = {};

  if (filters.location) {
    // Case-insensitive partial matching
    query.location = { $regex: filters.location, $options: "i" };
  }

  if (filters.type) {
    query.type = { $regex: filters.type, $options: "i" };
  }

  if (filters.purpose) {
    query.purpose = filters.purpose.toLowerCase();
  }

  if (filters.maxPrice) {
    query.price = { $lte: Number(filters.maxPrice) };
  }

  // Fetch only the necessary fields to optimize performance and lower context token limits
  return await Property.find(query)
    .select("title location price type purpose vrTourAvailable")
    .limit(5)
    .lean();
};