import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const customer = {
  name: "Nishan Madushanka",
  email: "nishan@gmail.com",
  phone: "077 456 7890",
  vehicles: [
    {
      id: 1,
      make: "Toyota",
      model: "Corolla",
      year: 2021,
      details: "Reliable, fuel-efficient, perfect for commuting and long drives.",
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2019,
      details: "Sporty design, great handling, and powerful engine.",
    },
    {
      id: 3,
      make: "Ford",
      model: "Focus",
      year: 2020,
      details: "Compact and comfortable, ideal for city driving.",
    },
  ],
};

const Dashboard = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 3,
        bgcolor: "#f4f6f9", // Light background color
      }}
    >
      {/* Greeting */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#1e4ca1" }}
        >
          Hi, {customer.name.split(" ")[0]}!
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mt: 0.5 }}>
          Welcome back to your Vehicle Insurance Dashboard.
        </Typography>
      </Box>

      {/* Smaller customer info card */}
      <Card
        sx={{
          background: "#1e4ca1",
          color: "white",
          mb: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: "white" }}>
              <PersonIcon sx={{ color: "#1e4ca1" }} />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {customer.name}
              </Typography>
              <Typography variant="body2">{customer.email}</Typography>
              <Typography variant="body2">{customer.phone}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Vehicles header */}
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: "#1e4ca1", mb: 2 }}
      >
        You currently have {customer.vehicles.length} vehicle(s) insured:
      </Typography>

      {/* Vehicles: each card has the same minHeight */}
      <Grid container spacing={3}>
        {customer.vehicles.map((vehicle) => (
          <Grid item xs={12} md={4} key={vehicle.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 160,
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar sx={{ bgcolor: "#1e4ca1" }}>
                    <DirectionsCarIcon sx={{ color: "white" }} />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#1e4ca1" }}
                  >
                    {vehicle.make} {vehicle.model}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
                  <strong>Year:</strong> {vehicle.year}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  {vehicle.details}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
