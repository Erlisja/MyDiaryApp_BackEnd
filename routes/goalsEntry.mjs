import express from 'express';
import goalsEntryController from "../controllers/goalsEntry.mjs";
import authenticationToken from "../middleware/authenticationToken.js"; // import the authenticationToken middleware to protect the goals entry routes

const router = express.Router();

// GET all goals entries route
router.get('/', authenticationToken, goalsEntryController.getAllGoals) // get all goals entries

// POST a new goal entry route
router.post('/newGoal', authenticationToken, goalsEntryController.createGoalEntry) // create a new goal entry

// PUT an updated goal entry route
router.put('/:id', authenticationToken, goalsEntryController.updateGoalEntry) // update a single goal entry

// DELETE a goal entry route
router.delete('/:id', authenticationToken, goalsEntryController.deleteGoalEntry) // delete a single goal entry


export default router;
