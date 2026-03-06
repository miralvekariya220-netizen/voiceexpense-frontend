// import React, { useState } from 'react';
// import { 
//   Fab, Dialog, DialogTitle, DialogContent, 
//   DialogActions, TextField, Button, MenuItem, Tooltip 
// } from '@mui/material';
// import { Edit as EditIcon } from '@mui/icons-material'; // Pen Icon
// import { expenseAPI } from '../services/api';

// const ManualAddExpense = ({ onExpenseAdded }) => {
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     amount: '',
//     category: '',
//     description: '',
//     expense_date: new Date().toISOString().split('T')[0] // Aaj ki date default
//   });

//   const categories = ['groceries', 'transport', 'health', 'food', 'utilities', 'entertainment', 'shopping', 'rent', 'other'];

//   const handleSave = async () => {
//     try {
//       if (!formData.amount || !formData.category) {
//         alert("Amount and Category are required!");
//         return;
//       }

//       await expenseAPI.addManual(formData);
//       alert("Expense Added Successfully! ✅");
      
//       setOpen(false);
//       setFormData({ amount: '', category: '', description: '', expense_date: new Date().toISOString().split('T')[0] });
      
//       if (onExpenseAdded) onExpenseAdded(); // Refresh list
//     } catch (error) {
//       console.error(error);
//       alert("Failed to add expense ❌");
//     }
//   };

//   return (
//     <>
//       {/* Floating Button (Right Bottom Corner) */}
//       <Tooltip title="Add Expense Manually">
//         <Fab 
//           color="secondary" 
//           aria-label="add" 
//           sx={{ position: 'fixed', bottom: 30, right: 30 }}
//           onClick={() => setOpen(true)}
//         >
//           <EditIcon />
//         </Fab>
//       </Tooltip>

//       {/* Form Dialog */}
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>📝 Add Expense Manually</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Amount (₹)"
//             type="number"
//             fullWidth
//             value={formData.amount}
//             onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//           />
          
//           <TextField
//             select
//             margin="dense"
//             label="Category"
//             fullWidth
//             value={formData.category}
//             onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//           >
//             {categories.map((cat) => (
//               <MenuItem key={cat} value={cat}>{cat}</MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             margin="dense"
//             label="Description (Optional)"
//             fullWidth
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           />

//           <TextField
//             margin="dense"
//             label="Date"
//             type="date"
//             fullWidth
//             InputLabelProps={{ shrink: true }}
//             value={formData.expense_date}
//             onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
//           <Button onClick={handleSave} variant="contained" color="primary">Add Expense</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default ManualAddExpense;



import React, { useState } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Tooltip } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { expenseAPI } from '../services/api';

const ManualAddExpense = ({ onExpenseAdded }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ amount: '', category: '', description: '', expense_date: new Date().toISOString().split('T')[0] });

  const categories = ['groceries', 'transport', 'health', 'food', 'utilities', 'entertainment', 'shopping', 'rent', 'other'];

  const handleSave = async () => {
    try {
      if (!formData.amount || !formData.category) return alert("Fill all fields!");
      await expenseAPI.addManual(formData);
      alert("Added Successfully!");
      setOpen(false);
      setFormData({ amount: '', category: '', description: '', expense_date: new Date().toISOString().split('T')[0] });
      if (onExpenseAdded) onExpenseAdded();
    } catch (e) { alert("Failed!"); }
  };

  return (
    <>
      <Tooltip title="Add Manually">
        <Fab color="primary" sx={{ position: 'fixed', bottom: 30, right: 30 }} onClick={() => setOpen(true)}>
          <EditIcon />
        </Fab>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>📝 Add Manual Expense</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Amount (₹)" type="number" fullWidth onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
          <TextField select margin="dense" label="Category" fullWidth value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
          <TextField margin="dense" label="Description" fullWidth onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <TextField margin="dense" label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={formData.expense_date} onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManualAddExpense;