// import React, { useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { Container, Card, CardContent, TextField, Button, Typography, Alert } from '@mui/material';
// import { authAPI } from '../services/api';

// const ResetPassword = () => {
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get('token'); // URL se token nikalo
//   const navigate = useNavigate();
  
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (password !== confirmPassword) {
//   //     setError("Passwords do not match");
//   //     return;
//   //   }

//   //   try {
//   //     await authAPI.resetPassword({ token, new_password: password });
//   //     alert("Password Changed Successfully! Please Login.");
//   //     navigate('/login');
//   //   } catch (err) {
//   //     setError("Link expired or invalid. Try again.");
//   //   }
//   // };


//     const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       // 1. Backend call
//       await authAPI.resetPassword({ token, new_password: password });
      
//       // 2. Success Alert
//       alert("✅ Password Changed Successfully! Please Login.");
      
//       // 3. Redirect to Login Page (Mobile/Laptop dono pe chalega)
//       navigate('/login');
      
//     } catch (err) {
//       console.error(err); // Error dekhne ke liye
//       setError("Link expired or invalid. Try sending link again.");
//     }
//   };
//   return (
//     <Container maxWidth="sm" sx={{ mt: 10 }}>
//       <Card>
//         <CardContent sx={{ p: 4 }}>
//           <Typography variant="h5" align="center" gutterBottom>Set New Password</Typography>

//           {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//           <form onSubmit={handleSubmit}>
//             <TextField fullWidth label="New Password" type="password" margin="normal" required
//               onChange={(e) => setPassword(e.target.value)} />
//             <TextField fullWidth label="Confirm Password" type="password" margin="normal" required
//               onChange={(e) => setConfirmPassword(e.target.value)} />
            
//             <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }}>
//               Update Password
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default ResetPassword;


import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, TextField, Button, Typography, Alert } from '@mui/material';
import { authAPI } from '../services/api';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await authAPI.resetPassword({ token, new_password: password });
      alert("✅ Password updated successfully");
      navigate('/login');
    } catch (err) {
      setError("❌ Invalid or expired link.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" align="center">Reset Password</Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="New Password" type="password" required
              onChange={(e) => setPassword(e.target.value)} />
            
            <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ResetPassword;