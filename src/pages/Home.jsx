import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VoiceInput from '../components/VoiceInput';
import Dashboard from '../components/Dashboard';
import ExpenseList from '../components/ExpenseList';
import ExportButtons from '../components/ExportButtons'; 
import BudgetTracker from '../components/BudgetTracker'; 
import ManualAddExpense from '../components/ManualAddExpense';
import ExpenseFilter from '../components/ExpenseFilter'; // 👈 Add


const Home = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0); // Data refresh trigger
    const [filters, setFilters] = useState(null); 
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🎤 VoiceExpense Pro
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <ExportButtons />
        {/* 1. Voice Input Section */}
        <VoiceInput onExpenseAdded={() => setRefresh(prev => prev + 1)} />

        {/* 2. Charts Section */}
        <Box sx={{ mb: 4 }}>
          <Dashboard key={refresh} /> 
        </Box>
 <BudgetTracker key={refresh} />

        {/* 3. List Section */}
        
        <ExpenseFilter onFilterApply={setFilters} />
        <ExpenseList 
  refreshTrigger={refresh} 
  onExpenseChange={() => setRefresh(prev => prev + 1)} 
   activeFilters={filters}  
/>

  <ManualAddExpense onExpenseAdded={() => setRefresh(prev => prev + 1)} />
      </Container>

    </>
  );
};

export default Home;