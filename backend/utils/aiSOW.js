import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});



export default async function generateSOW(data) {
  try {
    // Add safeguards for missing fields
    const safeData = {
      title: data.title || "Untitled Project",
      description: data.description || "No description provided",
      budget: data.budget || "Not specified",
      deadline: data.deadline || "Not specified",
      technology: data.technology || "Not specified",
    };

    const prompt = `
Create a professional Statement of Work (SOW) document for the following project. Write in clear, formal English.

Project Title: ${safeData.title}
Description: ${safeData.description}
Budget: ${safeData.budget}
Deadline: ${safeData.deadline}
Technology/Stack: ${safeData.technology}

Structure the SOW with these exact sections:
1. Project Overview
2. Scope of Work
3. Deliverables
4. Milestones and Timeline
5. Assumptions and Dependencies (if any)
6. Payment Terms (reference the budget)

Keep it realistic and professional. Aim for 600–1200 words.
`;

    console.log("[Groq Request] Prompt length:", prompt.length, "chars");
    console.log("[Groq Request] Model: llama3-70b-8192");

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
    model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 2000,          // ← Very important: without this many calls fail or return empty
      top_p: 0.9,
      max_tokens: 1500,
    });

    const content = chatCompletion.choices?.[0]?.message?.content;

    if (!content || content.trim() === "") {
      throw new Error("Groq returned empty or no content");
    }

    console.log("[Groq Success] First 150 chars:", content.slice(0, 150));
    return content;

  } catch (error) {
    console.error("=== GROQ API CALL FAILED ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    if (error.response) {
      // Groq usually returns error in response.data
      console.error("Status code:", error.response.status);
      console.error("Error details from Groq:", error.response.data);
    } else if (error.request) {
      console.error("No response received - network issue or timeout");
      console.error(error.request);
    } else {
      console.error("Setup/Unknown error:", error);
    }

    // Return better message for debugging
    return `Failed to generate SOW - ${error.message || "Unknown Groq error"} (check server logs)`;
  }
}