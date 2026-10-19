import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';


// Middleware to verify JSON Web Token (JWT) for authentication.
// It extracts the token, verifies it, and attaches the user object to the request.
export const verifyJWT = asyncHandler(async(req,res,next)=>{
   try {
    // Extract token from cookies or Authorization header (Bearer token).
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
 
    // If no token is found, return an unauthorized error.
    if(!token){
      return res
      .status(401)
      .json(
         new ApiError(401, "Unauthorized Request!!" )
      ) 
    }
 
    // Verify the token using the ACCESS_TOKEN_SECRET from environment variables.
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
 
    // Find the user based on the decoded token's ID, excluding sensitive info.
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
 
    // If no user is found with the decoded ID, the token is invalid or user doesn't exist.
    if(!user){
      return res
      .status(401)
      .json(
         new ApiError(401, "Invalid access token!!")
      ) 
    }
 
    // Attach the found user object to the request for subsequent middleware/controllers.
    req.user = user;
    
    // Proceed to the next middleware or route handler.
    next();
   } catch (error) {
      // Handle any errors during token verification (e.g., expired, malformed token).
      return res
      .status(401)
      .json(
         new ApiError(401, error?.message || "Invalid access token!!")
      ) 
   }
})