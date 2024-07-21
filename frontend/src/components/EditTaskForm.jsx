import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const EditTaskForm = ({ task, onSaveChanges, onChange }) => {
  return (
    <Grid container mt={1} spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={task.title}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={task.status}
            onChange={onChange}
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
          value={task.description}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={onSaveChanges}>
          Save Changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditTaskForm;
