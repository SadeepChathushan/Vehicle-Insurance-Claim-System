import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Your API URL

const AuthService = {
  // Sign in method (save token on successful login)
  async signIn(email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });

      // Save the token and user info to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user info
        const adminId = userData?.adminId; // Extract the adminId from the stored user data

      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Logout method (remove token and user info from localStorage)
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  // Check if the user is authenticated by checking if the token exists
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
  },

  // Get the user role from localStorage
  getUserRole() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role;
  },

  // Method to get the token from localStorage
  getToken() {
    return localStorage.getItem('token');
  },

  // Register a new user (optional, if registration is required)
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
    }
  },

  // Refresh token (optional, if your backend supports token refresh)
  async refreshToken(token) {
    try {
      const response = await axios.post(`${API_URL}/auth/refresh`, { token });
      return response.data;
    } catch (error) {
      console.error('Error during token refresh:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
    }
  },

  // Get the user profile (optional, if you need to fetch user profile data)
  async getUserProfile() {
    const token = this.getToken(); // Get the token from localStorage
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    try {
      const response = await axios.get(`${API_URL}/adminuser/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to Authorization header
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
    }
  }
};

export default AuthService;
