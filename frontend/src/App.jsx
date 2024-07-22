import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import axios from "axios";
import { useMediaQuery } from "@mui/material";

function App() {
  const [tasks, setTasks] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // const response = await axios.get('http://localhost:8000/tasks');
      const response = await axios.get('https://task-management-app-y6b9.onrender.com/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  return (
    <div className="App">
      <h2>Task Management App</h2>
      <TaskForm setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
