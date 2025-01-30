import React from "react";
import { Table, Select, Button } from "antd";

const { Option } = Select;

const ClaimsTable = ({
  claims,
  agents = [],
  handleAgentChange,
  handleImageClick,
  type,
}) => {
  const columns =
    type === "notAssigned"
      ? [
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "NIC", dataIndex: "nic", key: "nic" },
          { title: "Vehicle Number", dataIndex: "vehicleNumber", key: "vehicleNumber" },
          { title: "Mobile Number", dataIndex: "mobileNumber", key: "mobileNumber" },
          { title: "Date", dataIndex: "date", key: "date" },
          {
            title: "Assigned Agent",
            dataIndex: "agent",
            key: "agent",
            render: (text, record) => (
              <Select
                defaultValue={text || "Select Agent"}
                onChange={(value) => handleAgentChange(record.key, value)}
                style={{ width: 160 }}
              >
                {agents.length > 0 ? (
                  agents.map((agent) => (
                    <Option key={agent._id} value={agent._id}>
                      {agent.name}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No agents available</Option>
                )}
              </Select>
            ),
          },
        ]
      : type === "assigned"
      ? [
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "NIC", dataIndex: "nic", key: "nic" },
          { title: "Vehicle Number", dataIndex: "vehicleNumber", key: "vehicleNumber" },
          { title: "Mobile Number", dataIndex: "mobileNumber", key: "mobileNumber" },
          { title: "Date", dataIndex: "date", key: "date" },
          { title: "Assigned Agent", dataIndex: "agent", key: "agent" },
        
        ]
      : 
      [
        // { title: "Name", dataIndex: "name", key: "name" },
        // { title: "NIC", dataIndex: "nic", key: "nic" },
        { title: "Vehicle Number", dataIndex: "vehicleNumber", key: "vehicleNumber" },
        { title: "Mobile Number", dataIndex: "mobileNumber", key: "mobileNumber" },
        { title: "Date", dataIndex: "date", key: "date" },
        { title: "Assigned Agent", dataIndex: "agent", key: "agent" },
        {
          title: "Images",
          dataIndex: "images",
          key: "images",
          render: (images, record) => (
            <Button type="link" size="small" onClick={() => handleImageClick(images)}>
              View Images
            </Button>
          ),
        },
      ];
      console.log('Claims Data1111:', claims);

  return <Table columns={columns} dataSource={claims} pagination={false} rowKey="key" />;
};

export default ClaimsTable;
