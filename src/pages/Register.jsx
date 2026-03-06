import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, TextField, Button, Typography, Alert } from '@mui/material';
import { authAPI } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (!payload.phone) delete payload.phone; // Empty phone fix

    try {
      await authAPI.register(payload);
      alert('Registration Successful! Please Login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration Failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            🎤 VoiceExpense Pro
          </Typography>
          <Typography variant="h6" align="center" mb={3}>Register</Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Name" margin="normal" required 
              onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <TextField fullWidth label="Email" type="email" margin="normal" required 
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <TextField fullWidth label="Phone (Optional)" margin="normal" 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            <TextField fullWidth label="Password" type="password" margin="normal" required 
              onChange={(e) => setFormData({...formData, password: e.target.value})} />

            <Button fullWidth variant="contained" type="submit" size="large" sx={{ mt: 3 }}>
              Register
            </Button>
            <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate('/login')}>
              Already have an account? Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;