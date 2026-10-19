import {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Defines the data stored for each registered user.
const userSchema = new Schema({
  // Username is normalized and indexed for fast, case-insensitive lookups.
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true, 
    index: true
  },
  // Email is unique so one email address cannot create multiple accounts.
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowecase: true, 
    trim: true,  
  }, 
  // Passwords are hashed before being saved; plain-text passwords are never stored.
  password: {
    type: String,
    required: [true, "Password is required!!"],
  },
  // Stores the refresh token used to obtain a new access token.
  refreshToken: {
    type: String
  },
},{timestamps: true})

// Hash the password only when it is new or has been changed.
userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// Compare a supplied password with the stored hash during login.
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password);
}

// Create a short-lived access token containing the user's identity and role.
userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id: this._id,
    email: this.email,
    userName: this.userName,
    role: this.role
  },
    process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  })
}

// Create a refresh token that can be used to renew the access token.
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id: this._id,
  },
    process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  })
}

// Export the model used to create and authenticate users.
export const User = model("User", userSchema)