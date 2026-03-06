import React, { useEffect, useState } from 'react';
import { 
  Card, CardContent, Typography, LinearProgress, Box, 
  Button, Dialog, DialogTitle, DialogContent, 
  TextField, MenuItem, DialogActions
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { budgetAPI } from '../services/api';

const BudgetTracker = () => {
  const [budgets, setBudgets] = useState([]);
  const [open, setOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({ category: '', monthly_limit: '' });

  const categories = ['groceries', 'transport', 'health', 'food', 'utilities', 'entertainment', 'shopping', 'rent', 'other'];

  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = async () => {
    try {
      const res = await budgetAPI.getStatus(); // Backend se status laayega
      setBudgets(res.data);
    } catch (error) {
      console.error("Error loading budgets:", error);
    }
  };

  const handleSave = async () => {
    try {
      await budgetAPI.create({
        category: newBudget.category,
        monthly_limit: parseFloat(newBudget.monthly_limit),
        alert_threshold: 80 // Default alert at 80%
      });
      setOpen(false);
      setNewBudget({ category: '', monthly_limit: '' });
      loadBudgets();
    } catch (error) {
      alert("Failed to set budget");
    }
  };

  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">💰 Monthly Budgets</Typography>
          <Button variant="contained" size="small" startIcon={<Add />} onClick={() => setOpen(true)}>
            Set Budget
          </Button>
        </Box>

        {budgets.length === 0 ? (
          <Typography color="textSecondary" align="center">No budgets set yet.</Typography>
        ) : (
          budgets.map((b, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                  {b.category} {b.alert && "⚠️"}
                </Typography>
                <Typography variant="body2" color={b.alert ? "error" : "textSecondary"}>
                  ₹{b.spent} / ₹{b.monthly_limit}
                </Typography>
              </Box>
              
              <LinearProgress 
                variant="determinate" 
                value={Math.min(b.percentage, 100)} 
                color={b.alert ? "error" : "primary"} 
                sx={{ height: 10, borderRadius: 5, mt: 0.5 }}
              />
              
              <Typography variant="caption" color={b.remaining < 0 ? "error" : "textSecondary"}>
                {b.remaining < 0 ? `Overspent by ₹${Math.abs(b.remaining)}` : `₹${b.remaining} remaining`}
              </Typography>
            </Box>
          ))
        )}
      </CardContent>

      {/* Add Budget Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Set Monthly Budget</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Category"
            fullWidth
            margin="dense"
            value={newBudget.category}
            onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Monthly Limit (₹)"
            type="number"
            fullWidth
            margin="dense"
            value={newBudget.monthly_limit}
            onChange={(e) => setNewBudget({ ...newBudget, monthly_limit: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default BudgetTracker;