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
    currency:''
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const generateOrderId = () => {
    const timestamp = format(new Date(), 'yyyyMMddHHmmss'); // Current timestamp
    const randomNum = Math.floor(Math.random() * 1000000); // Random number (adjust the range as needed)
    const orderId = `${timestamp}${randomNum}`; // Combine timestamp and random number
    return orderId;
  };
                          

const handlePayment = async () => {
  try {
    // Prepare the data to be sent to the CCAvenue endpoint
    const requestData = {
      merchantId: 3145729,
      orderId: generateOrderId(),
      currency: formData?.currency,
      amount: formData?.amount,
      redirectURL: 'https://api.thediscoverkashmir.in/api/ccav/ccavResponseHandler',
      cancelURL: 'https://api.thediscoverkashmir.in/api/ccav/ccavResponseHandler',
      language: 'EN'
    };

    // Make a POST API call to CCAvenue endpoint using Axios
    const response = await axios.post(
      'http://localhost:3001/api/ccav/ccavRequestHandler',
      requestData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Assuming the response is text, modify accordingly
    const responseData = response.data;

    // Create a form dynamically and submit it to redirect to CCAvenue
    const form = document.createElement('form');
    form.innerHTML = responseData;
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    // Now, make a POST request to your Next.js API route
    const apiResponse = await axios.post('/api/ccavenueResponse', responseData);

    // Handle the response from the API route if needed
    console.log('API Response:', apiResponse.data);
  } catch (error) {
    console.error('Error during payment:', error);
    // Handle error (e.g., show an error message to the user)
  }
};

  
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return ;
      // case 1:
      //   return <PaymentForm />;
      // case 2:
      //   return <Review />;
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
          <Typography component="h1" variant="h4" align="center" sx={{marginBottom:"40px"}}>
            Checkout
          </Typography>
          {/* <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
        
            <React.Fragment>
            <AddressForm formData={formData} setFormData={setFormData} handlePayment={handlePayment} />
            </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}