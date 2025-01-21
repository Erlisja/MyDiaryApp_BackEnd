// openai.js
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Initialize the OpenAI API client


export default openai;