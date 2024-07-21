import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
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
  CircularProgress,
} from '@mui/material';
import TaskItem from './TaskItem';
import EditTaskForm from './EditTaskForm';

const TaskList = ({ tasks, fetchTasks }) => {
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [editTask, setEditTask] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  const handleEditClick = (task) => {
    setEditTask(task);
    setEditedFields({ ...task });
  };

  const handleDeleteClick = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:8000/tasks/${editTask.id}`, editedFields);
      fetchTasks();
      setEditTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFields((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    { field: 'index', headerName: '#', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <TaskItem
          task={params.row}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%', margin: isMobile && "0 auto" }}>
      {loading ? (
        <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
      ) : (
        <>
          <DataGrid
            rows={tasks}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{ width: isMobile ? "410px" : "100%" }}
          />
          {editTask && (
            <div style={{ marginTop: 50, marginBottom: 20 }}>
              <Typography variant="h6" fontWeight="bold" fontSize={isMobile ? "18px" : "24px"}>
                Edit Task
              </Typography>
              <EditTaskForm
                task={editTask}
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
