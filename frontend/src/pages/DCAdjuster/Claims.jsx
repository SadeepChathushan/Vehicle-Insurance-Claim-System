import React, { useState, useEffect } from "react";
import { notification, Spin } from "antd";
import ClaimsTabs from "../../components/DCAdjuster/ClaimsTabs";
import ClaimsModal from "../../components/DCAdjuster/ClaimsModal";
import dcAdService from "../../services/dcAdService";

const Claims = () => {
  const [data, setData] = useState([]); // For claims from the first API
  const [assignedClaims, setAssignedClaims] = useState([]); // For claims from the second API
  const [completedClaims, setCompletedClaims] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in localStorage!");
        return;
      }

      try {
        // 1) Fetch general claims
        const response = await dcAdService.getClaims(userId);
        const { nic, name, claims, agents } = response;

        if (!agents || agents.length === 0) {
          console.error("No agents found in the response.");
          setLoading(false);
          return;
        }

        // Format the claims from the first API call
        const formattedClaims = claims.map((claim) => {
          const assignedAgent = agents.find(
            (agent) => agent._id === claim.assignedAgent
          );
          return {
            key: claim._id,
            name: name,
            nic: nic,
            vehicleNumber: claim.vehicleNum,
            mobileNumber: claim.mobileNumber,
            location: claim.location,
            // Convert "Reported" to "Claim Received" for UI
            status: claim.status === "Reported" ? "Claim Received" : claim.status,
            date: new Date(claim.createdAt).toLocaleDateString(),
            agent: assignedAgent ? assignedAgent.name : "Not Assigned",
            images: [],
          };
        });

        setData(formattedClaims);
        setAgents(agents);

        // 2) Fetch assigned claims from the second API call
        const assignedResponse = await dcAdService.getAssiClaims(userId);
        console.log("Assigned Claims Response:", assignedResponse);

        if (assignedResponse?.claims && Array.isArray(assignedResponse.claims)) {
          const formattedAssignedClaims = assignedResponse.claims.map((claim) => ({
            key: claim._id,
            name: assignedResponse.name, 
            nic: assignedResponse.nic,
            vehicleNumber: claim.vehicleNum,
            mobileNumber: claim.mobileNumber,
            location: claim.location,
            status: claim.status,
            date: new Date(claim.createdAt).toLocaleDateString(),
            agent: claim.assignedAgent,
            images: [],
          }));

          console.log("Assigned Claims:", formattedAssignedClaims);
          setAssignedClaims(formattedAssignedClaims);
        } else {
          console.error(
            "Assigned claims data is not in the expected format:",
            assignedResponse
          );
        }

        // New call to fetch completed claims
        const completeClaimsResponse = await dcAdService.getCompleteClaims(userId);
        const formattedCompletedClaims = completeClaimsResponse.claims.map((claim) => ({
          key: claim._id,
          // name: completeClaimsResponse.name,
          // nic: completeClaimsResponse.nic,
          vehicleNumber: claim.vehicleNum,
          mobileNumber: claim.mobileNumber,
          location: claim.location,
          // status: claim.status,
          date: new Date(claim.createdAt).toLocaleDateString(),
          agent: claim.assignedAgent,
          images: claim.imageUrls, // Ensure to include image URLs for modal display
        }));
        setCompletedClaims(formattedCompletedClaims);
        console.log('Completed Claims Set:', formattedCompletedClaims);

        setLoading(false);
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to fetch claims. Please try again.",
        });
        setLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Called when assigning an agent to a "not assigned" claim
  const handleAgentChange = async (claimKey, agentId) => {
    const updatedData = data.map((claim) =>
      claim.key === claimKey ? { ...claim, agent: agentId } : claim
    );

    setData(updatedData);

    try {
      await dcAdService.updateAgent(claimKey, agentId);
      notification.success({
        message: "Agent Assigned",
        description: `Agent has been assigned successfully.`,
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to assign the agent. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleImageClick = (images) => {
    setSelectedClaim(images);
    setIsModalVisible(true);
  };

  return (
    <>
      {loading ? (
        <Spin tip="Loading claims..." />
      ) : (
        <>
          {/* Pass BOTH data (unassigned claims) and assignedClaims */}
          <ClaimsTabs
            data={data}
            assignedClaims={assignedClaims}
            completedClaims={completedClaims}
            handleAgentChange={handleAgentChange}
            handleImageClick={handleImageClick}
            agents={agents}
          />
          <ClaimsModal
            visible={isModalVisible}
            handleCancel={handleCancel}
            selectedClaim={selectedClaim}
          />
        </>
      )}
    </>
  );
};

export default Claims;
