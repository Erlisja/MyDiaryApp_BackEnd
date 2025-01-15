import mongoose from "mongoose";

const goalsEntrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    title:{
        type:String,
        required:[true, "Title is required"],
        trim:true,
        maxlength:[100, "Title cannot be more than 100 characters"],
    },
    description:{
        type:String,
        trim:true,
        maxLength:[500, "Description cannot be more than 500 characters"],
    },
    deadline:{
        type:Date,
        required:[true, "Deadline is required"],
        index:true
    },
    priority:{
        type:String,
        enum:["Low", "Medium", "High"],
        default:"medium",
        index:true
    },
    status:{
        type:String,
        enum:["Not Started", "In Progress", "Completed"],
        default:"Not Started"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true,
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
},{timestamps:true});


export default mongoose.model("GoalsEntry", goalsEntrySchema);