import React, { useState } from 'react';
import { Card, CardContent, Grid, TextField, MenuItem, Button, Typography, IconButton, Box } from '@mui/material';
import { Search, RestartAlt } from '@mui/icons-material';

const ExpenseFilter = ({ onFilterApply }) => {
  const [filters, setFilters] = useState({
    category: '',
    start_date: '',
    end_date: '',
    min_amount: '',
    max_amount: ''
  });

  const categories = ['groceries', 'transport', 'health', 'food', 'utilities', 'entertainment', 'shopping', 'rent', 'other'];

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    // Empty fields ko hata do (Clean object)
    const cleanFilters = {};
    for (const key in filters) {
      if (filters[key]) cleanFilters[key] = filters[key];
    }
    onFilterApply(cleanFilters);
  };

  const handleReset = () => {
    setFilters({ category: '', start_date: '', end_date: '', min_amount: '', max_amount: '' });
    onFilterApply(null); // Reset list to show all
  };

  return (
    <Card sx={{ mb: 3, bgcolor: '#f8f9fa' }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Search fontSize="small" /> Filter Expenses
        </Typography>
        
        <Grid container spacing={2} alignItems="center">
          {/* Category Dropdown */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              size="small"
              value={filters.category}
              onChange={handleChange}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Start Date */}
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              type="date"
              fullWidth
              label="From Date"
              name="start_date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={filters.start_date}
              onChange={handleChange}
            />
          </Grid>

          {/* End Date */}
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              type="date"
              fullWidth
              label="To Date"
              name="end_date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={filters.end_date}
              onChange={handleChange}
            />
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} sm={12} md={3} sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              startIcon={<Search />}
              onClick={handleSearch}
            >
              Search
            </Button>
            
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleReset}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ExpenseFilter;