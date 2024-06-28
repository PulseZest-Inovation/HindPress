import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import WhatsAppButton from '../../Component/Whatsapp/Chat';

const Footer = () => {
  return (
    <Box component="footer" sx={styles.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={styles.section}>
              <Typography variant="h6" sx={styles.title}>About Hind Press</Typography>
              <Typography variant="body2" sx={styles.text}>
             Hind Press
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2.5}>
            <Box sx={styles.section}>
              <Typography variant="h6" sx={styles.title}>Useful Links</Typography>
              <Typography variant="body2" sx={styles.text}>
                <Link href="#" sx={styles.link}>Introduction</Link> <br />
                <Link to='/about' sx={styles.link}>About Us</Link> <br />
                <Link to='/contact' sx={styles.link}>Contact Us</Link> <br />
                <Link href="#" sx={styles.link}>Pricing Plans</Link> <br />
                <Link to='/policy' sx={styles.link}>Privacy Policy</Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2.5}>
            <Box sx={styles.section}>
              <Typography variant="h6" sx={styles.title}>Important Links</Typography>
              <Typography variant="body2" sx={styles.text}>
                <Link href="#" sx={styles.link}>Cookies Policy</Link> <br />
                <Link to='/terms' sx={styles.link}>Terms & Conditions</Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Box sx={styles.section}>
              <Typography variant="h6" sx={styles.title}>Contact Info</Typography>
              <Typography variant="body2" sx={styles.text}>
                Email: info@hindpresscom <br />
                Phone: +91  1111111111
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={styles.bottomBar}>
          <Typography variant="body2" sx={styles.bottomText}>
            Copyright © 2024  Hind Press- by hind press
          </Typography>
        </Box>
      </Container>
      <WhatsAppButton phoneNumber="9598919119" />
    </Box>
  );
};

const styles = {
  footer: {
    backgroundColor: '#fff',
    color: '#000', // Setting text color to black
    padding: '50px 0', // Increased padding to make the footer taller
    position: 'relative',
    bottom: 0,
    width: '100%',
  },
  section: {
    padding: '10px',
  },
  title: {
    fontSize: '18px',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '14px',
    lineHeight: '1.6',
  },
  link: {
    color: '#61dafb',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  bottomBar: {
    marginTop: '20px',
    borderTop: '1px solid #444',
    paddingTop: '10px',
    textAlign: 'center',
  },
  bottomText: {
    fontSize: '14px',
    color: 'black',
  },
};

export default Footer;
