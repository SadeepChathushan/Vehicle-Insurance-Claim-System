import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import dcAdService from '../../services/dcAdService'; // Import backend service
import { notification } from 'antd'; // Import Ant Design notification

const VehicleR = () => {
  const [openVehiclePopup, setOpenVehiclePopup] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    clientNic: '',
    policyNo: '',
    type: '',
    engineNo: '',
    periodCoverStart: '',
    periodCoverEnd: '',
    chassisNo: '',
    model: '',
  });
  const [loading, setLoading] = useState(false);

  const handleOpenVehiclePopup = () => setOpenVehiclePopup(true);
  const handleCloseVehiclePopup = () => setOpenVehiclePopup(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Date Change and Convert to Backend Format
  const handleDateChange = (e) => {
    setVehicleData({
      ...vehicleData,
      [e.target.name]: new Date(e.target.value).toISOString(), // Convert to ISO format
    });
  };

  const handleSubmitVehicleRegistration = async () => {
    if (
      !vehicleData.clientNic ||
      !vehicleData.policyNo ||
      !vehicleData.type ||
      !vehicleData.engineNo ||
      !vehicleData.periodCoverStart ||
      !vehicleData.periodCoverEnd ||
      !vehicleData.chassisNo ||
      !vehicleData.model
    ) {
      notification.error({
        message: 'Error',
        description: 'Please fill out all fields.',
      });
      return;
    }

    const payload = {
      clientNic: vehicleData.clientNic,
      policyNo: vehicleData.policyNo,
      type: vehicleData.type,
      engineNo: vehicleData.engineNo,
      periodCoverStart: vehicleData.periodCoverStart,
      periodCoverEnd: vehicleData.periodCoverEnd,
      ChassisNo: vehicleData.chassisNo, // Ensure key matches backend
      mModel: vehicleData.model, // Ensure key matches backend
    };

    setLoading(true);
    try {
      const response = await dcAdService.createVehiIns(payload);
      notification.success({
        message: 'Vehicle Registered Successfully',
        description: response.message,
      });
      handleCloseVehiclePopup();
    } catch (error) {
      console.error('Error during vehicle registration:', error);
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'Failed to register vehicle.',
      });
    } finally {
      setLoading(false);
    }
  };


  // Utility function to safely format date
function safeDateFormat(dateStr) {
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
}

  return (
    <div>
      {/* Register Vehicle Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenVehiclePopup}
        sx={{
          backgroundColor: '#e67e22',
          '&:hover': { backgroundColor: '#d35400' },
          margin: '10px',
          display: 'flex',
          alignItems: 'center',
        }}
        disabled={loading}
      >
        <DirectionsCarIcon sx={{ marginRight: 1 }} /> Register Vehicle with Insurance
      </Button>

      {/* Vehicle Registration Popup */}
      <Dialog open={openVehiclePopup} onClose={handleCloseVehiclePopup} maxWidth="sm" fullWidth disableEnforceFocus>
        <DialogTitle>Register Vehicle with Insurance</DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Register a New Vehicle
          </Typography>

          <TextField
            fullWidth
            label="Policy Number"
            variant="outlined"
            name="policyNo"
            value={vehicleData.policyNo}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Vehicle Type</InputLabel>
            <Select
              label="Vehicle Type"
              name="type"
              value={vehicleData.type}
              onChange={handleInputChange}
            >
              <MenuItem value="Car">Car</MenuItem>
              <MenuItem value="Bike">Bike</MenuItem>
              <MenuItem value="Truck">Truck</MenuItem>
              <MenuItem value="Bus">Bus</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Engine Number"
            variant="outlined"
            name="engineNo"
            value={vehicleData.engineNo}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Chassis Number"
            variant="outlined"
            name="chassisNo"
            value={vehicleData.chassisNo}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

<TextField
  fullWidth
  label="Period of Cover Start"
  type="date"
  name="periodCoverStart"
  value={safeDateFormat(vehicleData.periodCoverStart)}
  onChange={handleDateChange}
  InputLabelProps={{ shrink: true }}
  sx={{ marginBottom: 2 }}
/>

<TextField
  fullWidth
  label="Period of Cover End"
  type="date"
  name="periodCoverEnd"
  value={safeDateFormat(vehicleData.periodCoverEnd)}
  onChange={handleDateChange}
  InputLabelProps={{ shrink: true }}
  sx={{ marginBottom: 2 }}
/>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Vehicle Model</InputLabel>
            <Select
              label="Vehicle Model"
              name="model"
              value={vehicleData.model}
              onChange={handleInputChange}
            >
              <MenuItem value="Honda Civic">Honda Civic</MenuItem>
              <MenuItem value="Toyota Corolla">Toyota Corolla</MenuItem>
              <MenuItem value="BMW 3 Series">BMW 3 Series</MenuItem>
              <MenuItem value="Ford Mustang">Ford Mustang</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Client NIC"
            variant="outlined"
            name="clientNic"
            value={vehicleData.clientNic}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseVehiclePopup} sx={{ color: '#e67e22' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitVehicleRegistration}
            sx={{
              color: 'white',
              backgroundColor: '#e67e22',
              '&:hover': { backgroundColor: '#d35400' },
            }}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Registration'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VehicleR;
