import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Box from '@mui/material/Box';

function MyCalendar({ onDateSelect }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    onDateSelect(selectedDate);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Calendar 
        onChange={handleDateChange} 
        value={date} 
      />
    </Box>
  );
}

export default MyCalendar;
