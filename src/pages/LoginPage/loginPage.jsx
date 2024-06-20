import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app } from '../../utils/FireBase/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginComponent = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth(app);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const roles = ['admin']; // Example roles, replace with actual roles from user data
      onLogin(roles);
      toast.success('Login successful!', {
        position: 'top-right',
      });
      navigate('/admin');
    } catch (error) {
      const errorMessage = error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'
        ? 'Invalid email or password. Please try again.'
        : `Error signing in: ${error.message}`;
      toast.error(errorMessage, {
        position: 'top-right',
      });
      console.error('Error signing in:', error.message);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Log In</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" style={styles.button}>
            Login
          </Button>
        </form>
      </div>
      <div style={styles.watermarkContainer}>
      <div style={{ ...styles.watermark, top: '10%', left: '10%', color: '#000' }}>HIND PRESS</div>
<div style={{ ...styles.watermark, bottom: '10%', right: '10%', color: '#000' }}>Love from <span style={{ color: 'red' }}>❤ PulseZest</span></div>

      </div>
      <ToastContainer />
    </div>
  );
};
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  loginBox: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: '#fff',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    width: '100%',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
  },
  watermarkContainer: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  watermark: {
    position: 'absolute',
    opacity: '0.1',
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#000',
    zIndex: '-1',
  },
};

export default LoginComponent;
