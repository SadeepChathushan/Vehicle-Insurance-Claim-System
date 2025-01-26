import axios from 'axios';

const API_URL = 'http://localhost:8080/admin'; // Your API URL

const AdminProfileService = {

  // Create a new admin or officer
  async createOfficer(adminData) {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    try {
      const response = await axios.post(`${API_URL}/register-officer`, adminData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers for authentication
        },
      });

      return response.data; // Return the created admin details
    } catch (error) {
      console.error('Error registering officer:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error; // Throw error for the caller to handle
    }
  },


  // Get a list of users (admin access)
//   async getUsers() {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('No token found. Please log in.');
//     }

//     try {
//       const response = await axios.get(`${API_URL}/adminuser/get-users`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data; // Return the list of users
//     } catch (error) {
//       console.error('Error fetching users:', error.response ? error.response.data : error.message);
//       throw error.response ? error.response.data : error;
//     }
//   },

  // Get a specific user profile by ID
  async getUserProfileDetails() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    try {
      const response = await axios.get(`${API_URL}/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the user profile data
    } catch (error) {
      console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
    }
  },

  // Update a user's profile
  async updateUserProfile(userId, userData) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    try {
      const response = await axios.put(`${API_URL}/update-profile/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the updated user profile data
    } catch (error) {
      console.error('Error updating user profile:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
    }
  },



    // Fetch admin profile by ID
    async getAdminProfile(adminId) {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
  
      try {
        const response = await axios.get(`${API_URL}/profile/${adminId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the headers
          },
        });

        console.log('Data' , response.data);
  
        return response.data; // Return the fetched profile data
      } catch (error) {
        console.error('Error fetching admin profile:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error; // Re-throw error for the caller to handle
      }
    },
  





  // Delete a user (optional)
//   async deleteUser(userId) {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('No token found. Please log in.');
//     }

//     try {
//       const response = await axios.delete(`${API_URL}/adminuser/delete/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data; // Return success message or status
//     } catch (error) {
//       console.error('Error deleting user:', error.response ? error.response.data : error.message);
//       throw error.response ? error.response.data : error;
//     }
//   },
};

export default AdminProfileService;
