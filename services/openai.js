// openai.js
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Initialize the OpenAI API client

// export const getAffirmation = async (mood) => {
//   const response = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     temperature: 0.8, // Higher temperature results in more creative responses
//     max_tokens: 60, // Maximum number of tokens to generate
//     frequency_penalty: 0.5, // Higher penalty will result in less repetition.
//     messages: [
//       { role: "system", content: "You are a motivational coach providing meaningful, empowering, and unique manifestations tailored to a person's emotional state."},
//       {
//         role: "user",
//         content: `Create a strong positive affirmation for someone who is feeling ${mood}. Use these examples as inspiration:
//         1. 'I am the architect of my life; I build its foundation and choose its contents.'
//         2. 'Every challenge I face is an opportunity to grow stronger and wiser.'
//         3. 'I deserve love, respect, and success, and I will not settle for less.'
//         Make the affirmation personalized, meaningful, and impactful.`,

//       },
//     ],
//   });
//   return response.choices[0].message.content;
// };

export default openai;