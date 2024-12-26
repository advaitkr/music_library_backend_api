const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { generateToken } = require('../utils/authUtils');
const signup = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Validate the input
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({user_id: uuidv4(), email, password: hashedPassword, role });
        
        // Save the user
        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id);

        // Respond with success
        res.status(201).json({
            message: 'User registered successfully',
            token,
        });

    } catch (error) {
        console.error('Signup Error:', error); // Log error details for debugging
        res.status(500).json({
            message: 'Server Error',
            error: error.message || 'Unknown error occurred',
        });
    }
};
const login = async(req,res)=>{
    try {
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({success:false,message:'User not found'})
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).json({success:false,message:'Invalid credentials'})
    }
    const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRATION
    })
    res.status(200).json({sucess:true,token})
  }catch(error){
    res.status(500).json({sucess:false,message:error})
  }
}
const logout = (req,res)=>{
    res.status(200).json({success:true,message:'Logged out successfully'})
}

module.exports = {signup,login,logout}