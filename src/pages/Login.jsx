// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Container, Card, CardContent, TextField, Button, Typography, Alert, Box } from '@mui/material';
// import { authAPI } from '../services/api';
// import { GoogleLogin } from '@react-oauth/google'; // Import karein

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await authAPI.login(formData);
//       localStorage.setItem('token', response.data.access_token);
//       navigate('/'); // Go to Home
//     } catch (err) {
//       setError('Invalid email or password');
//     }
//   };
//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//         // Token Backend bhejen
//         const res = await authAPI.googleLogin({ token: credentialResponse.credential });
//         localStorage.setItem('token', res.data.access_token);
//         navigate('/');
//     } catch (err) {
//         alert("Google Login Failed");
//     }
// };
//   return (
//     <Container maxWidth="sm" sx={{ mt: 10 }}>
//       <Card elevation={3}>
//         <CardContent sx={{ p: 4 }}>
//           <Typography variant="h4" align="center" gutterBottom color="primary">
//             🎤 VoiceExpense Pro
//           </Typography>
//           <Typography variant="h6" align="center" mb={3}>Login</Typography>

//           {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//           <form onSubmit={handleSubmit}>
//             <TextField fullWidth label="Email" type="email" margin="normal" required
//               onChange={(e) => setFormData({...formData, email: e.target.value})} />
//             <TextField fullWidth label="Password" type="password" margin="normal" required
//               onChange={(e) => setFormData({...formData, password: e.target.value})} />

//             <Button fullWidth variant="contained" type="submit" size="large" sx={{ mt: 3 }}>
//               Login
//             </Button>
//              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
//         <GoogleLogin
//             onSuccess={handleGoogleSuccess}
//             onError={() => console.log('Login Failed')}
//         />
//     </Box>
//             <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate('/register')}>
//               Create New Account
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google"; // ✅ Hook Import kiya
import { Google as GoogleIcon } from "@mui/icons-material";
import { authAPI } from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // ✅ Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login(formData);
      localStorage.setItem("token", response.data.access_token);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  // ✅ Google Login Function (Custom Hook)
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google Access Token:", tokenResponse.access_token);

        // 1. Backend ko token bhejo
        // (Dhyan rakhein ki backend me bhi 'access_token' wala update kar diya ho)
        const res = await authAPI.googleLogin({
          access_token: tokenResponse.access_token,
        });

        // 2. Token ko LocalStorage me save karo (Zaroori hai!)
        localStorage.setItem("token", res.data.access_token);

        // 3. Alert dikhao (Optional)
        // alert("Login Successful!");

        // 4. Redirect to Home (Redirect yahan hoga)
        navigate("/");
      } catch (err) {
        console.error("Login Error:", err);
        setError("Google Login Failed (Backend Error)");
      }
    },
    onError: () => setError("Google Login Failed (Popup Closed)"),
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom color="primary">
            🎤 VoiceExpense Pro
          </Typography>
          <Typography variant="h6" align="center" mb={3}>
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              sx={{ mt: 3 }}
            >
              Login
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 2, mb: 1 }}>
            OR
          </Typography>
          <Button
            fullWidth
            sx={{ mt: 1, textTransform: "none" }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </Button>
          {/* ✅ Custom Google Button */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={() => loginWithGoogle()} // Hook call
            sx={{ mb: 2 }}
          >
            Continue with Google
          </Button>

          <Button fullWidth onClick={() => navigate("/register")}>
            Create New Account
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
