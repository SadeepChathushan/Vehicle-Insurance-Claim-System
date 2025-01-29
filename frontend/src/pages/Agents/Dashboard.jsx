import React from "react";
import { Card, Row, Col, Table, Typography } from "antd";
import {
  CheckCircleOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const Dashboard = () => {
  // Example metrics (in a real app, you'd fetch these from an API)
  const totalCompletedClaims = 42;
  const newClaimsCount = 8;
  const ongoingClaimsCount = 15;

  // Recent claims data (example only)
  const recentClaims = [
    {
      key: "1",
      claimId: "CLM-1001",
      claimantName: "John Doe",
      status: "Completed",
      date: "2025-01-20",
    },
    {
      key: "2",
      claimId: "CLM-1002",
      claimantName: "Jane Smith",
      status: "New",
      date: "2025-01-21",
    },
    {
      key: "3",
      claimId: "CLM-1003",
      claimantName: "Michael Johnson",
      status: "Ongoing",
      date: "2025-01-22",
    },
    {
      key: "4",
      claimId: "CLM-1004",
      claimantName: "Emily Davis",
      status: "Completed",
      date: "2025-01-24",
    },
  ];

  // Columns for the recent claims table
  const columns = [
    {
      title: "Claim ID",
      dataIndex: "claimId",
      key: "claimId",
    },
    {
      title: "Claimant Name",
      dataIndex: "claimantName",
      key: "claimantName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Date Reported",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={3} style={{ marginBottom: "24px" }}>
        Agent Dashboard
      </Title>

      {/* Top summary cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Row align="middle">
              <Col flex="none" style={{ fontSize: "24px", marginRight: "16px" }}>
                <CheckCircleOutlined style={{ color: "#52c41a" }} />
              </Col>
              <Col flex="auto">
                <Title level={5}>Completed Claims</Title>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {totalCompletedClaims}
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card>
            <Row align="middle">
              <Col flex="none" style={{ fontSize: "24px", marginRight: "16px" }}>
                <FileTextOutlined style={{ color: "#1890ff" }} />
              </Col>
              <Col flex="auto">
                <Title level={5}>New Claims</Title>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {newClaimsCount}
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card>
            <Row align="middle">
              <Col flex="none" style={{ fontSize: "24px", marginRight: "16px" }}>
                <ClockCircleOutlined style={{ color: "#faad14" }} />
              </Col>
              <Col flex="auto">
                <Title level={5}>Ongoing Claims</Title>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {ongoingClaimsCount}
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Recent claims table */}
      <div style={{ marginTop: "32px" }}>
        <Title level={4}>Recent Claims</Title>
        <Table columns={columns} dataSource={recentClaims} pagination={false} />
      </div>

      {/* Extra dashboard section (example) */}
      <div style={{ marginTop: "32px" }}>
        <Title level={4}>Performance</Title>
        <Card style={{ textAlign: "center" }}>
          {/* 
            Insert any chart or stats here. 
            For example, you could integrate Recharts, Chart.js, or any other library. 
          */}
          <p>Placeholder for a performance graph or additional metrics.</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
