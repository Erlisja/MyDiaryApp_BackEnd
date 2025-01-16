import DiaryEntry from '../models/diaryEntry.mjs';



// seed data
// !!!! seed route is only for development purposes. It should be removed in deployment

async function seed(req, res) {
    const Today = new Date();

    try {
        await DiaryEntry.create({
            title: "My first diary entry",
            content: "I am so happy to start this diary",
            tags: ["happy", "excited"],
            mood: "happy",
            isFavorite: false,
            createdAt: Today

        },
            {
                title: "Started working on my project",
                content: "I am so happy to start this project. I hope it goes well. This will be my capstone project for PerScholas",
                tags: ["happy", "excited"],
                mood: "excited",
                isFavorite: false,
                createdAt: new Date("2025-01-03T08:45:00Z"), // Custom  date
            },
            {
                title: "I lost my wallet",
                content: "I am so sad. I lost my wallet today. I hope I can find it soon",
                tags: ["sad"],
                mood: "sad",
                isFavorite: false,
                createdAt: new Date("2025-01-04T08:45:00Z"), // Custom date
            },
            {
                title: "I am so angry",
                content: "I am so angry. I can't believe I lost my wallet. I hope I can find it soon",
                tags: ["angry"],
                mood: "angry",
                isFavorite: false,
                createdAt: new Date("2025-01-05T08:45:00Z"), // Custom date
            },
            {
                title: "I am so disgusted",
                content: "I am so disgusted. I can't believe I lost my wallet. I hope I can find it soon",
                tags: ["disgusted"],
                mood: "disgusted",
                isFavorite: false,
                createdAt: new Date("2025-01-06T08:45:00Z"), // Custom date
            },
            {
                title: "I am so surprised",
                content: "I am so surprised. Today it was an amazing day. I got a new job offer. I am so happy",
                tags: ["surprised"],
                mood: "surprised",
                isFavorite: false,
                createdAt: new Date("2025-01-07T08:45:00Z"),
            },
            {
                title: "Today was a neutral day",
                content: "Nothing special happened today. It was a neutral day",
                tags: ["neutral"],
                mood: "neutral",
                isFavorite: false,
                createdAt: new Date("2025-01-08T08:45:00Z"),
            }
        )
        res.status(201).send("Database has been populated with seed data!");

    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong when populating the database!");
    }
}

// ** =====  CRUD operations on diary entries ====== **

// ** CREATE */
// function that creates diary entries
async function createDiaryEntry(req, res) {
    const { title, content, tags, mood, isFavorite, createdAt } = req.body;
    const userId = req.user._id;  // get the user id from the request object after the user has been authenticated by the authenticationToken middleware
    console.log(req.body);

    try {
        const newDiaryEntry = await DiaryEntry.create({
            title,
            content,
            tags,
            mood,
            isFavorite,
            createdAt,
            user: userId // add the user id to the diary entry
        });
        console.log(newDiaryEntry);
        res.status(201).json(newDiaryEntry);
    } catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong while creating a new diary entry");
    }
}


//** GET */
// get all diary entries
async function getAllDiaryEntries(req, res) {
    const userId = req.user._id; // get the user id from the request object after the user has been authenticated by the authenticationToken middleware
    try {
        const diaryEntries = await DiaryEntry.find({ user: userId }); // find all diary entries that belong to the authenticated user
        res.status(200).json(diaryEntries);
    } catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong while getting all diary entries");
    }
}



// Get the count of all diary entries
async function getDiaryEntriesCount(req, res) {
     console.log("Request User:", req.user); // Log the user object

    const userId = req.user._id; // get the user id from the request object
    console.log("userid", userId);
    try {
        const filter = { user: userId }; // filter diary entries by user id
        console.log("Filter for countDocuments:", filter);
        const diaryEntriesCount = await DiaryEntry.countDocuments(filter); // count all diary entries that belong to the authenticated user
        res.status(200).json({'count':diaryEntriesCount}); // Return the count of diary entries
    } catch (e) {
        console.error("Error fetching count:", e);  // Log error details
        // res.status(500).send("Something went wrong while getting all diary entries");
        res.status(500).send(e, req.user);
    }
}





