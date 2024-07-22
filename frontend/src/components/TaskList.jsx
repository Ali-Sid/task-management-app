import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress, useMediaQuery } from "@mui/material";
import TaskItem from "./TaskItem";
import EditTaskForm from "./EditTaskForm"; // Import the new EditTaskForm component

const TaskList = ({ tasks, setTasks }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [editTask, setEditTask] = useState(null);
  const [editedFields, setEditedFields] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      //   const response = await axios.get('http://localhost:8000/tasks');
      const response = await axios.get(
        "https://task-management-app-y6b9.onrender.com/tasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEditClick = (task) => {
    setEditTask(task);
    setEditedFields({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleDeleteClick = async (taskId) => {
    try {
      //   await axios.delete(`http://localhost:8000/tasks/${taskId}`);
      await axios.delete(
        `https://task-management-app-y6b9.onrender.com/tasks/${taskId}`
      );
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "todo"
        ? "In Progress"
        : currentStatus === "In Progress"
        ? "Done"
        : "todo";
    try {
      await axios.put(
        `https://task-management-app-y6b9.onrender.com/tasks/${id}`,
        {
          //   await axios.put(`http://localhost:8000/tasks/${id}`, {
          status: newStatus,
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `https://task-management-app-y6b9.onrender.com/tasks/${editTask.id}`,
        editedFields
      );
        // await axios.put(
        //   `http://localhost:8000/tasks/${editTask.id}`,
        //   editedFields
        // );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTask.id ? { ...task, ...editedFields } : task
        )
      );
      setEditTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFields((prev) => ({ ...prev, [name]: value }));
  };

  const rowsWithIndex = tasks.map((task, index) => ({
    ...task,
    index: index + 1,
  }));

  const columns = [
    { field: "index", headerName: "#", width: 90 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      display: "flex",
      alignItems: "center",
      renderCell: (params) => (
        <TaskItem
          task={params.row}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          onStatusChange={handleStatusChange}
        />
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%", margin: isMobile && "0 auto" }}>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
        <>
          <DataGrid
            rows={rowsWithIndex}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{ width: isMobile ? "410px" : "100%" }}
          />
          {editTask && (
            <div style={{ marginTop: 50, marginBottom: 50 }}>
              <EditTaskForm
                task={editedFields}
                onSaveChanges={handleSaveChanges}
                onChange={handleChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskList;
