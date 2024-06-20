import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" align="center" style={{ marginTop: '50px' }}>
        Welcome to Your Application
      </Typography>
      <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
        This is your home page content. You can add more sections, features, or information here.
      </Typography>
      <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
        Feel free to customize this page according to your application's needs.
      </Typography>
    </Container>
  );
};

export default Home;