// Get all diary entry dates
async function getDiaryEntryDates(req, res) {
    const userId = req.user._id; // get the user id from the request object after the user has been authenticated by the authenticationToken middleware
    try {
        const diaryEntryDates = await DiaryEntry.find({ user: userId }).distinct("createdAt"); // find all diary entries that belong to the authenticated user
        res.status(200).json(diaryEntryDates);
    } catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong while getting all diary entry dates");
    }
}

// get diary entry by date
async function getDiaryEntryByDate(req, res) {
    const { date } = req.params; // get the date from the request parameters
    const userId = req.user._id; // get the user id from the request object after the user has been authenticated by the authenticationToken middleware
    console.log("Date received:", date);
    try {
        const diaryEntry = await DiaryEntry.findOne({ user: userId, createdAt: date }); // find a diary entry that belongs to the authenticated user and has the specified date
        if (!diaryEntry) {
            return res.status(404).send("Diary entry not found");
        }
        res.status(200).json(diaryEntry);
    } catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong while getting the diary entry by date");
    }
}


async function getDates(req, res) {
    const userId = req.user._id;
    try {
        const dates = await DiaryEntry.find({ user: userId }).distinct("createdAt");
        res.status(200).json(dates);
    } catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong while getting all diary entry dates");
    }   
}



//** UPDATE */
 // update a diary entry
async function updateDiaryEntry(req, res) {
    const { id } = req.params; // get the diary entry id from the request parameters
    const userId = req.user._id; // get the user id from the request object after the user has been authenticated by the authenticationToken middleware
    const { title, content, tags, mood, isFavorite } = req.body; // get the updated diary entry data from the request body

    try {
        const updatedDiaryEntry = await DiaryEntry.findOneAndUpdate(
            {
                _id: id,
                user: userId
            },
            {
                title,
                content,
                tags,
                mood,
                isFavorite
            },
            {
                new: true
            }
        );
        if (!updatedDiaryEntry) {
            return res.status(404).send("Diary entry not found");
        }
        console.log(updatedDiaryEntry);
        res.status(200).json(updatedDiaryEntry);
    } catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong while updating the diary entry");
    }

}

// Get the last 5 diary entries
async function getSomeEntries(req, res) {
    const userId = req.user._id; // get the user id from the request object after the user has been authenticated by the authenticationToken middleware
    try {
        const diaryEntries = await DiaryEntry.find({ user: userId }).sort({ createdAt: -1 }).limit(5); // find all diary entries that belong to the authenticated user
        res.status(200).json(diaryEntries);
    } catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong while getting all diary entries");
    }

}


// //** DELETE */
// delete a diary entry
async function deleteDiaryEntry(req, res) {
    const { id } = req.params; // get the diary entry id from the request parameters
    const userId = req.user._id; // get the user id from the request object after the user has been authenticated by the authenticationToken middleware

    try {
        const deletedDiaryEntry = await DiaryEntry.findOneAndDelete({
            _id: id,
            user: userId
        });
        if (!deletedDiaryEntry) {
            return res.status(404).send("Diary entry not found");
        }

        console.log(deletedDiaryEntry);

        // !!! send the deleted diary entry as a response (this is optional) check the front end to see if you need to send the deleted diary entry as a response
        res.status(200).json(deletedDiaryEntry); // send the deleted diary entry as a response
    } catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong while deleting the diary entry");
    }
}


// ** GET a single diary entry */   
// get a single diary entry
async function getSingleDiaryEntry (req, res) {
    const {id} = req.params; // get the diary entry id from the request parameters
    const userId = req.user._id; // get the user id from the request object after the user has been authenticated by the authenticationToken middleware

    try{
        const diaryEntry = await DiaryEntry.findOne({_id: id, user: userId});
        if(!diaryEntry){
            return res.status(404).send("Diary entry not found");
        }
        console.log(diaryEntry);
        res.status(200).json(diaryEntry);

    }catch(e){
        res.status(500).send(e);
    }
}

export default {getDates, seed, getAllDiaryEntries, updateDiaryEntry, createDiaryEntry,deleteDiaryEntry, getSomeEntries, getSingleDiaryEntry,getDiaryEntriesCount,getDiaryEntryDates, getDiaryEntryByDate};



