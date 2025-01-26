import React from 'react';
import { Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';
import { LocalHospital, Security, LocalFireDepartment } from '@mui/icons-material';

const EmergencyNumbers = () => {
  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
      {/* Page Heading */}
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 3, textAlign: 'center' }}>
        Emergency Numbers
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: 4, color: '#34495e', textAlign: 'center' }}>
        In case of an emergency after an accident, please use the following contact numbers to get immediate assistance:
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Ambulance Card */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              backgroundColor: '#fff',
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
              },
              borderRadius: 2,
              textAlign: 'center',
              padding: 2,
            }}
          >
            <CardContent>
              <LocalHospital fontSize="large" sx={{ color: '#e74c3c', marginBottom: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#e74c3c' }}>
                Ambulance
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#7f8c8d' }}>
                Call: <span style={{ fontWeight: 'bold' }}>1990</span>
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d', marginTop: 2 }}>
                For medical emergencies and accident assistance.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Police Card */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              backgroundColor: '#fff',
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
              },
              borderRadius: 2,
              textAlign: 'center',
              padding: 2,
            }}
          >
            <CardContent>
              <Security fontSize="large" sx={{ color: '#3498db', marginBottom: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#3498db' }}>
                Police
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#7f8c8d' }}>
                Call: <span style={{ fontWeight: 'bold' }}>119</span>
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d', marginTop: 2 }}>
                For reporting accidents, traffic issues, and law enforcement emergencies.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Fire Services Card */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              backgroundColor: '#fff',
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
              },
              borderRadius: 2,
              textAlign: 'center',
              padding: 2,
            }}
          >
            <CardContent>
              <LocalFireDepartment fontSize="large" sx={{ color: '#f39c12', marginBottom: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#f39c12' }}>
                Fire Services
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#7f8c8d' }}>
                Call: <span style={{ fontWeight: 'bold' }}>110</span>
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d', marginTop: 2 }}>
                For fire-related emergencies or rescue operations.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Back Button */}
      <Box textAlign="center" sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: '1.1rem',
            padding: '12px 24px',
            backgroundColor: '#2373e5',
            '&:hover': {
              backgroundColor: '#1e60a1',
            },
          }}
          onClick={() => window.history.back()} // Navigate back to the previous page
        >
          Go Back
        </Button>
      </Box>
    </div>
  );
};

export default EmergencyNumbers;
