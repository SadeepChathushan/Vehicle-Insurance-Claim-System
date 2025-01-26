import React, { useState } from "react";
import {Button,Dialog,DialogActions,DialogContent,DialogTitle,TextField,Typography,Grid,Card,CardContent,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Select,MenuItem,
} from "@mui/material";

const Claim = () => {
  const districts = ["Ampara","Anuradhapura","Badulla","Batticaloa","Colombo","Galle","Gampaha","Hambantota","Jaffna","Kalutara","Kandy","Kegalle","Kilinochchi","Kurunegala","Mannar","Matale","Matara","Monaragala","Mullaitivu","Nuwara Eliya","Polonnaruwa","Puttalam","Ratnapura","Trincomalee","Vavuniya",];

  const handleLocationChange = (event) => {
    const { value } = event.target;
    setClaimData((prevData) => ({
      ...prevData,
      location: value,
    }));
  };

  const customer = {
    name: "John Doe",
    vehicles: [
      {
        id: 1,
        make: "Toyota",
        model: "Corolla",
        year: 2021,
        claimDate: "2022/05/27",
        status: "Not Complete",
        number: "ABC-1234",
      },
      {
        id: 2,
        make: "Honda",
        model: "Civic",
        year: 2019,
        claimDate: "2021/07/07",
        status: "Complete",
        number: "XYZ-5678",
      },
    ],
  };

  const [openClaimForm, setOpenClaimForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [claimData, setClaimData] = useState({
    description: "",
    amount: "",
    vehicleId: null,
    images: "",
    status: "Pending",
  });
  const [claims, setClaims] = useState([
    {
      id: 1,
      description: "Accident with another vehicle",
      amount: "1500",
      vehicle: {
        make: "Toyota",
        model: "Corolla",
        year: 2021,
        number: "ABC-1234",
      },
      status: "Pending",
      images: "http://example.com/image1.jpg",
    },
    {
      id: 2,
      description: "Damaged rear bumper",
      amount: "800",
      vehicle: {
        make: "Honda",
        model: "Civic",
        year: 2019,
        number: "XYZ-5678",
      },
      status: "Approved",
      images: "http://example.com/image2.jpg",
    },
  ]);

  const handleOpenClaimForm = (vehicle) => {
    setSelectedVehicle(vehicle);
    setClaimData({
      description: "",
      amount: "",
      vehicleId: vehicle.id,
      images: "",
      status: "Pending",
    });
    setOpenClaimForm(true);
  };

  const handleCloseClaimForm = () => {
    setOpenClaimForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClaimData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitClaim = () => {
    if (!claimData.description || !claimData.amount) {
      alert("Please fill out all fields.");
      return;
    }
    const newClaim = {
      id: claims.length + 1,
      description: claimData.description,
      amount: claimData.amount,
      vehicle: selectedVehicle,
      status: claimData.status,
      images: claimData.images,
    };
    setClaims((prevClaims) => [...prevClaims, newClaim]);
    alert("Claim submitted successfully!");
    handleCloseClaimForm();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* New Claim Section */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenClaimForm(customer.vehicles[0])} // Open the form for the first vehicle as an example
        sx={{ marginBottom: 3 }}
      >
        New Claim
      </Button>

      {/* Current Claims Section */}
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: "#2373e5", mb: 2 }}
      >
        Submitted Claims
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Vehicle</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Claim Amount</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Images</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell>
                  {claim.vehicle.make} {claim.vehicle.model} (
                  {claim.vehicle.year})
                </TableCell>
                <TableCell>{claim.description}</TableCell>
                <TableCell>{claim.amount}</TableCell>
                <TableCell>{claim.status}</TableCell>
                <TableCell>
                  {claim.images ? "Images Attached" : "No Images"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup for New Claim Form */}
      <Dialog
        open={openClaimForm}
        onClose={handleCloseClaimForm}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>New Claim</DialogTitle>
        <DialogContent>
          {selectedVehicle && (
            <div>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Claim for {selectedVehicle.make} {selectedVehicle.model} (
                {selectedVehicle.year})
              </Typography>

              <TextField
                fullWidth
                label="Mobile Number"
                variant="outlined"
                type="text"
                name="number"
                value={claimData.number}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Vehicle Number"
                variant="outlined"
                value={selectedVehicle.number}
                disabled
                sx={{ marginBottom: 2 }}
              />

              <Select
                fullWidth
                value={claimData.location || ""}
                onChange={handleLocationChange}
                displayEmpty
                sx={{ marginBottom: 2 }}
              >
                <MenuItem value="" disabled>
                  Select District
                </MenuItem>
                {districts.map((district, index) => (
                  <MenuItem key={index} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                fullWidth
                label="Claim Description (Optional)"
                variant="outlined"
                multiline
                rows={4}
                name="description"
                value={claimData.description}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClaimForm} sx={{ color: "#2373e5" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitClaim}
            sx={{
              color: "white",
              backgroundColor: "#2373e5",
              "&:hover": {
                backgroundColor: "#1e60a1",
              },
            }}
          >
            Submit Claim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Claim;
