import Milestone from "../models/Milestone.js";
import AdminProject from "../models/AdminProject.js";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const generateMilestones = async (req, res) => {
  try {
    const { projectId } = req.body;

    const project = await AdminProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ❌ STOP DUPLICATE
    const existing = await Milestone.findOne({ projectId });
    if (existing) {
      return res.json({ message: "Milestones already generated" });
    }

    const sow = project.sow;

    // 🔥 FINAL STRONG UNIVERSAL PROMPT
    const prompt = `
You are an expert software project planner.

STRICT RULES:
- Carefully READ the full SOW
- Identify REAL modules, features, and functionality from SOW
- DO NOT use generic terms like "requirement gathering"
- DO NOT repeat same output across projects
- Every project MUST have UNIQUE phases based on SOW

TASK:
Divide the project into EXACTLY 4 phases:
1. Planning Phase
2. Design Phase
3. Development Phase
4. Testing Phase

INSTRUCTIONS:
- Planning should include actual modules from SOW (not generic text)
- Design should include UI/UX or system architecture from SOW
- Development should include actual implementation features
- Testing should include real testing logic

Each phase MUST contain:
{
  "title": "",
  "description": "",
  "features": [],
  "techStack": [],
  "deadline": ""
}

IMPORTANT:
- Extract features directly from SOW content
- If SOW mentions modules like login, payment, booking, dashboard → include them
- If SOW mentions tech → include it
- Each project output MUST be DIFFERENT

Return ONLY JSON ARRAY with 4 objects.

SOW:
${sow}
`;

    let phases = [];

    try {
      const response = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 1,   // 🔥 MAX creativity (important)
        max_tokens: 1500
      });

      let aiText = response?.choices?.[0]?.message?.content || "";

      // 🔥 JSON EXTRACT
      const start = aiText.indexOf("[");
      const end = aiText.lastIndexOf("]") + 1;

      if (start !== -1 && end !== -1) {
        const json = aiText.substring(start, end);
        const parsed = JSON.parse(json);

        if (
          Array.isArray(parsed) &&
          parsed.length === 4 &&
          parsed.every(p => p.title && p.description)
        ) {
          phases = parsed;
        } else {
          throw new Error("Invalid AI format");
        }
      } else {
        throw new Error("No JSON found");
      }

    } catch (err) {
      console.log("❌ AI FAILED:", err.message);

      return res.status(500).json({
        message: "AI failed to generate milestones. Try again."
      });
    }

    // ✅ SAVE
    const milestones = phases.map(p => ({
      projectId,
      title: p.title,
      description: p.description,
      features: p.features || [],
      techStack: p.techStack || [],
      deadline: p.deadline || ""
    }));

    await Milestone.insertMany(milestones);

    res.json({
      message: "Milestones Generated Successfully 🚀"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};


// =============================
// GET ALL MILESTONES
// =============================
export const getAllMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find()
      .populate("projectId", "title");

    res.json(milestones);

  } catch (err) {
    res.status(500).json({ message: "Error fetching milestones" });
  }
};