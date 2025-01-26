import axios from 'axios';

const API_URL = 'http://localhost:8080/dcAdjuster'; // Your API URL

const dcAdService = {

    // Create a new admin or officer
    async createClient(clientData) {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
  
      try {
        const response = await axios.post(`${API_URL}/register-client`, clientData, {
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



     // Create a new admin or officer
     async createVehiIns(VehicleData) {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
  
      try {
        const response = await axios.post(`${API_URL}/register-vehicle`, VehicleData, {
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
}
  
  export default dcAdService;