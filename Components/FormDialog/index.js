import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fab, Grid, Typography } from '@mui/material';
import styles from '../../styles/FormDialog.module.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import PhoneInput from 'react-phone-input-2';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import 'react-phone-input-2/lib/style.css';
import Image from 'next/image';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(dayjs());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });

  useEffect(() => {
    let pop_status = localStorage.getItem('pop_status');
    if (!pop_status) {
      setOpen(true);
      localStorage.setItem('pop_status', 1);
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
  });

  const handleClose = () => {
    setOpen(false);
  };
  const [noOfPersons, setNoOfPersons] = useState({
    Adults: 0,
    Child: 0,
    Infant: 0,
  });
  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(newValue);
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

  return (
    <div>
      {/* <Button variant='outlined' onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        hideBackdrop={true}
        disableScrollLock
        fullWidth
        sx={{
          backdropFilter: open ? 'blur(5px)' : 'unset',
          //other styles here
        }}
        // fullScreen
        TransitionComponent={Transition}
        maxWidth={'md'}
        fullScreen={isMobile ? true : false}
        PaperProps={{
          style: {
            backgroundColor: '#acb7ae',
            boxShadow: 'none',
            position: 'absolute',
            bottom: '0%',
            maxHeight: isMobile ? '570px' : '',
          },
        }}
      >
        <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: 'flex', flexDirection: 'column', mt: '20px' }}
          >
            <Fab
              size='small'
              onClick={() => {
                handleClose();
              }}
              sx={{
                position: 'absolute',
                left: '1%',

                top: '1%',
              }}
            >
              <CloseIcon />
            </Fab>
            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '27px',
                  padding: '0px 10px 0 20px',
                  fontFamily: "'Comfortaa', sans-serif;",
                  color: ' #2d545e',
                  textAlign: 'center',
                  fontWeight: 900,
                }}
              >
                Get your Customized Packages for free
              </Typography>
            </Grid>
            <Grid>
              <Grid
                container
                rowGap={2}
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
                <Grid item sx={{ width: '100%', background: '#acb7ae' }}>
                  <PhoneInput
                    style={{ width: '100%', background: '#acb7ae' }}
                    inputStyle={{
                      width: '100%',
                      height: '47px',
                      backgroundColor: '#acb7ae',
                    }}
                    dropdownStyle={{
                      scrollBehavior: 'unset',
                      backgroundColor: '#acb7ae',
                    }}
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
                        sx={{
                          fontSize: '17px',
                          fontFamily: "'Roboto', sans-serif",
                        }}
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
                        setNoOfPersons({
                          ...noOfPersons,
                          Adults: e.target.value,
                        })
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
                        setNoOfPersons({
                          ...noOfPersons,
                          Child: e.target.value,
                        })
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
                        setNoOfPersons({
                          ...noOfPersons,
                          Infant: e.target.value,
                        })
                      }
                      defaultValue={noOfPersons.Infant}
                      fontSize='3px'
                      size='small'
                      id='outlined-basic'
                      variant='outlined'
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <button className={styles.buttonPkViewMore}>
                    get Customized Package
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sx={{ display: { xs: 'none', md: 'unset' } }}>
            <img
              style={{ heignt: '100%', width: '100%' }}
              src='https://images.unsplash.com/photo-1609115949305-c6fe697c4e98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
            />
          </Grid>
        </Grid>

        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
