import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from '../../Components/AddressForm';
import PaymentForm from '../../Components/PaymentForm';
import Review from '../../Components/Review';
import HeroSection from '../../Components/HeroSection';
import axios from 'axios';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];



export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    name: '',
    duration: '',
    packageDetails: '',
    amount: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };


                           
  const handlePayment = async () => {
    try {
      // Prepare the data to be sent to the CCAvenue endpoint
      const requestData = {
        merchantId: 3145729,
        orderId: 1,
        currency: 'INR',
        amount: 1.00,
        redirectURL: 'https://thediscoverkashmir.in/ccavResponseHandler',
        cancelURL: 'https://thediscoverkashmir.in/ccavResponseHandler',
        language: 'EN'
      };
  
      // Make a POST API call to CCAvenue endpoint using Axios
      const response = await axios.post(
        'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction',
        requestData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      // Assuming the response is text, modify accordingly
      const responseData = response.data;
      debugger;
  
      // Create a form dynamically and submit it to redirect to CCAvenue
      const form = document.createElement('form');
      form.innerHTML = responseData;
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    } catch (error) {
      console.error('Error during payment:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm formData={formData} setFormData={setFormData} />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HeroSection
          usedIn='Contact'
          bgImage='background.jpg'
          Name={"Payment"}
        />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {/* {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )} */}

                <Button
                  variant="contained"
                  onClick={handlePayment}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {/* {activeStep === steps.length - 1 ? 'Place order' : 'Next'} */}
                  Place order
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}