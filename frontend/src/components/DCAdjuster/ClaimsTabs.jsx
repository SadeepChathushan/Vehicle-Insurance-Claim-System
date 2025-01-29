import React from "react";
import { Tabs } from "antd";
import ClaimsTable from "./ClaimsTable";

const { TabPane } = Tabs;

const ClaimsTabs = ({
  data,
  assignedClaims,
  agents,
  handleAgentChange,
  handleImageClick,
}) => {
  // 1) "Not Assigned" claims: filter from `data` if you want only those with "Claim Received"
  const notAssignedClaims = data.filter((claim) => claim.status === "Claim Received");

  // 2) For "Assigned" claims, now we use the assignedClaims prop directly
  //    (because you fetched them from the second API).
  //    If you prefer to filter them by status, you can—but we’ll assume they’re
  //    all assigned from that second call:
  const assigned = assignedClaims;

  // 3) "Completed" claims: if you want them from the first set of data or the second,
  //    filter accordingly. For example:
  const completedClaims = data.filter((claim) => claim.status === "Claim Completed");

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
