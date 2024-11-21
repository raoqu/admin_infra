import axios, { AxiosResponse } from 'axios';
import { mockMenuData, mockPrivilegeData } from '../mock';

// Type definitions
export interface MenuItem {
  id: string;
  name: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}

export interface PrivilegeData {
  roles: string[];
  permissions: string[];
}

// Configuration for mock data
const shouldUseMockData = (): boolean => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  return !apiUrl || apiUrl.trim() === '';
};

// Create axios instance only if we're not using mock data
const createApi = () => {
  if (shouldUseMockData()) {
    return null;
  }
  
  return axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const api = createApi();

// Request functions
export const fetchMenuData = async (): Promise<MenuItem[]> => {
  if (shouldUseMockData()) {
    console.log('Using mock menu data (API URL not configured)');
    return Promise.resolve(mockMenuData);
  }

  if (!api) {
    console.log('API instance not created, falling back to mock data');
    return Promise.resolve(mockMenuData);
  }

  try {
    const response: AxiosResponse<MenuItem[]> = await api.get('/api/menu');
    return response.data;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    console.log('Falling back to mock data due to API error');
    return mockMenuData;
  }
};

export const fetchPrivileges = async (): Promise<PrivilegeData> => {
  if (shouldUseMockData()) {
    console.log('Using mock privilege data (API URL not configured)');
    return Promise.resolve(mockPrivilegeData);
  }

  if (!api) {
    console.log('API instance not created, falling back to mock data');
    return Promise.resolve(mockPrivilegeData);
  }

  try {
    const response: AxiosResponse<PrivilegeData> = await api.get('/api/privileges');
    return response.data;
  } catch (error) {
    console.error('Error fetching privileges:', error);
    console.log('Falling back to mock data due to API error');
    return mockPrivilegeData;
  }
};

// Add request interceptor only if API instance exists
if (api) {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for handling common errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        console.log('Unauthorized access, redirecting to login...');
        // Add your logout/redirect logic here
      }
      return Promise.reject(error);
    }
  );
}
