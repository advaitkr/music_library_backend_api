const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const getAllUsers = async(req,res)=>{
    try{
        const users = await User.find().select('-password');
        res.status(200).json({success:true,users})
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}
const updateUserRole = async(req,res)=>{
   try{
        const {id} = req.params;
        const {role} = req.body;
        if(role ==='Admin'){
            return res.status(403).json({success:false,message:'Cannot modify Admin role'})
        }
        const user = await User.findByIdAndUpdate(id,{role},{new:true})
        if(!user){
            return res.status(404).json({success:false,message:'User not found'})
        }
        res.status(200).json({success:true,message:'User role updated',user})
   }catch(error){
      res.status(500).json({success:false,message:error.message})
   }
}
const deleteUser = async(req,res)=>{
     try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({success:false,message:'User not found'})
        }
        res.status(200).json({success:true,message:'User deleted successfully'})
     }catch(error){
        res.status(500).json
     }
}


// Add a new user
const addUser = async (req, res) => {
    const { email, password, role } = req.body;

    // Validate input
    if (!email || !password || !role) {
        return res.status(400).json({ error: 'Invalid request payload' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = new User({
            user_id: uuidv4(),
            email,
            password: hashedPassword,
            role,
        });

        await user.save();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.user_id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error adding user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Invalid request payload' });
    }

    try {
        // Get the authenticated user
        const user = await User.findOne({ user_id: req.user.user_id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify the current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password
        user.password = hashedPassword;
        await user.save();

        res.status(204).send(); // No Content
    } catch (error) {
        console.error('Error updating password:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {getAllUsers,updateUserRole,deleteUser,addUser,updatePassword}