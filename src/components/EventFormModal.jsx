import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';

function EventFormModal({ isOpen, onClose, onSubmit, eventToEdit }) {
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
      id: eventToEdit ? eventToEdit.id : new Date().getTime().toString(),
      title,
      description,
      date: eventToEdit ? eventToEdit.date : new Date(), // Use the selected date
    };
    onSubmit(event);
    setTitle('');
    setDescription('');
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box 
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {eventToEdit ? 'Edit Event' : 'Add Event'}
        </Typography>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="contained" color="primary" type="submit">
            {eventToEdit ? 'Update' : 'Add'}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EventFormModal;
