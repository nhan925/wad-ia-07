import axios from 'axios';

// Use Next.js rewrite proxy to avoid cross-origin cookie issues on production
const API_BASE_URL = typeof window !== 'undefined' 
  ? '/api'  // Client-side: use Next.js proxy
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'); // Server-side: direct

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookies
});

// Access token storage (in memory)
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// Request interceptor to attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Endpoints that should not trigger automatic token refresh
    const authEndpoints = ['/auth/login', '/auth/register', '/auth/refresh'];
    const isAuthEndpoint = authEndpoints.some(endpoint => 
      originalRequest.url?.includes(endpoint)
    );

    // If error is 401 and we haven't retried yet and it's not an auth endpoint
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const { data } = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // Update access token
        setAccessToken(data.accessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear token and redirect to login
        setAccessToken(null);
        if (typeof window !== 'undefined') {
          // Only redirect if not already on public pages
          const publicPaths = ['/login', '/signup', '/'];
          const currentPath = window.location.pathname;
          if (!publicPaths.includes(currentPath)) {
            window.location.href = '/login';
          }
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API functions
export const api = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await axiosInstance.post('/auth/login', data);
    setAccessToken(response.data.accessToken);
    return response.data;
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } finally {
      setAccessToken(null);
    }
  },

  refreshToken: async () => {
    // Use axios directly to avoid interceptor during initial auth check
    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    );
    setAccessToken(response.data.accessToken);
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosInstance.get('/user/me');
    return response.data;
  },
};
