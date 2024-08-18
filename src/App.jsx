import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MyCalendar from './components/MyCalendar';
import EventList from './components/EventList';
import EventModal from './components/EventModal';
import EventFormModal from './components/EventFormModal';
import './styles.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEventFormClose = () => {
    setIsEventFormOpen(false);
    setIsEditing(false);
    setSelectedEvent(null);
  };

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, date: selectedDate }]);
    handleEventFormClose();
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
    handleEventFormClose();
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    handleModalClose();
  };

  const startEditEvent = (event) => {
    setSelectedEvent(event);
    setIsEditing(true);
    setIsEventFormOpen(true);
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        {/* Calendar section */}
        <Grid item xs={12} md={9}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Calendar
              </Typography>
              <MyCalendar onDateSelect={handleDateSelect} />
            </CardContent>
          </Card>
        </Grid>

        {/* Event details section */}
        <Grid item xs={12} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Events on {selectedDate.toDateString()}
              </Typography>
              <EventList 
                events={events.filter(event => event.date.toDateString() === selectedDate.toDateString())} 
                onEventClick={handleEventClick} 
              />
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setIsEventFormOpen(true)} 
                sx={{ mt: 2 }}
                fullWidth
              >
                Add Event
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {selectedEvent && 
        <EventModal 
          event={selectedEvent} 
          isOpen={isModalOpen} 
          onClose={handleModalClose} 
          onDelete={() => deleteEvent(selectedEvent.id)}
          onEdit={() => startEditEvent(selectedEvent)}
        />
      }

      {isEventFormOpen && (
        <EventFormModal
          isOpen={isEventFormOpen}
          onClose={handleEventFormClose}
          onSubmit={isEditing ? updateEvent : addEvent}
          eventToEdit={isEditing ? selectedEvent : null}
        />
      )}
    </Box>
  );
}

export default App;
