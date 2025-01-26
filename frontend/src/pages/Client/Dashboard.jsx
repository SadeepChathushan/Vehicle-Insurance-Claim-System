import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";

const Dashboard = () => {
  // Example customer and vehicle data
  const customer = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+123 456 7890",
    vehicles: [
      { id: 1, make: "Toyota", model: "Corolla", year: 2021, details: "This is a reliable and fuel-efficient car." },
      { id: 2, make: "Honda", model: "Civic", year: 2019, details: "Sporty design with a powerful engine." },
      { id: 3, make: "Ford", model: "Focus", year: 2020, details: "Compact and comfortable for city driving." },
    ],
  };

  // State to manage popup visibility and selected vehicle
  const [open, setOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Open the popup
  const handleOpen = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpen(true);
  };

  // Close the popup
  const handleClose = () => {
    setOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Customer Profile */}
      <Card
        sx={{
          background: "linear-gradient(90deg, #69baf6 0%, #2373e5 100%)",
          color: "white",
          mb: 4,
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar sx={{ backgroundColor: "white" }}>
              <PersonIcon sx={{ color: "#2373e5" }} />
            </Avatar>
            <div>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {customer.name}
              </Typography>
              <Typography variant="body2">{customer.email}</Typography>
              <Typography variant="body2">{customer.phone}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicles */}
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2373e5", mb: 2 }}>
        Customer Vehicles
      </Typography>
      <Grid container spacing={3}>
        {customer.vehicles.map((vehicle) => (
          <Grid item xs={12} md={4} key={vehicle.id}>
            <Card
              sx={{
                backgroundColor: "white",
                boxShadow: 3,
                "&:hover": { boxShadow: 6 },
                borderRadius: 2,
              }}
            >
              <CardContent>
                <div className="flex items-center mb-4 space-x-4">
                  <Avatar sx={{ backgroundColor: "#2373e5" }}>
                    <DirectionsCarIcon sx={{ color: "white" }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2373e5" }}>
                    {vehicle.make} {vehicle.model}
                  </Typography>
                </div>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  Year: {vehicle.year}
                </Typography>
              </CardContent>
              <div className="flex justify-end p-4">
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "#2373e5",
                    borderColor: "#2373e5",
                    "&:hover": {
                      backgroundColor: "#2373e5",
                      color: "white",
                    },
                  }}
                  onClick={() => handleOpen(vehicle)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Popup/Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Vehicle Details
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8, color: "gray" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedVehicle && (
            <div>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {selectedVehicle.make} {selectedVehicle.model}
              </Typography>
              <Typography variant="body1">Year: {selectedVehicle.year}</Typography>
              <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
                {selectedVehicle.details}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "#2373e5",
              "&:hover": {
                backgroundColor: "#2373e5",
                color: "white",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
