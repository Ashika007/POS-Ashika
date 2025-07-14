import axios from 'axios';

// api instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Contect-Type': 'application/json',
    Accept: 'application/json',
  },
});

//API Endpoints
export const login = (data) => api.post('/api/user/login', data);
export const register = (data) => api.post('/api/user/register', data);
export const getUserData = () => api.get('/api/user'); //dodnot pass data in get request
export const logout = () => api.post('/api/user/logout');

//Table endpoints
export const addTable = (data) => api.post('/api/table', data);
export const getTables = () => api.get('/api/table');
export const updateTable = ({ tableId, ...tableData }) =>
  api.put(`/api/table/${tableId}`, tableData);
//order endpoints
export const addOrder = (data) => api.post('/api/order', data);
export const getOrders = () => api.get('/api/order');
export const updateOrderStatus = ({ orderId, ...orderStatus }) =>
  api.put(`/api/order/${orderId}`, orderStatus);
export const updateOrder = (orderId, data) =>
  api.put(`/api/order/${orderId}`, data);
export const deleteOrder = (orderId) => api.delete(`/api/order/${orderId}`);
export const getOrderDetails = (orderId) => api.get(`/api/order/${orderId}`);
