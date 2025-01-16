import mongoose from "mongoose";

const diaryEntrySchema = new mongoose.Schema({

   title:{
         type:String,
         required:true,
         index:true
   },
    content:{
            type:String,
            required:true
    },
    tags:{
        type:[String],
        required:true
    },
    mood: {
        type: String,
        required: true,
        enum: ["happy", "sad", "angry", "excited", "disgusted", "surprised", "neutral"],
        index: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true,
    }
},{
    timestamps: true
});

// add a text index to the title and content fields
diaryEntrySchema.index({ title: "text", content: "text" });
diaryEntrySchema.index({ tags: "text" });


export default mongoose.model("DiaryEntry", diaryEntrySchema);

