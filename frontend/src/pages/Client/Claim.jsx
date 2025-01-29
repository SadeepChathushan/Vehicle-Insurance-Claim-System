import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import clientService from "../../services/clientService";

const Claim = () => {
  const districts = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];

  const [openClaimForm, setOpenClaimForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [claimData, setClaimData] = useState({
    description: "",
    location: "",
    vehicleNum: "",
    createdAt: "",
    status: "",
  });
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in localStorage!");
        return;
      }

      try {
        const fetchedClaimsResponse = await clientService.getClaims(userId);

        // Check if the response has success as true and claims as an array
        if (
          fetchedClaimsResponse.success &&
          Array.isArray(fetchedClaimsResponse.claims)
        ) {
          setClaims(fetchedClaimsResponse.claims); // Extract and set claims
        } else {
          console.error(
            "API did not return a valid claims array:",
            fetchedClaimsResponse
          );
          setClaims([]); // Set an empty array if the claims are invalid
        }
      } catch (error) {
        console.error("Error fetching claims:", error);
        setClaims([]); // Set an empty array if the fetch fails
      }
    };

    fetchClaims();
  }, []);

  const handleOpenClaimForm = (vehicle) => {
    setSelectedVehicle(vehicle);
    setClaimData({
      description: "",
      location: "",
      vehicleNum: "",
      createdAt: "",

      status: "",
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
      [name]: value, // This will update the correct field, based on the name
    }));
  };

  const handleLocationChange = (event) => {
    const { value } = event.target;
    setClaimData((prevData) => ({
      ...prevData,
      location: value,
    }));
  };

  const handleSubmitClaim = async () => {
    console.log("Submitting Claim...");
    const userId = localStorage.getItem("userId"); // Get the userId from localStorage
    console.log("userid claim", userId);

    if (!userId) {
      alert("User not logged in!");
      return;
    }

    const claimPayload = {
      userId: userId,
      mobileNumber: claimData.mobileNumber,
      vehicleNum: claimData.vehicleNum,
      location: claimData.location,
      description: claimData.description,
    };

    console.log("Claim Payload:", claimPayload); // Ensure mobileNumber is not undefined

    try {
      const response = await clientService.addClaim(claimPayload);
      console.log("Response:", response);

      if (response.success) {
        alert("Claim submitted successfully!");
        setClaims((prevClaims) => [
          ...prevClaims,
          {
            ...claimPayload,
            claimId: response.claimId,
            status: claimData.status,
          },
        ]);
        handleCloseClaimForm();
      } else {
        alert("Claim submission failed!");
      }
    } catch (error) {
      alert("An error occurred while submitting the claim.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* New Claim Section */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          const firstVehicle = claims[0]; // Just an example; you might want to select a specific vehicle
          if (firstVehicle) {
            handleOpenClaimForm(firstVehicle); // Open the form for the selected vehicle
          }
        }}
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
                <strong>Location</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(claims || []).map((claim, index) => {
              // Convert the createdAt timestamp into a more readable format
              const formattedDate = new Date(claim.createdAt).toLocaleString();

              return (
                <TableRow key={index}>
                  <TableCell>{claim.vehicleNum}</TableCell>
                  <TableCell>{claim.description}</TableCell>
                  <TableCell>{claim.location}</TableCell>
                  <TableCell>{formattedDate}</TableCell>{" "}
                  {/* Display formatted date */}
                  <TableCell>{claim.status}</TableCell>
                </TableRow>
              );
            })}
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
              ></Typography>

              <TextField
                fullWidth
                label="Mobile Number"
                variant="outlined"
                type="text"
                name="mobileNumber"
                value={claimData.mobileNumber} // Ensure this is properly populated with claimData.mobileNumber
                onChange={handleInputChange} // This will update claimData.mobileNumber on change
                sx={{ marginBottom: 2 }}
              />

              <TextField
                fullWidth
                label="Vehicle Number"
                variant="outlined"
                type="text"
                name="vehicleNum"
                value={claimData.vehicleNum}
                onChange={handleInputChange}
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
