import React from 'react';
import { Modal } from 'antd';

const ClaimsModal = ({ visible, handleCancel, selectedClaim }) => {
  return (
    <Modal
      title="Claim Images"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      {selectedClaim &&
        selectedClaim.map((image, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            <img
              src={image}
              alt={`Claim Image ${index + 1}`}
              style={{ width: '100%', height: 'auto', borderRadius: 4 }}
            />
          </div>
        ))}
    </Modal>
  );
};

export default ClaimsModal;
