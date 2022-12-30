import { Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import styles from '../../styles/BookingBox.module.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const BookingBox = (props) => {
  const [noOfPersons, setNoOfPersons] = useState({
    Adults: 0,
    Child: 0,
    Infant: 0,
  });

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
  useEffect(() => {
    console.log(noOfPersons);
  }, [noOfPersons]);

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  const [value, setValue] = useState(dayjs());
  return (
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
          <PhoneInput
            style={{ width: '100%' }}
            dropdownStyle={{ scrollBehavior: 'unset' }}
            country={'in'}
            //   value={this.state.phone}
            //   onChange={(phone) => setState({ phone })}
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
                    <TextField {...params} sx={{ width: '170px' }} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <hr style={{ height: '1px', color: 'gray' }} />
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
          <button className={styles.buttonPkViewMore}>Send Query</button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookingBox;
