import { Alert, Grid, Snackbar, TextField, Typography } from '@mui/material';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import styles from '../../styles/BookingBox.module.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { sendForm } from '@emailjs/browser';
import { MuiTelInput } from 'mui-tel-input';

const BookingBox = (props) => {
  const [noOfPersons, setNoOfPersons] = useState({
    Adults: 0,
    Child: 0,
    Infant: 0,
  });
  const [open, setopen] = useState(false);

  const handleOpen = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };
  const [queryData, setQueryData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    arivalDate: '',
    noOfGuests: {
      Adults: 0,
      Child: 0,
      Infant: 0,
    },
  });

  const sendEmail = (e) => {
    e.preventDefault();

    sendForm(
      'service_h37zmnt',
      'template_dwz2hda',
      form.current,
      'uxUACuGSvix8kkLqR'
    )
      .then(
        (result) => {
          handleOpen();
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      )
      .finally(() => {
        document.getElementById('myForm').reset();
      });
  };
  const [number, setNumber] = useState('');

  const handlePhoneChange = (newValue) => {
    setNumber(newValue);
  };
  const form = useRef();
  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  const [value, setValue] = useState(dayjs());
  return (
    <form ref={form} onSubmit={sendEmail} id='myForm'>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '12px',
          borderTop: '7px solid #DC834E',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          width: '350px',
        }}
      >
        <Grid
          item
          sx={{
            padding: '20px 30px',
            borderBottom: '1px solid #D3D3D3',
            width: '100%',
            height: '62px',
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 900,
              fontSize: '21px',
            }}
          >
            Book This Tour
          </Typography>
        </Grid>
        <Grid
          container
          rowGap={1}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '20px 30px',
            alignItems: 'center',
          }}
        >
          {/* <Typography>Name</Typography> */}
          <Grid item sx={{ width: '100%' }}>
            <TextField
              name='name'
              type='text'
              label='Name'
              fullWidth
              // onChange={(e) =>
              //   setNoOfPersons({ ...noOfPersons, Child: e.target.value })
              // }
              // defaultValue={noOfPersons.Child}
              fontSize='3px'
              // size='small'
              id='outlined-basic'
              variant='outlined'
            />
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <TextField
              name='email'
              type='text'
              label='Email'
              fullWidth
              // onChange={(e) =>
              //   setNoOfPersons({ ...noOfPersons, Child: e.target.value })
              // }
              // defaultValue={noOfPersons.Child}
              fontSize='3px'
              //   size='small'
              id='outlined-basic'
              variant='outlined'
            />
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <MuiTelInput
              label='Phone'
              fullWidth
              name='phone'
              defaultCountry='IN'
              value={number}
              onChange={handlePhoneChange}
              focusOnSelectCountry
            />
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <Grid
              container
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: '20px',
                mt: '10px',
                borderTop: '1px solid #D3D3D3',
              }}
            >
              <Grid item>
                <Typography
                  sx={{ fontSize: '17px', fontFamily: "'Roboto', sans-serif" }}
                >
                  From:
                </Typography>
              </Grid>
              <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label='Arrival Date'
                    inputFormat='MM/DD/YYYY'
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => (
                      <TextField
                        name='fromDate'
                        {...params}
                        sx={{ width: '170px' }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '0 30px',
            alignItems: 'center',
          }}
        >
          <Grid item>
            <Typography>Guests:</Typography>
          </Grid>
          <Grid item>
            <Grid container columnGap={1}>
              <TextField
                name='adults'
                sx={{ width: '60px', fontSize: '3px' }}
                type='number'
                label='Adults'
                onChange={(e) =>
                  setNoOfPersons({ ...noOfPersons, Adults: e.target.value })
                }
                defaultValue={noOfPersons.Adults}
                fontSize='3px'
                size='small'
                id='outlined-basic'
                variant='outlined'
              />
              <TextField
                name='child'
                sx={{ width: '60px', fontSize: '3px' }}
                type='number'
                label='Child'
                onChange={(e) =>
                  setNoOfPersons({ ...noOfPersons, Child: e.target.value })
                }
                defaultValue={noOfPersons.Child}
                fontSize='3px'
                size='small'
                id='outlined-basic'
                variant='outlined'
              />
              <TextField
                name='infant'
                sx={{ width: '60px', fontSize: '3px' }}
                type='number'
                label='Infant'
                onChange={(e) =>
                  setNoOfPersons({ ...noOfPersons, Infant: e.target.value })
                }
                defaultValue={noOfPersons.Infant}
                fontSize='3px'
                size='small'
                id='outlined-basic'
                variant='outlined'
              />
            </Grid>
          </Grid>
          <Grid item>
            {/* <button className={styles.buttonPkViewMore}>Send Query</button> */}
            <input
              style={{ fontFamily: "'Comfortaa', sans-serif" }}
              className={styles.buttonPkViewMore}
              type='submit'
              value='Send'
            />
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Thanks! Will get back to you soon.
        </Alert>
      </Snackbar>
    </form>
  );
};

export default BookingBox;
