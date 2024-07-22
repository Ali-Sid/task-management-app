import React, { useState } from "react";
import axios from "axios";
import { Textarea } from "@chakra-ui/react";
import { Alert, AlertTitle, Box, Button, Input, useMediaQuery } from "@mui/material";
import { AddIcon } from "@chakra-ui/icons";

const TaskForm = ({ setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const isMobile = useMediaQuery("(max-width:600px)")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setAlertMessage("Title and Description are required.");
      setAlertSeverity("error");
      return;
    }

    try {
      // const response = await axios.post("http://localhost:8000/tasks/", { title, description });
      const response = await axios.post("https://task-management-app-y6b9.onrender.com/tasks/", { title, description });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTitle("");
      setDescription("");
      setAlertMessage("Task added successfully!");
      setAlertSeverity("success");

      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error adding task:", error);
      setAlertMessage("Error adding task. Please try again.");
      setAlertSeverity("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1em" }}
    >
      {alertMessage && (
        <Alert severity={alertSeverity} sx={{ marginBottom: "1em" }}>
          <AlertTitle>{alertSeverity === "error" ? "Error" : "Success"}</AlertTitle>
          {alertMessage}
        </Alert>
      )}

      <Input
        variant="outline"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        multiline
        maxRows={4}
        fullWidth
      />
      <Box>
        <Button variant="contained" sx={{ width: "fit-content" }} type="submit">
          Add Task <span style={{marginLeft: "10px"}}><AddIcon /></span>
        </Button>
      </Box>
    </form>
  );
};

export default TaskForm;
