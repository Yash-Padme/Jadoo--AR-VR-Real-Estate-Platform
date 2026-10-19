// Provides a consistent response structure for API results.
class ApiResponse{
    
    // Store the status, returned data, message, and derived success state.
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
    
}

export {ApiResponse}