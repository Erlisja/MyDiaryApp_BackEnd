import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 4
    },

}, {
    timestamps: true,   // this will automatically add the createdAt and updatedAt fields
    toJSON: { // this will remove the password when we return the user object
        transform: (doc, ret) => {
            delete ret.password;
            return ret;
        }
    }
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    try {
        // if the password has not been modified, then we don't need to hash it
        if (!this.isModified('password')) {
            return next();
        }
        // if the password has been modified, then we need to hash it
        let hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }

});

const User = mongoose.model('User', userSchema);

export default User;


