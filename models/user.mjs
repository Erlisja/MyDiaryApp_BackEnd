import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
      
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
    // 'this' is the user doc - this will be set to the user doc that is being saved
    if(!this.isModified('password')) return next();
    // password has been changed - salt and hash it
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next()
});

const User = mongoose.model('User', userSchema);

export default User;


