import axios from "axios";

const API_URL = "http://localhost:8080/agent"; // Replace with your actual endpoint

const agentService = {
  // Fetch claims for a given user/agent
  async getClaims(userId) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    try {
      // Adjust your endpoint if needed
      const response = await axios.get(`${API_URL}/get-claims/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // If your backend returns an object with { message, success, agentName, claims }, 
      // that entire object is in response.data
      return response.data;
    } catch (error) {
      console.error(
        "Error getting claims:",
        error.response ? error.response.data : error.message
      );
      throw error.response ? error.response.data : error;
    }
  },

  // Update claim details
  async updateDetails(formData) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    try {
      const response = await axios.post(`${API_URL}/update-details`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error updating details:",
        error.response ? error.response.data : error.message
      );
      throw error.response ? error.response.data : error;
    }
  },
};

export default agentService;
