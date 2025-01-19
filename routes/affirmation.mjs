// routes/affirmation.js
import express from "express";
import { getAffirmation } from "../controllers/affirmation.mjs";
const router = express.Router();

router.get("/affirmation", async (req, res) => {
  const mood = req.query.mood || "neutral"; // Default to "neutral" if no mood is provided
  try {
    const affirmation = await getAffirmation(mood);
    res.json({ affirmation });
  } catch (error) {
    console.error("Error generating affirmation:", error);
    res.status(500).json({ error: "Failed to generate affirmation." });
  }
});

export default router;