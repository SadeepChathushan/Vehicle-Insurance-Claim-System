import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Grid, Card, CardContent, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import AdminProfileService from '../../services/adminService'; // Assuming the service is in the same directory
import { notification } from 'antd';


const Dashboard = () => {
  const [openRegistrationPopup, setOpenRegistrationPopup] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    contact: '',
    city: '',
    address: '',
    nic: '',
    dob: '',
  });

  const handleOpenRegistrationPopup = () => {
    setOpenRegistrationPopup(true);
  };

  const handleCloseRegistrationPopup = () => {
    setOpenRegistrationPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitRegistration = async () => {
    const { name, email, role, contact, city, address, nic, dob } = userData;
  
    if (!name || !email ||  !role || !contact || !city || !address || !nic || !dob) {
      notification.error({
        message: 'Missing Fields',
        description: 'Please fill out all fields.',
      });
      return;
    }
  
    try {
      const response = await AdminProfileService.createOfficer(userData);
      notification.success({
        message: 'Registration Successful',
        description: 'Officer registered successfully!',
      });
      handleCloseRegistrationPopup();
    } catch (error) {
      notification.error({
        message: 'Registration Failed',
        description: error.message || 'An unknown error occurred.',
      });
    }
  };
  

  return (
    <div style={{ padding: '20px', background: 'linear-gradient(to right, #f8f9fa, #e9ecef)', minHeight: '100vh', position: 'relative' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Welcome to the Admin Dashboard
      </Typography>

      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenRegistrationPopup}
          sx={{
            backgroundColor: '#2ecc71',
            '&:hover': { backgroundColor: '#27ae60' },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <PersonAddIcon sx={{ marginRight: 1 }} /> Register Officer
        </Button>
      </div>

      <Grid container spacing={4} sx={{ marginTop: '60px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#fff', boxShadow: 3, '&:hover': { boxShadow: 6 }, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
              Register Officer
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 1, color: '#3498db' }}>
                15
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openRegistrationPopup} onClose={handleCloseRegistrationPopup} maxWidth="sm" fullWidth>
        <DialogTitle>Register Officer</DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Enter Officer Details
          </Typography>

          {[
            { label: 'Name', name: 'name' },
            { label: 'Email', name: 'email', type: 'email' },
            // { label: 'Password', name: 'password', type: 'password' },
            { label: 'Contact', name: 'contact', type: 'tel' },
            { label: 'City', name: 'city' },
            { label: 'Address', name: 'address' },
            { label: 'NIC', name: 'nic' },
            { label: 'Date of Birth', name: 'dob', type: 'date' },
          ].map((field) => (
            <TextField
              key={field.name}
              fullWidth
              label={field.label}
              variant="outlined"
              name={field.name}
              type={field.type || 'text'}
              value={userData[field.name]}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
          ))}

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              name="role"
              value={userData.role}
              onChange={handleInputChange}
            >
              {/* <MenuItem value="ADMIN">Admin</MenuItem> */}
              <MenuItem value="CLIENT">Client</MenuItem>
              <MenuItem value="HCADJUSTER">HC Adjuster</MenuItem>
              <MenuItem value="DCADJUSTER">DC Adjuster</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegistrationPopup} sx={{ color: '#2373e5' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitRegistration}
            sx={{
              color: 'white',
              backgroundColor: '#2373e5',
              '&:hover': { backgroundColor: '#1e60a1' },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
