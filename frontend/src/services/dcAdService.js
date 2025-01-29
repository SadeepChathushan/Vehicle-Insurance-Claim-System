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



    // Fetch claims for a specific user
  async getClaims(userId) {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    try {
      // Make a POST request to the API with the userId in the URL
      const response = await axios.get(`${API_URL}/get-claims/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers for authentication
        },
      });

      console.log("response service" + response);
      return response.data; // Return the claims data
    } catch (error) {
      console.error('Error fetching claims:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error; // Throw error for the caller to handle
    }
  },


   // Fetch claims for a specific user
   async updateAgent(claimKey, agentId) {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    console.log("c**"+ claimKey +"**hhj**"+agentId);

    try {
      // Make a PUT request to the API with the claimKey and agentId in the body
      const response = await axios.put(
        `${API_URL}/updateAgent/${claimKey}`, // The claimKey is used in the URL
        { agentId }, // Sending the agentId in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers for authentication
          },
        }
      );

      console.log("response service", response);
      return response.data; // Return the claims data
    } catch (error) {
      console.error('Error fetching claims:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error; // Throw error for the caller to handle
    }
  },



   // Fetch claims for a specific user
async getAssiClaims(userId) {
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  if (!token) {
    throw new Error('No token found. Please log in.');
  }

  try {
    // Make a GET request to the API with the userId in the URL
    const response = await axios.get(`${API_URL}/get-Assignedclaims/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to headers for authentication
      },
    });

    console.log("response service", response);  // Log the entire response to debug
    return response.data; // Return the claims data
  } catch (error) {
    console.error('Error fetching claims:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error; // Throw error for the caller to handle
  }
},


  
}

export default dcAdService;