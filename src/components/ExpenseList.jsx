import React, { useEffect, useState ,useCallback} from 'react';
import { 
  Card, CardContent, Typography, List, ListItem, ListItemText, 
  IconButton, Chip, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Button, MenuItem 
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { expenseAPI } from '../services/api';

// 1️⃣ 👇 'onExpenseChange' prop yahan add kiya
const ExpenseList = ({ refreshTrigger, onExpenseChange,activeFilters }) => {
  const [expenses, setExpenses] = useState([]);
  
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    expense_id: '',
    amount: '',
    category: '',
    description: '',
    expense_date: ''
  });

  const categories = ['groceries', 'transport', 'health', 'food', 'utilities', 'entertainment', 'shopping', 'rent', 'other'];
  
  const loadExpenses = useCallback(async () => {
    try {
      // ✅ Magic Logic:
      // Agar filters hain to 'getAll(activeFilters)' call karo (Filter API)
      // Agar nahi hain to 'getAll()' call karo (Normal API)
      const res = await expenseAPI.getAll(activeFilters);
      setExpenses(res.data);
    } catch (e) {
      console.error(e);
    }
  },[activeFilters]);
  
  useEffect(() => {
    loadExpenses();
  }, [loadExpenses,refreshTrigger]);

  
  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this expense?")) {
      await expenseAPI.delete(id);
      loadExpenses(); // List refresh
      
      // 2️⃣ 👇 Dashboard ko refresh karne ka signal
      if(onExpenseChange) onExpenseChange(); 
    }
  };

  const handleEditClick = (expense) => {
    setEditData({
      expense_id: expense.expense_id,
      amount: expense.amount,
      category: expense.category,
      description: expense.description || '',
      expense_date: expense.expense_date
    });
    setOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await expenseAPI.update(editData.expense_id, {
        amount: editData.amount,
        category: editData.category,
        description: editData.description,
        expense_date: editData.expense_date
      });
      setOpen(false);
      loadExpenses(); // List refresh
      alert("Expense Updated Successfully! ✅");

      // 3️⃣ 👇 Dashboard ko refresh karne ka signal
      if(onExpenseChange) onExpenseChange();

    } catch (error) {
      console.error(error);
      alert("Failed to update expense ❌");
    }
  };

  return (
    <>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">📝 Recent Transactions</Typography>
          <List>
            {expenses.map((exp) => (
              <ListItem key={exp.expense_id} 
                secondaryAction={
                  <>
                    <IconButton color="primary" onClick={() => handleEditClick(exp)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(exp.expense_id)}>
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText 
                  primary={
                    <>
                      <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>₹{exp.amount}</span>
                      <Chip label={exp.category} size="small" sx={{ ml: 2 }} color="primary" variant="outlined" />
                    </>
                  }
                  secondary={`${exp.description} | ${exp.expense_date}`} 
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Amount (₹)"
            type="number"
            fullWidth
            value={editData.amount}
            onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
          />
          <TextField
            select
            margin="dense"
            label="Category"
            fullWidth
            value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editData.expense_date}
            onChange={(e) => setEditData({ ...editData, expense_date: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExpenseList;