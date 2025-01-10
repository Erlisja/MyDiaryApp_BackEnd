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


// ==== Login function ====
// *** This function verifies the user credentials and creates a JWT token for the user if the user exists in the database and the password matches the hashed password in the database

async function login(req, res) {
    try {
        // find the user in the database
        const foundUser = await User.findOne({ email: req.body.email });
        // if the user is not found, return an error message
        if (!foundUser) return res.status(401).json('User not found. Please sign up');
        // compare the password with the hashed password in the database
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        // if the password does not match, return an error message
        if (!match) return res.status(401).json('Invalid password. Please try again');
        // create a JWT token for the user if the password matches
        const token = createJWT(foundUser);
        res.status(200).json(token);
    } catch (error) {
        res.status(401).json('An error occurred. Please try again');

    }
}

export default { create, login }






