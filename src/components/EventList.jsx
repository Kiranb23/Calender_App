import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function EventList({ events, onEventClick }) {
  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3}>
        <List>
          {events.length === 0 ? (
            <ListItem>
              <ListItemText primary="No events for this date" />
            </ListItem>
          ) : (
            events.map(event => (
              <React.Fragment key={event.id}>
                <ListItem button onClick={() => onEventClick(event)}>
                  <ListItemText primary={event.title} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
}

export default EventList;
