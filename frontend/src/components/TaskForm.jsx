import React, { useState } from "react";
import axios from "axios";
import { Textarea } from "@chakra-ui/react";
import { Box, Button, Input, useMediaQuery } from "@mui/material";
import { AddIcon } from "@chakra-ui/icons";

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/tasks/", { title, description });
      fetchTasks();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1em" }}
    >
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
