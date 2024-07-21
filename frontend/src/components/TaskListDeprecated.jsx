import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const TaskList = ({ tasks, fetchTasks }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [editTask, setEditTask] = useState(null);
  const [editedFields, setEditedFields] = useState({
    title: "",
    description: "",
    status: "",
  });

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
      await axios.delete(`http://localhost:8000/tasks/${taskId}`);
      fetchTasks();
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
      await axios.put(`http://localhost:8000/tasks/${id}`, {
        status: newStatus,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:8000/tasks/${editTask.id}`,
        editedFields
      );
      fetchTasks();
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
    index: index + 1, // Display index starting from 1
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
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditClick(params.row)}
          >
            <EditIcon />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteClick(params.row.id)}
          >
            <DeleteIcon />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%", margin: isMobile && "0 auto" }}>
      <DataGrid
        rows={rowsWithIndex}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={{ width: isMobile ? "410px" : "100%" }}
      />
      {editTask && (
        <div style={{ marginTop: 50, marginBottom: 20 }}>
          <Typography variant="h6" fontWeight='bold' fontSize={isMobile ? "18px" : "24px"}>Edit Task</Typography>
          <Grid container mt={1} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={editedFields.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={editedFields.status}
                  onChange={handleChange}
                  label="Status"
                  sx={{ textAlign: "left" }}
                >
                  <MenuItem value="todo">todo</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={editedFields.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default TaskList;
