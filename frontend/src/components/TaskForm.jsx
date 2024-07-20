import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Textarea } from "@chakra-ui/react";

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/tasks/", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "1em"}}>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default TaskForm;
