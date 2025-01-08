import DiaryEntry from '../models/diaryEntry.mjs';

// seed data

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

// get all diary entries
async function getAllDiaryEntries(req, res) {
    try{
        const diaryEntries = await DiaryEntry.find({});
        res.status(200).json(diaryEntries);
    }catch(e){
        console.log(e);
        res.status(500).send("Something went wrong while getting all diary entries");
    }
}


export default { seed, getAllDiaryEntries};