import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { analyticsAPI } from '../services/api';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // 1. Load Stats
      const statRes = await analyticsAPI.getDashboard();
      setStats(statRes.data);

      // 2. Load Pie Chart Data
      const catRes = await analyticsAPI.getCategoryBreakdown();
      const catLabels = catRes.data.map(i => i.category);
      const catValues = catRes.data.map(i => i.total);
      
      setPieData({
        labels: catLabels,
        datasets: [{
          data: catValues,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }]
      });

      // 3. Load Bar Chart Data
      const dailyRes = await analyticsAPI.getDailyExpenses();
      setBarData({
        labels: dailyRes.data.map(i => i.date),
        datasets: [{
          label: 'Daily Expense',
          data: dailyRes.data.map(i => i.total),
          backgroundColor: '#36A2EB',
        }]
      });

    } catch (e) {
      console.error("Dashboard Error", e);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Top Cards */}
      <Grid item xs={12} md={4}>
        <Card sx={{ bgcolor: '#e3f2fd' }}>
          <CardContent>
            <Typography color="textSecondary">Today's Total</Typography>
            <Typography variant="h4">₹{stats.today_total || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ bgcolor: '#e8f5e9' }}>
          <CardContent>
            <Typography color="textSecondary">This Month</Typography>
            <Typography variant="h4">₹{stats.month_total || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ bgcolor: '#fff3e0' }}>
          <CardContent>
            <Typography color="textSecondary">This Year</Typography>
            <Typography variant="h4">₹{stats.year_total || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Charts */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Category Breakdown</Typography>
            {pieData ? <Pie data={pieData} /> : "Loading..."}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Last 7 Days</Typography>
            {barData ? <Bar data={barData} /> : "Loading..."}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;