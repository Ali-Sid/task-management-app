import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/tasks/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
      ))}
    </div>
  );
};

export default TaskList;
