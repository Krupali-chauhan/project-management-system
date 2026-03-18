import { GoogleGenerativeAI } from "@google/generative-ai";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    
    // 1. API Key check
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ reply: "Error: API Key missing in .env" });
    }

    // 2. Initialize SDK
    const genAI = new GoogleGenerativeAI(apiKey.trim());

    // 3. Get Model (Using 1.5-flash which is the current standard)
    // Note: We are NOT passing apiVersion here, let the SDK choose the best default
    const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest"
});

    // 4. Generate Content
    const result = await model.generateContent(message);
    const text = result.response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error("--- Gemini Error Log Start ---");
    console.error("Full Error:", error); 
    console.error("--- Gemini Error Log End ---");

    res.status(500).json({ 
      reply: "AI Error: " + (error.message || "Unknown Error") 
    });
  }
};