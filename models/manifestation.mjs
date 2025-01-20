import mongoose from "mongoose";

const manifestationSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text:{
        type:String,
        required: true,
        trim:true,
    },
    category:{
        type:String,
        required:true,
        enum:["Health", "Wealth", "Love", "Happiness", "Success"],
        index:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        index:true
    },
    }
,{timestamps:true});


export default mongoose.model("Manifestation", manifestationSchema);