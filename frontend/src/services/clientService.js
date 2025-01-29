import axios from 'axios';

const API_URL = 'http://localhost:8080/client'; // Your API URL

const clientService = {

    // Create a new admin or officer
    async addClaim(claimPayload) {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
  
      try {
        const response = await axios.post(`${API_URL}/add`, claimPayload, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers for authentication
          },
        });
  
        return response.data; // Return the created admin details
      } catch (error) {
        console.error('Error registering client:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error; // Throw error for the caller to handle
      }
    },


   // Fetch claims for a specific user
  async getClaims(userId) {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    try {
      // Make a POST request to the API with the userId in the URL
      const response = await axios.post(`${API_URL}/get-claims/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers for authentication
        },
      });

      return response.data; // Return the claims data
    } catch (error) {
      console.error('Error fetching claims:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error; // Throw error for the caller to handle
    }
  },
}
  
  export default clientService;