import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function EventForm({ onSubmit, eventToEdit, onReset }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDescription(eventToEdit.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [eventToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      id: eventToEdit ? eventToEdit.id : uuidv4(),
      title,
      description,
      date: eventToEdit ? eventToEdit.date : new Date(),
    };
    onSubmit(event);
    setTitle('');
    setDescription('');
    if (onReset) onReset();
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ mb: 2, display: 'flex', flexDirection: 'column' }}
    >
      <TextField 
        label="Event Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        variant="outlined" 
        fullWidth 
        margin="normal"
        required 
      />
      <TextField 
        label="Event Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        variant="outlined" 
        multiline 
        rows={4} 
        fullWidth 
        margin="normal"
        required 
      />
      <Button type="submit" variant="contained" color="primary">
        {eventToEdit ? 'Update Event' : 'Save Event'}
      </Button>
    </Box>
  );
}

export default EventForm;
