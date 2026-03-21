import React, { useEffect, useState } from "react";
import axios from "axios";

function PMTasks() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/tasks/pm-tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTasks(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
  <h2 style={{ marginBottom: "20px" }}>Project Tasks</h2>

  <div style={{
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    overflow: "hidden"
  }}>

    <table style={{
      width: "100%",
      borderCollapse: "collapse"
    }}>

      <thead style={{
        background: "#f5f7fb",
        textAlign: "left"
      }}>
        <tr>
          <th style={{ padding: "14px" }}>Task</th>
          <th>Project</th>
          <th>Milestone</th>
          <th>Developer</th>
          <th>Department</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <tr key={task._id}
            style={{
              borderTop: "1px solid #eee",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#fafafa"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
          >

            <td style={{ padding: "14px", fontWeight: "500" }}>
              {task.title}
            </td>

            <td>{task.projectId?.title}</td>

            <td>{task.milestoneId?.title}</td>

            <td>
              <b>{task.assignedTo?.name}</b>
            </td>

            <td>
              <span style={{
                background: "#eef2ff",
                color: "#3730a3",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px"
              }}>
                {task.department}
              </span>
            </td>

            <td>
              <span style={{
                padding: "5px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "500",
                background:
                  task.status === "completed"
                    ? "#d1fae5"
                    : task.status === "in-progress"
                    ? "#fef3c7"
                    : "#e5e7eb",
                color:
                  task.status === "completed"
                    ? "#065f46"
                    : task.status === "in-progress"
                    ? "#92400e"
                    : "#374151"
              }}>
                {task.status}
              </span>
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  </div>
</div>
  );
}

export default PMTasks;