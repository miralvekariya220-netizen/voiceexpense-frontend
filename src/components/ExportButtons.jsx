import React from 'react';
import { Button, Box } from '@mui/material';
import { PictureAsPdf, TableChart } from '@mui/icons-material';
import { exportAPI } from '../services/api';

const ExportButtons = () => {

  // PDF Download Logic
  const handleDownloadPDF = async () => {
    try {
      const response = await exportAPI.getPDF(''); // Empty params for current month
      
      // Create a Blob from the PDF Stream
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Expense_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("PDF Download Error:", error);
      alert("Failed to download PDF. Try again later.");
    }
  };

  // CSV Download Logic
  const handleDownloadCSV = async () => {
    try {
      const response = await exportAPI.getCSV('');
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Expenses_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("CSV Download Error:", error);
      alert("Failed to download CSV.");
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'flex-end' }}>
      <Button 
        variant="outlined" 
        color="error" 
        startIcon={<PictureAsPdf />}
        onClick={handleDownloadPDF}
      >
        Download PDF
      </Button>

      <Button 
        variant="outlined" 
        color="success" 
        startIcon={<TableChart />}
        onClick={handleDownloadCSV}
      >
        Download Excel (CSV)
      </Button>
    </Box>
  );
};

export default ExportButtons;