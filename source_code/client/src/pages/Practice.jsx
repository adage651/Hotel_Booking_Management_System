import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const RoomListPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch rooms data from your backend API
    fetchRooms()
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  const fetchRooms = () => {
    // Simulated API call to fetch rooms data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Replace this with your actual API call to fetch rooms data
        const data = [
          { id: 1, name: 'Single Room', price: 100 },
          { id: 2, name: 'Double Room', price: 150 },
          { id: 3, name: 'Suite', price: 250 },
        ];
        resolve(data);
      }, 1000);
    });
  };

  const bookRoom = (room) => {
    // Handle room booking logic
    console.log('Booked room:', room);
    // Redirect or perform any other action as needed
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Room List
      </Typography>
      <Grid container spacing={2}>
        {rooms.map(room => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {room.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Price: ${room.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => bookRoom(room)}
                >
                  Book
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RoomListPage;