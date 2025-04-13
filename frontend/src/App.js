import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://todo-app-backend-fopd.onrender.com/todos";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask, completed: false }),
    });
    setNewTask("");
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const handleToggleComplete = async (task) => {
    await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: task.title, completed: !task.completed }),
    });
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingText(task.title);
  };

  const handleUpdate = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editingText }),
    });
    setEditingTaskId(null);
    setEditingText("");
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <header>
        <h1 className="app-title">REACT'S</h1>
        <h1 className="todo-title">My To-Do List</h1>
        <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      <div className="input-group">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAdd}>Add Task</button>
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-card">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task)}
            />
            {editingTaskId === task.id ? (
              <>
                <input
                  className="edit-input"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => handleUpdate(task.id)}>Save</button>
              </>
            ) : (
              <span className={task.completed ? "completed" : ""}>
                {task.title}
              </span>
            )}
            <div className="task-actions">
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>
    </div>
  );
}

export default App;
