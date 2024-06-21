import { Box, Grid, Grow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const CounterBar = () => {
  const [counters, setCounters] = useState({
    product: 0,
    clients: 0,
    stores: 0,
    service: 0
  });

  // Target values for counters
  const targetCounters = {
    product: 15000,
    clients: 1000000,
    stores: 25,
    service: 17
  };

  // Increment values
  const incrementValues = {
    product: Math.ceil(targetCounters.product / 100), // Adjust this to make the counting smoother
    clients: Math.ceil(targetCounters.clients / 100),
    stores: Math.ceil(targetCounters.stores / 100),
    service: Math.ceil(targetCounters.service / 100)
  };

  useEffect(() => {
    const updateCounters = () => {
      setCounters((prevCounters) => ({
        product: Math.min(prevCounters.product + incrementValues.product, targetCounters.product),
        clients: Math.min(prevCounters.clients + incrementValues.clients, targetCounters.clients),
        stores: Math.min(prevCounters.stores + incrementValues.stores, targetCounters.stores),
        service: Math.min(prevCounters.service + incrementValues.service, targetCounters.service)
      }));
    };

    const intervalId = setInterval(updateCounters, 50); // Adjust interval time to smooth out counting

    return () => clearInterval(intervalId);
  }, [incrementValues]);

  // Format function to convert number to readable format
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    } else {
      return num.toString();
    }
  };

  return (
    <Box textAlign="center" mt={9} mb={2}>
      <Grow in timeout={1000}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
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
              {formatNumber(counters.product)}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ color: 'black' }}>
              Personalized Print Product
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
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
              {formatNumber(counters.clients)}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ color: 'black' }}>
              Happy Clients
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                color: 'black',
                transform: `scale(${counters.service / targetCounters.service})`,
                transition: 'transform 0.2s ease-in-out',
              }}
            >
              {counters.service}+
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ color: 'black' }}>
              of Service Excellence
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                color: 'black',
                transform: `scale(${counters.stores / targetCounters.stores})`,
                transition: 'transform 0.2s ease-in-out',
              }}
            >
              {counters.stores}+
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ color: 'black' }}>
              Stores across 6 Cities
            </Typography>
          </Grid>
        </Grid>
      </Grow>
    </Box>
  );
};

export default CounterBar;
