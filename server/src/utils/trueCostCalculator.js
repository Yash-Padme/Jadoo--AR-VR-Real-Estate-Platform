// Calculate the estimated recurring cost of a property beyond its base rent.
export const calculateTrueCost = (property) => {
    // Extract base rent (falling back to existing 'price' field for older docs)
    const baseRent = Number(property.rent || property.price || 0);
    const maintenance = Number(property.maintenance || 0);
    
    // Add estimated fixed costs defined by the current product requirements.
    const estimatedUtilities = 1500;
    const parking = 0; 
    const estimatedTransport = 2000;

    return baseRent + maintenance + estimatedUtilities + parking + estimatedTransport;
};