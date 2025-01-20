import openai from '../services/openai.js'
import Manifestation from "../models/manifestation.mjs";


export const generateManifestation = async (req, res) => {
  try {
    // Retrieve user ID from the authenticated request
    const userId = req.user._id;

    // Check if user is authenticated
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Please log in to generate manifestations." });
    }
    // Retrieve the category from the request body
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ message: "Please provide a category." });
    }

    // Call OpenAI API to generate manifestations
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.8, // Higher temperature results in more creative responses
      frequency_penalty: 0.5, // Higher penalty will result in less repetition
      messages: [
        { role: "system", content: "You are a motivational coach providing meaningful, empowering, and unique manifestations tailored to a person's emotional state. Provide me only the three manifestations. Do not include any introduction or greeting." },
        {
          role: "user",
          content: `Create three strong positive manifestations for someone based on their ${category} of interest. Use these examples as inspiration:
          1. 'I am the architect of my life; I build its foundation and choose its contents.'
          2. 'Every challenge I face is an opportunity to grow stronger and wiser.'
          3. 'I deserve love, respect, and success, and I will not settle for less.'
          Make the manifestation personalized, meaningful, and impactful.`,
        },
      ],
    });

    const manifestationText = response.choices[0].message.content;

    console.log("Generated Manifestation:", manifestationText);

    // Return the generated manifestation
    res.json({
      userId, // Include the user ID in the response
      manifestation: manifestationText
    });
  } catch (error) {
    console.error("Error generating manifestation:", error);
    res.status(500).json({ message: "Failed to generate manifestation." });
  }
};


// Create a new controller function named createManifestation that takes in the request and response objects as parameters.
export const createManifestation = async (req, res) => {
  const { text, category } = req.body;
  const userId = req.user._id; // Get the user id from the user object

  try {
    const newManifestation = new Manifestation({
      user: userId, // Add the user id to the new manifestation
      text,
      category,
    });
    await newManifestation.save(); // Save the new manifestation to the database
    res.status(201).json({ message: "Manifestation saved!", newManifestation });
  } catch (error) {
    res.status(500).json({ message: "Failed to create manifestation" });
  }
}

// Get Manifestations by User
export const getManifestations = async (req, res) => {
  const userId = req.user._id

  try {
    const manifestations = await Manifestation.find({ user: userId })
    res.status(200).json(manifestations)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error })
  }
}

// Delete a manifestation from the list
export const deleteManifestation = async (req, res) => {
  const userId = req.user._id
  const { id } = req.params
  try {
    const deletedEntry = await Manifestation.findByIdAndDelete({
      user: userId,
      _id: id
    })
    // if the entry does not exists in the db, send a message
    if (!deletedEntry) {
      res.status(400).send("This entry is not found in the database")
    }
    res.status(200).json({ message: "Manifestation deleted successfully", deletedEntry })

  } catch (error) {
    res.status(500).json({ message: "Failed to delete the manifestation from the list" })
  }
}