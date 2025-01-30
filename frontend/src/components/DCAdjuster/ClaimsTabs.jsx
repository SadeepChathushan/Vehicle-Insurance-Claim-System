import React from "react";
import { Tabs } from "antd";
import ClaimsTable from "./ClaimsTable";

const { TabPane } = Tabs;

const ClaimsTabs = ({
  data,
  assignedClaims,
  completedClaims,
  agents,
  handleAgentChange,
  handleImageClick,
}) => {
  // Filter "Not Assigned" out of general claims data
  // We consider "Claim Received" and "agent" is "Not Assigned"
  const notAssignedClaims = data.filter(
    (claim) => claim.status === "Claim Received" && claim.agent === "Not Assigned"
  );

  // The assignedClaims are fetched from the second API endpoint
  const assigned = assignedClaims;

  // The completedClaims are fetched from the third API endpoint
  return (
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="Not Assigned Claims" key="1">
        <ClaimsTable
          claims={notAssignedClaims}
          agents={agents}
          handleAgentChange={handleAgentChange}
          handleImageClick={handleImageClick}
          type="notAssigned"
        />
      </TabPane>

      <TabPane tab="Assigned Claims" key="2">
        <ClaimsTable
          claims={assigned}
          agents={agents}
          handleAgentChange={handleAgentChange}
          handleImageClick={handleImageClick}
          type="assigned"
        />
      </TabPane>

      <TabPane tab="Completed Claims" key="3">
        <ClaimsTable
          claims={completedClaims}
          agents={agents}
          handleAgentChange={handleAgentChange}
          handleImageClick={handleImageClick}
          type="completed"
        />
      </TabPane>
    </Tabs>
  );
};

export default ClaimsTabs;
