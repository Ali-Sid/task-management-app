import React, { useState } from "react";
import axios from "axios";

const TaskItem = ({ task, fetchTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState(task.status);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/tasks/${task.id}`, {
        title: newTitle,
        description: newDescription,
        status: newStatus,
      });
      fetchTasks();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${task.id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleStatus = async () => {
    try {
      await axios.put(`http://localhost:8000/tasks/${task.id}`, {
        ...task,
        status: task.status === "pending" ? "completed" : "pending",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button onClick={handleToggleStatus}>
            Mark as {task.status === "pending" ? "Completed" : "Pending"}
          </button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
