import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="App">
      <h2>Task Management App</h2>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
