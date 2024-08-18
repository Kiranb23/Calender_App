import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function EventModal({ event, isOpen, onClose, onDelete, onEdit }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box 
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
        <Typography variant="h6" component="h2">
          {event.title}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {event.description}
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EventModal;
