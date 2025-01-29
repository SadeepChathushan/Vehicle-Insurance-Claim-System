import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Checkbox
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import agentService from "../../services/agentService"; 
import uploadMediaToSupabase from "../../components/utils/imageUpload";

const Claims = () => {
  const [claims, setClaims] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchClaims();
  }, []);

   // Fetch claims from the backend and filter by customerMetStatus
   const fetchClaims = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const responseData = await agentService.getClaims(userId);

      if (responseData && responseData.claims) {
        // Filter claims where customerMetStatus is false
        const filteredClaims = responseData.claims.filter(claim => claim.customerMetStatus === false);

        // Map the filtered claims for Table usage
        const mappedData = filteredClaims.map((item) => ({
          key: item._id,
          name: item.agentName,
          vehicleNumber: item.vehicleNum,
          mobileNumber: item.mobileNumber,
          date: item.createdAt?.split("T")[0], // just the date portion
          raw: item,
        }));

        setClaims(mappedData);
      } else {
        throw new Error("Backend did not return an array of claims.");
      }
    } catch (error) {
      console.error("Error fetching claims:", error);
      message.error("Failed to fetch claims.");
    }
  }
  // Open the modal for the selected claim
  const handleOpenModal = (record) => {
    setSelectedClaim(record);
    setIsModalVisible(true);
  };

  // Close the modal & reset
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedClaim(null);
    setFileList([]);
    form.resetFields();
  };

  // Track file changes in the Upload component
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Submit the form with uploaded images
  const handleFormSubmit = async (values) => {
    try {
      // 1. Upload each file to Supabase
      const imageUrls = await Promise.all(
        fileList.map((file) => uploadMediaToSupabase(file.originFileObj))
      );

      // 2. Build request payload
      const formData = {
        claimId: selectedClaim.key, 
        description: values.description,
        imageUrls,
        customerMetStatus: values.customerMetStatus || false,
      };

      // 3. Send to your backend
      await agentService.updateDetails(formData);

      message.success("Details updated successfully!");
      // Optionally, refresh the claims
      fetchClaims();

      // Reset form & close modal
      setIsModalVisible(false);
      setSelectedClaim(null);
      setFileList([]);
      form.resetFields();
    } catch (error) {
      // If Supabase says “Bucket not found,” you’ll see that error here
      console.error(error);
      message.error(`Failed to update details: ${error.message}`);
    }
  };

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Vehicle Number",
      dataIndex: "vehicleNumber",
      key: "vehicleNumber",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Additional Details",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleOpenModal(record)}>
          Additional Details
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Agent Claims</h2>
      <Table columns={columns} dataSource={claims} />

      {/* Modal for uploading images & description */}
      <Modal
        title="Update Claim Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter additional details..." />
          </Form.Item>

          <Form.Item
            name="customerMetStatus"
            valuePropName="checked"
            label="Customer Met Status"
          >
            <Checkbox>Met</Checkbox>
          </Form.Item>

          <Form.Item
            name="accidentImages"
            label="Upload Images"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
            extra="Attach up to 3 images related to the claim."
          >
            <Upload
              name="accidentImages"
              listType="picture"
              beforeUpload={() => false}  // do not auto-upload
              multiple
              maxCount={3}
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Select Files</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Claims;
