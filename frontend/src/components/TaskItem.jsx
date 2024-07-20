import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, fetchTasks }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${task.id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleStatus = async () => {
    try {
      await axios.put(`http://localhost:8000/tasks/${task.id}`, {
        ...task,
        status: task.status === 'pending' ? 'completed' : 'pending',
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <button onClick={handleToggleStatus}>
        Mark as {task.status === 'pending' ? 'Completed' : 'Pending'}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
