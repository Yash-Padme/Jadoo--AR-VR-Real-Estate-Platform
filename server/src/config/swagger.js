import swaggerJsdoc from "swagger-jsdoc";

// OpenAPI metadata shared by the Swagger UI and generated API specification.
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Jadoo API",
            version: "1.0.0",
            description: "API documentation for the Jadoo AR/VR real-estate platform."
        },
        servers: [
            {
                url: "http://localhost:8000",
                description: "Local development server"
            }
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "accessToken",
                    description: "JWT access token stored in the accessToken cookie."
                }
            },
            schemas: {
                ApiResponse: {
                    type: "object",
                    properties: {
                        statusCode: { type: "integer", example: 200 },
                        data: {},
                        message: { type: "string", example: "Success" },
                        success: { type: "boolean", example: true }
                    }
                },
                Property: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "665f1a2b3c4d5e6f78901234" },
                        title: { type: "string", example: "Modern 2 BHK Apartment" },
                        description: { type: "string" },
                        location: { type: "string", example: "Pune" },
                        pincode: { type: "string", example: "411001" },
                        price: { type: "string", example: "2500000" },
                        rent: { type: "number", example: 25000 },
                        maintenance: { type: "number", example: 2500 },
                        size: { type: "string", example: "1200 sq ft" },
                        VRImage: { type: "string", format: "uri" },
                        type: { type: "string", example: "Apartment" },
                        amenities: { type: "string", example: "Parking, Gym" },
                        contact: { type: "string", example: "9876543210" },
                        bhk: { type: "string", example: "2" },
                        propertyType: { type: "string", example: "Apartment" },
                        furnished: {
                            type: "string",
                            enum: ["Unfurnished", "Semi-Furnished", "Fully Furnished"]
                        },
                        commuteTime: { type: "number", example: 30 },
                        latitude: { type: "string", example: "18.5204" },
                        longitude: { type: "string", example: "73.8567" }
                    }
                }
            }
        }
    },
    apis: ["./src/routes/*.js"]
};

export const swaggerSpec = swaggerJsdoc(options);
