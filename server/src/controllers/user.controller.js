import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {User} from '../models/user.model.js';
import emailValidator from 'email-validator';

// Helper to generate both access and refresh tokens for a user,
// and save the refresh token into the database for later validation.
const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};

    } catch (error) {
        return res
        .status(500)
        .json(
            new ApiError(500, "Something went wrong while generating refresh and access token!!")
        );
    }
}

// Register a new user and immediately issue auth tokens.
const registerUser = asyncHandler(async (req,res)=>{
 
    const {email, userName, password} = req.body;

    // Validate required fields before creating the user.
    if( !email || !userName || !password ){
        return res
        .status(400)
        .json(
            new ApiError(400,"All fields are required!!")
        )
    }

    // Email format validation.
    if (!emailValidator.validate(email)) {
        return res
        .status(400)
        .json(
            new ApiError(400,"Please enter a valid email address" )
        )
    }

    // Password strength check.
    if(password.length<8){
        return res
        .status(400)
        .json(
            new ApiError(400, "Password must be greater than 8 character")
        )
    }

    // Prevent duplicate accounts with the same email or username.
    const existedUser = await User.findOne({
        $or: [{email}, {userName}]
    })

    if(existedUser){
        return res
        .status(400)
        .json(
            new ApiError(400, "User with email or username already exists")
        )
    }

    // Create the user in MongoDB.
    const user = await User.create({
        email,
        password,
        userName,
    })

    // Fetch the created user without exposing password or refresh token.
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        return res
        .status(500)
        .json(
            new ApiError(500,"Something went wrong while resitering the User")
        )
    }

    // Generate tokens and attach them as cookies.
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(createdUser._id);
    
    const options = {
        httpOnly: true,
        secure: true
    };

    return res
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .status(201)
    .json(
        new ApiResponse(
            200,{
                user: createdUser, accessToken, refreshToken
            }, 
            "User Created Successfully!!")
    );
})

// Login an existing user and return fresh auth tokens.
const logInUser = asyncHandler(async(req,res)=>{

    const {email, password} = req.body;

    // Validate email field before lookup.
    if (!emailValidator.validate(email)) {
        return res
        .status(400)
        .json(
            new ApiError(400,"Please enter a valid email address" )
        )
    }

    if(!email){ 
        return res
        .status(400)
        .json(
            new ApiError(400,"Email is required!!")
        )
    }

    // Find user by email.
    const user = await User.findOne({email})

    if(!user){
        return res
        .status(400)
        .json(
            new ApiError(
                400,
                "User not found"
            )
        )
    }

    // Ensure password is provided before checking.
    if(!password){
        return res
        .status(401)
        .json(
            new ApiError(
                401,
                "Password is Required!!"
            )
        )
    }

    // Compare the submitted password with the stored hash.
    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        return res
        .status(401)
        .json(
            new ApiError(
                401,
                "Invalid Password!!"
            )
        )
    }

   // Issue new tokens after successful login.
   const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

   // Remove sensitive fields from the user payload returned to the client.
   const loggedInUser = await User.findById(user._id) .select("-password -refreshToken");

   const options = {
     httpOnly: true,
     secure: true
   };

   return res.status(200)
   .cookie('accessToken', accessToken, options)
   .cookie('refreshToken', refreshToken, options)
   .json(
    new ApiResponse(
        200,
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "User logged In Successfully!!"
    )
   )

})

// Log out the current user by clearing the refresh token and auth cookies.
const logOutUser = asyncHandler(async(req, res)=>{
    await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1
        },
    },
    {
        new: true
    }
    );

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out!!"))
})

// Return the currently authenticated user details from the request context.
const currentUser = asyncHandler(async(req,res)=>{
    try {
        const userData = req.user;

        return res.status(200)
        .json(new ApiResponse(200, userData, "Current User Data!!"));

    } catch (error) {
        console.log(error);
    }
})

export {registerUser, logInUser, logOutUser, currentUser};