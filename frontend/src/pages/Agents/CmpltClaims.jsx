import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import agentService from "../../services/agentService";

const Claims = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  // Fetch claims from the backend and filter for customerMetStatus being false
  const fetchClaims = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const responseData = await agentService.getClaims(userId);
      const data = responseData.claims;
      if (!Array.isArray(data)) {
        throw new Error("Backend did not return an array of claims.");
      }

      // Filter the claims where customerMetStatus is false
      const filteredClaims = data.filter(claim => claim.customerMetStatus === true);

      // Map the filtered claims for Table usage
      const mappedData = filteredClaims.map((item, index) => ({
        key: item._id,
        index: index + 1, // Sequential number starting from 1
        agentName: item.agentName,
        vehicleNumber: item.vehicleNum,
        mobileNumber: item.mobileNumber,
        date: item.createdAt?.split("T")[0], // just the date portion
        description: item.description,
        customerMetStatus: item.customerMetStatus,
        raw: item,
      }));

      setClaims(mappedData);
    } catch (error) {
      console.error("Error fetching claims:", error);
      message.error("Failed to fetch claims.");
    }
  };

  // Handle the completion of a claim
  const handleComplete = async (claimId) => {
    try {
      // Simulate completing a claim. This should be replaced with a real API call.
      await agentService.completeClaim(claimId);
      message.success("Claim marked as completed!");
      fetchClaims();  // Refresh the claims to update the list after marking as complete
    } catch (error) {
      console.error("Error completing claim:", error);
      message.error(`Failed to complete claim: ${error.message}`);
    }
  };

  // Table columns
  const columns = [
    { title: "#", dataIndex: "index", key: "index" },
    { title: "Name", dataIndex: "agentName", key: "name" },
    { title: "Vehicle Number", dataIndex: "vehicleNumber", key: "vehicleNumber" },
    { title: "Mobile Number", dataIndex: "mobileNumber", key: "mobileNumber" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" style={{ backgroundColor: "green", borderColor: "green" }}
          onClick={() => handleComplete(record.key)}>
          Completed
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Agent Claims</h2>
      <Table columns={columns} dataSource={claims} pagination={false} />
    </div>
  );
};

export default Claims;
