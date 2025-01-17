import goalsEntry from "../models/goalsEntry.mjs";
import mongoose from "mongoose";

// ***** CRUD  operations for goalsEntry *****

// ** 1. Create a new goal entry
async function createGoalEntry(req, res) {
    const { title, description, deadline, priority } = req.body;
    const userId = req.user._id; // get the user id from the request object after the user has been authenticated by the authenticationToken middleware

    try {
        const newGoalEntry = await goalsEntry.create({
            title,
            description,
            deadline,
            priority,
            user: userId // add the user id to the goal entry
        })
        console.log(newGoalEntry);
        res.status(200).json(newGoalEntry);
    } catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong while creating a new goal entry");
    }
}

// ** 2. Get all goal entries
async function getAllGoals(req, res) {
    const userId = req.user._id;
    try {
        const goalEntries = await goalsEntry.find({ user: userId });
        res.status(200).json(goalEntries);

    } catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong while getting all goal entries");
    }
}

// ** 3. UPDATE a single goal entry
async function updateGoalEntry(req, res) {
    const { title, description, deadline, priority,status } = req.body;
    const userId = req.user._id;
    const { id } = req.params;

    

    try {
        const updatedGoalEntry = await goalsEntry.findOneAndUpdate(
            {
                _id: id,
                user: userId
            },
            {
                title,
                description,
                deadline,
                priority,
                status
            },
            {
                new: true // return the updated entry
            }
        );
        if (!updatedGoalEntry) {
            return res.status(404).send("Goal entry not found");
        }
        console.log(updatedGoalEntry);
        res.status(200).json(updatedGoalEntry);

    } catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong while updating the goal entry");
    }
}

// ** 4. DELETE a single goal entry
async function deleteGoalEntry(req, res) {
    const {id} = req.params;
    const userId = req.user._id;

    try{
        const deletedGoalEntry = await goalsEntry.findOneAndDelete({
            _id:id,
            user:userId
        });
        if(!deletedGoalEntry){
            return res.status(404).send("Goal entry not found");
        }
        console.log(deletedGoalEntry);
        res.status(200).json(deletedGoalEntry);
    }catch(e){
        console.log(e);
        res.status(500).send("Something went wrong while deleting the goal entry");
    }
    
}

// get the total number of goals
async function getGoalCount(req, res) {
    const userId = req.user._id;
    try {
        const goalCount = await goalsEntry.countDocuments({ user: userId });
        res.status(200).json({'count': goalCount});
    } catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong while getting the total number of goals");
    }
}



export default { createGoalEntry, getAllGoals, updateGoalEntry, deleteGoalEntry,getGoalCount };
