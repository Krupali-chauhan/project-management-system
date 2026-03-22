// import Task from "../models/Task.js";
// export const getDeveloperTasks = async (req, res) => {
//   try {
//     const devId = req.user.id;   // 🔥 logged-in developer

//     const tasks = await Task.find({ assignedTo: devId })
//       .populate("projectId", "title")
//       .populate("milestoneId", "title");

//     res.json(tasks);

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error fetching tasks" });
//   }
// };
// export const updateTaskStatus = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { status } = req.body;

//     const task = await Task.findByIdAndUpdate(
//       taskId,
//       { status },
//       { new: true }
//     );

//     res.json({ message: "Status updated", task });

//   } catch (err) {
//     res.status(500).json({ message: "Error updating status" });
//   }
// };
// export const updateTaskStatus = async (req, res) => {
//   try {
//     const { id } = req.params;   // ✅ FIXED
//     const { status } = req.body;

//     const task = await Task.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     res.json({
//       message: "Status updated successfully",
//       task
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error updating status" });
//   }
// };
import Task from "../models/Task.js";

export const getDeveloperTasks = async (req, res) => {
  try {
    const devId = req.user.id;

    const tasks = await Task.find({ assignedTo: devId })
      .populate("projectId", "title")
      .populate("milestoneId", "title");

    res.json(tasks);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// ✅ FINAL FIXED FUNCTION
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;   // ✅ IMPORTANT
    const { status } = req.body;

    console.log("Updating Task:", id, status); // 🔍 debug

    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Status updated successfully",
      task
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating status" });
  }
};