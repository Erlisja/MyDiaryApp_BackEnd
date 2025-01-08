import express from 'express';
const router = express.Router();
import diaryEntryController from "../controllers/diaryEntry.mjs";


// seed Route
// !!! seed route is only for development purposes. It should be removed in deployment
router.get('/seed',diaryEntryController.seed)   // seed route

// TODO: Add routes for CRUD operations on diary entries

//TODO: 1. Get all diary entries
// ***   GET       /diary-entries - responds with an array of all diary entries
router.get('/', diaryEntryController.getAllDiaryEntries)    // get all diary entries

//TODO: 2. Create a new diary entry
//TODO:  3. Get a single diary entry
//TODO:  4. Update a single diary entry
//TODO:  5. Delete a single diary entry
//TODO:  6. Get all diary entries by mood
//TODO:  7. Get all diary entries by tag
//TODO:  8. Get all diary entries by date
//TODO:  9. Get all diary entries by title and content
//TODO:  10. Get all diary entries by favorite
//TODO:  11. Get all diary entries by date range


export default router;
