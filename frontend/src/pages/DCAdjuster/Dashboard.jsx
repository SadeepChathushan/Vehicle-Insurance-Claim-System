import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Grid, Card, CardContent, MenuItem, Select, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Search as SearchIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';
import dcAdService from '../../services/dcAdService'; // Assuming you've already created the service for API calls
import VehicleRegistration from '../../components/DCAdjuster/VehicleR';
import { notification } from 'antd'; // Import Ant Design notification

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState([
    { name: 'John Doe', claimAmount: 2500, district: 'Colombo', status: 'Pending' },
    { name: 'Jane Smith', claimAmount: 5000, district: 'Kandy', status: 'Complete' },
    { name: 'Alex Brown', claimAmount: 3500, district: 'Galle', status: 'Pending' },
    { name: 'Maria Johnson', claimAmount: 1000, district: 'Matara', status: 'Complete' },
  ]);
  
  const [openRegistrationPopup, setOpenRegistrationPopup] = useState(false);
  const [userData, setUserData] = useState({
    name: '', email: '', role: 'CLIENT', contact: '', city: '', address: '', nic: '', dob: ''
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClients = clientData.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalClaimAmount = clientData.reduce((total, client) => total + client.claimAmount, 0);
  const districtManagersCount = 5; // Sample count for district managers.

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
    if (!userData.name || !userData.email || !userData.contact || !userData.city || !userData.address || !userData.nic || !userData.dob) {
      notification.error({
        message: 'Error',
        description: 'Please fill out all fields.',
      });
      return;
    }

    const clientData = {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      contact: userData.contact,
      city: userData.city,
      address: userData.address,
      nic: userData.nic,
      dob: userData.dob,
    };

    try {
      // Make the request to register the client
      const result = await dcAdService.createClient(clientData);
      notification.success({
        message: 'Success',
        description: 'Client registered successfully!',
      });
      handleCloseRegistrationPopup();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Error registering client.',
      });
    }
  };

  return (
    <div style={{ padding: '20px', background: 'linear-gradient(to right, #f8f9fa, #e9ecef)', minHeight: '100vh', position: 'relative' }}>
      {/* Dashboard Title */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
      District Officer Dashboard
      </Typography>

      {/* Register Officer Button - Top Right */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', display: "inline-block" }}>
      <VehicleRegistration />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenRegistrationPopup}
          sx={{
            backgroundColor: '#2ecc71',
            '&:hover': { backgroundColor: '#27ae60' },
            display: 'flex',
            alignItems: 'center',
            height: "10%"
          }}
        >
          <PersonAddIcon sx={{ marginRight: 1 }} /> Register Client
        </Button>
      </div>

      {/* Stats Cards */}
      <Grid container spacing={4} sx={{ marginTop: '60px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#fff', boxShadow: 3, '&:hover': { boxShadow: 6 }, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                Total Claim Amount
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 1, color: '#3498db' }}>
                ${totalClaimAmount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#fff', boxShadow: 3, '&:hover': { boxShadow: 6 }, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                District Managers
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 1, color: '#3498db' }}>
                {districtManagersCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#fff', boxShadow: 3, '&:hover': { boxShadow: 6 }, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                Complaints
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 1, color: '#e74c3c' }}>
                5
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search Clients Section */}
      <Typography variant="h6" sx={{ marginTop: 3, fontWeight: 'bold' }}>
        Search Clients
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <TextField
          variant="outlined"
          label="Search by Client Name"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginRight: 2, width: '300px' }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#3498db',
            '&:hover': { backgroundColor: '#2980b9' },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SearchIcon sx={{ marginRight: 1 }} /> Search
        </Button>
      </div>

      {/* Clients Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="clients table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Claim Amount</strong></TableCell>
              <TableCell><strong>District</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client, index) => (
              <TableRow key={index}>
                <TableCell>{client.name}</TableCell>
                <TableCell>${client.claimAmount}</TableCell>
                <TableCell>{client.district}</TableCell>
                <TableCell>{client.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Registration Popup */}
      <Dialog open={openRegistrationPopup} onClose={handleCloseRegistrationPopup} maxWidth="sm" fullWidth>
        <DialogTitle>Register Officer</DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Register a New Officer
          </Typography>
          <TextField
            fullWidth
            label="Client Name"
            variant="outlined"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Contact Number"
            variant="outlined"
            name="contact"
            type="number"
            value={userData.contact}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="City"
            variant="outlined"
            name="city"
            value={userData.city}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="NIC"
            variant="outlined"
            name="nic"
            value={userData.nic}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Date of Birth"
            variant="outlined"
            type="date"
            name="dob"
            value={userData.dob}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              name="role"
              value={userData.role}
              onChange={handleInputChange}
            >
              <MenuItem value="CLIENT">Client</MenuItem>
              <MenuItem value="DCADJUSTER">District Adjuster</MenuItem>
              <MenuItem value="HCADJUSTER">Head Adjuster</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegistrationPopup} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitRegistration} color="secondary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
