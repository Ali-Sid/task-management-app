import React from 'react';
import { Button } from '@mui/material';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const TaskItem = ({ task, onEditClick, onDeleteClick }) => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button variant="contained" color="primary" onClick={() => onEditClick(task)}>
        <EditIcon />
      </Button>
      <Button variant="contained" color="secondary" onClick={() => onDeleteClick(task.id)}>
        <DeleteIcon />
      </Button>
    </div>
  );
};

export default TaskItem;
