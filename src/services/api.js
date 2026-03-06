import axios from 'axios';

// Backend ka URL
// const API_BASE_URL = 'http://192.168.1.179:8000/api';
const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Har request ke sath Token bhejo (Interceptor)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Sare API Calls yahan hain
export const authAPI = {
  // googleLogin: (data) => api.post('/auth/google-login', { access_token: data.access_token }),
  googleLogin: (data) => api.post('/auth/google-login', data),
  forgotPassword: (email) => api.post(`/auth/forgot-password?email=${email}`), // Query param
  resetPassword: (data) => api.post('/auth/reset-password', data),
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  updateProfile: (data) => api.put('/user/profile', data),
  changePassword: (data) => api.post('/user/change-password', data),
};

export const expenseAPI = {
  addVoice: (data) => api.post('/expenses/voice', data),
  addManual: (data) => api.post('/expenses/', data),
  getAll: (filters) => {
    let url = '/expenses/';
    if (filters) {
      const params = new URLSearchParams(filters);
      url = `/expenses/filter?${params}`;
    }
    return api.get(url);
  },
  update: (id, data) => api.put(`/expenses/${id}`, data),
  delete: (id) => api.delete(`/expenses/${id}`),
};

export const budgetAPI = {
  create: (data) => api.post('/budget/', data),
  getAll: () => api.get('/budget/'),
  getStatus: () => api.get('/budget/status'),
  delete: (id) => api.delete(`/budget/${id}`),
};

export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getCategoryBreakdown: () => api.get('/analytics/category-breakdown'),
  getDailyExpenses: () => api.get('/analytics/daily-expenses'),
  getMonthlyTrends: () => api.get('/analytics/monthly-trends'),
};

export const exportAPI = {
  getPDF: (params) => api.get(`/export/pdf?${params}`, { responseType: 'blob' }),
  getCSV: (params) => api.get(`/export/csv?${params}`, { responseType: 'blob' }),
};

export default api;