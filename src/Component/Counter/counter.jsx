import { Box, Grid, Grow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const CounterBar = () => {
  const [counters, setCounters] = useState({
    product: 0,
    clients: 0,
    experience: 0,
  });

  // Target values for counters
  const targetCounters = {
    product: 250,
    clients: 120,
    experience: 20,
  };

  // Increment values
  const incrementValues = {
    product: Math.ceil(targetCounters.product / 100), // Adjust this to make the counting smoother
    clients: Math.ceil(targetCounters.clients / 100),
    experience: Math.ceil(targetCounters.experience / 100),
  };

  useEffect(() => {
    const updateCounters = () => {
      setCounters((prevCounters) => ({
        product: Math.min(prevCounters.product + incrementValues.product, targetCounters.product),
        clients: Math.min(prevCounters.clients + incrementValues.clients, targetCounters.clients),
        experience: Math.min(prevCounters.experience + incrementValues.experience, targetCounters.experience),
      }));
    };

    const intervalId = setInterval(updateCounters, 50); // Adjust interval time to smooth out counting

    return () => clearInterval(intervalId);
  }, [incrementValues]);

  return (
    <Box textAlign="center" mt={9} mb={2}>
      <Grow in timeout={1000}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                color: 'black',
                transform: `scale(${counters.product / targetCounters.product})`,
                transition: 'transform 0.2s ease-in-out',
              }}
            >
              {counters.product}+
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ color: 'black' }}>
              Personalized Print Product
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                color: 'black',
                transform: `scale(${counters.clients / targetCounters.clients})`,
                transition: 'transform 0.2s ease-in-out',
              }}
            >
              {counters.clients}+
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ color: 'black' }}>
              Happy Clients
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                color: 'black',
                transform: `scale(${counters.experience / targetCounters.experience})`,
                transition: 'transform 0.2s ease-in-out',
              }}
            >
              {counters.experience}+
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ color: 'black' }}>
              Years of Experience
            </Typography>
          </Grid>
        </Grid>
      </Grow>
    </Box>
  );
};

export default CounterBar;
