import User from '../models/user.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ==== Create function ====
// *** This function creates a new user and a JWT token for the user if the user does not exist in the database

async function create(req, res) {
    try {
        // add the user to the database
        const createdUser = await User.create(req.body);
        //create a JWT token for the user
        const token = createJWT(createdUser);
        res.status(200).json(token);
    }
    catch (error) {
        res.status(401).json('An error occurred. Please try again');
    }
}

// ==== Helper function to create a JWT token ====
function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}

//*** UPDATE function 
// function to update a user's information, name and password, the email cannot be updated 

async function update(req, res) {
    try {
        const { email, password, username, newPassword } = req.body;
        

        // Find the user by email
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(404).json('User not found. Please sign up');
        }

        // Ensure the current password is provided
        if (!password || !foundUser.password) {
            return res.status(400).json('Current password is required');
        }

        // Compare the current password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(401).json('Invalid current password. Please try again');
        }

        // Prepare the updates
        const updates = {};
        if (username) updates.username = username;
        if (newPassword) {
            updates.password = await bcrypt.hash(newPassword, 10);
        }
        console.log('Updates:', updates);

        // Update the user's data
        const updatedUser = await User.findOneAndUpdate({ email }, updates, { new: true });
        

        // Generate a new token
        const token = createJWT(updatedUser);
        console.log('New token:', token);

        // Send the updated user and token (excluding password) in the response
        const { password: _, ...userWithoutPassword } = updatedUser.toObject();
        res.status(200).json({ message: 'User updated successfully', user: userWithoutPassword, token });
    } catch (error) {
       
        res.status(500).json('An error occurred. Please try again');
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json('User not found');
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json('Invalid credentials');
        }

        // Generate a new token
        const token = createJWT(user);
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        
        res.status(500).json('An error occurred. Please try again');
    }
}

export default { create, login, update };






