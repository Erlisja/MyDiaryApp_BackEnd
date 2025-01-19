import openai from "../services/openai";


export const getManifestation = async (category) => {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.8, // Higher temperature results in more creative responses
      max_tokens: 60, // Maximum number of tokens to generate
      frequency_penalty: 0.5, // Higher penalty will result in less repetition.
      messages: [
        { role: "system", content: "You are a motivational coach providing meaningful, empowering, and unique manifestations tailored to a person's emotional state."},
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
    return response.choices[0].message.content;
  }