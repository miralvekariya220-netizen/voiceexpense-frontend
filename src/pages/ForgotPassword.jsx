// import React, { useState } from 'react';
// import { Container, Card, CardContent, TextField, Button, Typography, Alert } from '@mui/material';
// import { authAPI } from '../services/api';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setMessage('');
    
//     try {
//       await authAPI.forgotPassword(email);
//       setMessage('✅ Link sent! Check your email.');
//     } catch (err) {
//       setError('❌ User not found or server error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 10 }}>
//       <Card>
//         <CardContent sx={{ p: 4 }}>
//           <Typography variant="h5" align="center" gutterBottom>Reset Password</Typography>
//           <Typography variant="body2" align="center" color="textSecondary" mb={3}>
//             Enter your email to receive a reset link.
//           </Typography>

//           {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
//           {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//           <form onSubmit={handleSubmit}>
//             <TextField fullWidth label="Email Address" type="email" required 
//               onChange={(e) => setEmail(e.target.value)} />
            
//             <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }} disabled={loading}>
//               {loading ? "Sending..." : "Send Reset Link"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default ForgotPassword;




// import React, { useState, useEffect } from 'react'; // useEffect import karein
// import { Container, Card, CardContent, TextField, Button, Typography, Alert } from '@mui/material';
// import { authAPI } from '../services/api';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Direct axios for polling

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isWaiting, setIsWaiting] = useState(false); // New State
//   const [startTime, setStartTime] = useState(null);  // Kab start kiya
  
//   const navigate = useNavigate();

//   // ✅ POLLING LOGIC (Jadu yahan hai)
//   useEffect(() => {
//     let interval;
//     if (isWaiting && email) {
//       interval = setInterval(async () => {
//         try {
//           // Check status
//           // Note: Direct URL use kar rahe hain taaki API wrapper ka issue na ho
//           // Apne IP address se replace karein
//           const API_URL = 'http://192.168.1.179:8000/api/auth/check-reset-status'; 
          
//           const res = await axios.get(`${API_URL}?email=${email}`);
//           const lastReset = res.data.last_reset;

//           if (lastReset) {
//             const resetTime = new Date(lastReset).getTime();
//             // Agar reset time, button dabane ke baad ka hai
//             if (resetTime > startTime) {
//               alert("Password Reset Detected! Redirecting to Login...");
//               clearInterval(interval);
//               navigate('/login');
//             }
//           }
//         } catch (e) {
//           console.log("Polling...", e);
//         }
//       }, 3000); // Har 3 second me check karega
//     }
//     return () => clearInterval(interval);
//   }, [isWaiting, email, startTime, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setMessage('');
    
//     try {
//       await authAPI.forgotPassword(email);
//       setMessage('✅ Link sent! Check your Mobile. Waiting for reset...');
      
//       // ✅ Polling Start karein
//       setStartTime(Date.now()); // Abhi ka time note karo
//       setIsWaiting(true);       // Waiting mode ON
      
//     } catch (err) {
//       setError('❌ User not found or server error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 10 }}>
//       <Card>
//         <CardContent sx={{ p: 4 }}>
//           <Typography variant="h5" align="center" gutterBottom>Reset Password</Typography>
//           <Typography variant="body2" align="center" color="textSecondary" mb={3}>
//             Enter email. Open link in Mobile/Laptop. This page will auto-refresh.
//           </Typography>

//           {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}
//           {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//           {/* Agar waiting mode me hai to Spinner dikhayein */}
//           {isWaiting && (
//              <Typography align="center" color="primary" sx={{mb: 2, fontWeight: 'bold'}}>
//                 🔄 Waiting for you to reset password on other device...
//              </Typography>
//           )}

//           <form onSubmit={handleSubmit}>
//             <TextField fullWidth label="Email Address" type="email" required 
//               onChange={(e) => setEmail(e.target.value)} disabled={isWaiting} />
            
//             <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }} disabled={loading || isWaiting}>
//               {loading ? "Sending..." : isWaiting ? "Listening..." : "Send Reset Link"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default ForgotPassword;


import React, { useState } from 'react';
import { Container, Card, CardContent, TextField, Button, Typography, Alert } from '@mui/material';
import { authAPI } from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await authAPI.forgotPassword(email);
      setMessage("✅ Reset link sent. Check your email.");
    } catch (err) {
      setError("❌ Error sending reset link.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" align="center">Forgot Password</Typography>

          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Email" type="email" required 
              onChange={(e) => setEmail(e.target.value)} />
            
            <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
              Send Reset Link
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ForgotPassword;