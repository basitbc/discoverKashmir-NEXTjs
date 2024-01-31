import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { Box, Button, MenuItem } from '@mui/material';

export default function AddressForm({ setFormData, formData, handlePayment }) {
  const [validation, setValidation] = useState({
    name: true,
    duration: true,
    packageDetails: true,
    amount: true,
    city: true,
    state: true,
    zip: true,
    country: true,
    currency: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Update validation status
    setValidation({
      ...validation,
      [name]: value.trim() !== '', // Field is valid if not empty
    });
  };

  const validateForm = () => {
    const isValid = Object.values(validation).every((value) => value);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // All fields are valid, proceed with submission
      handlePayment();
    } else {
      // Some fields are empty, show an error or take appropriate action
      alert('Please fill out all required fields.');
    }
  };
  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Please enter your Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={formData.name}
              onChange={handleChange}
              error={!validation.name}
              helperText={!validation.name ? 'Field is required' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="duration"
              name="duration"
              label="Duration"
              fullWidth
              autoComplete="duration"
              variant="standard"
              value={formData.duration}
              onChange={handleChange}
              error={!validation.duration}
              helperText={!validation.duration ? 'Field is required' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="packageDetails"
              name="packageDetails"
              label="Package Details(No of Nights/Days)"
              fullWidth
              autoComplete="shipping address-line"
              variant="standard"
              value={formData.packageDetails}
              onChange={handleChange}
              error={!validation.packageDetails}
              helperText={!validation.packageDetails ? 'Field is required' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="amount"
              name="amount"
              label="Amount to Pay"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              value={formData.amount}
              onChange={handleChange}
              error={!validation.amount}
              helperText={!validation.amount ? 'Field is required' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
              required
              id="currency"
              name="currency"
              label="Currency"
              fullWidth
              variant="standard"
              select
              value={formData.currency || 'INR'} // Default to INR
              onChange={handleChange}
              error={!validation.currency}
              helperText={!validation.currency ? 'Field is required' : ''}
            >
              <MenuItem value="INR">Indian Rupee (INR)</MenuItem>
              <MenuItem value="USD">United States Dollar (USD)</MenuItem>
              <MenuItem value="SGD">Singapore Dollar (SGD)</MenuItem>
              <MenuItem value="GBP">Pound Sterling (GBP)</MenuItem>
              <MenuItem value="EUR">Euro (EUR)</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              value={formData.city}
              onChange={handleChange}
              error={!validation.city}
              helperText={!validation.city ? 'Field is required' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              value={formData.state}
              onChange={handleChange}
              error={!validation.state}
              helperText={!validation.state ? 'Field is required' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              value={formData.zip}
              onChange={handleChange}
              error={!validation.zip}
              helperText={!validation.zip ? 'Field is required' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              value={formData.country}
              onChange={handleChange}
              error={!validation.country}
              helperText={!validation.country ? 'Field is required' : ''}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {/* {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )} */}

                <Button
                type='submit'
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                >
                  {/* {activeStep === steps.length - 1 ? 'Place order' : 'Next'} */}
                  Pay Now
                </Button>
              </Box>
      </form>
    </React.Fragment>
  );
}

AddressForm.propTypes = {
  setFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  handlePayment: PropTypes.func.isRequired,
};
