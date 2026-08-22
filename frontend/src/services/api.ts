import axios from 'axios';

// Cliente HTTP hacia el backend. En Vite uso el proxy /api si no hay VITE_API_URL.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 12000,
});
