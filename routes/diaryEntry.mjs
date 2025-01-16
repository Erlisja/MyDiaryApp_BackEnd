import express from 'express';
import diaryEntryController from "../controllers/diaryEntry.mjs";
import authenticationToken from "../middleware/authenticationToken.js"; // import the authenticationToken middleware to protect the diary entry routes

const router = express.Router();

// // seed Route
// // !!! seed route is only for development purposes. It should be removed in deployment
// router.get('/seed',diaryEntryController.seed)   // seed route

// TODO: Add routes for CRUD operations on diary entries

//TODO 1. Get all diary entries
// ***   GET       /diary-entries - responds with an array of all diary entries
router.get('/', authenticationToken, diaryEntryController.getAllDiaryEntries)    // get all diary entries

//TODO: 2. Create a new diary entry
// ***   POST      /diary-entries - creates a new diary entry
router.post('/diary-entries', authenticationToken, diaryEntryController.createDiaryEntry)   // create a new diary entry

//TODO:  3. Get last 5 diary entry
// ***   GET       /diary-entries/last5 - responds with an array of the last 5 diary entries
router.get('/last5', authenticationToken, diaryEntryController.getSomeEntries)   // get the last 5 diary entries

//TODO:  4. Update a single diary entry
router.put('/:id', authenticationToken, diaryEntryController.updateDiaryEntry)   // update a single diary entry

//TODO:  5. Delete a single diary entry
router.delete('/:id', authenticationToken, diaryEntryController.deleteDiaryEntry)   // delete a single diary entry


// TODO: 7. Get the count of all diary entries
router.get('/count', authenticationToken, diaryEntryController.getDiaryEntriesCount);



// //TODO:  8. Get all dates for diary entries
// ***  GET       /diary-entries/dates/:date responds with an array of all diary entries for a given date
router.get('/dates',authenticationToken, diaryEntryController.getDates)   // get all diary entries for a given date



// TODO:  6. Get a single diary entry by id
router.get('/:id', authenticationToken,diaryEntryController.getSingleDiaryEntry)   // get a single diary entry by id


//TODO:  6. Get all diary entries by mood
//TODO:  7. Get all diary entries by tag



//TODO:  9. Get all diary entries by title and content
//TODO:  10. Get all diary entries by favorite
//TODO:  11. Get all diary entries by date range


export default router;
