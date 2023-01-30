import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { Fab, Grid, Typography } from '@mui/material';
import styles from '../../styles/FormDialog.module.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PhoneInput from 'react-phone-input-2';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import 'react-phone-input-2/lib/style.css';
import Image from 'next/image';
import Slide from '@mui/material/Slide';
import { sendForm } from '@emailjs/browser';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MuiTelInput } from 'mui-tel-input';
import Router, { useRouter } from 'next/router';
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = React.useState(dayjs());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  const [sendMessage, setSendMessage] = useState(false);

  const router = useRouter();
  useEffect(() => {
    let pop_status = sessionStorage.getItem('pop_status');
    if (!pop_status) {
      setOpen(true);
      sessionStorage.setItem('pop_status', 1);
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
    // router.replace(router.asPath);
    Router.reload();
  };
  const [noOfPersons, setNoOfPersons] = useState({
    Adults: 0,
    Child: 0,
    Infant: 0,
  });
  const handleChange = (newValue) => {
    setValue(newValue);
  };
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
          setSendMessage(true);
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
  const form = React.useRef();
  const handlePhoneChange = (newValue) => {
    setNumber(newValue);
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
        // onClose={handleClose}
        hideBackdrop={true}
        // disableScrollLock
        fullWidth
        sx={{
          backdropFilter: open ? 'blur(5px)' : 'unset',
          overflow: 'hidden',
          zIndex: '99999999',
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
        {sendMessage ? (
          <Grid
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '500px',
              //   justifyContent: 'center',
              mt: '70px',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='h2'
              sx={{
                fontFamily: "'Kaushan Script', cursive",
                color: '#5a8b7e',
              }}
            >
              Thank you!
            </Typography>
            <Grid sx={{ margin: '30px' }}>
              <Image
                src='/Assets/Images/Home/vecteezy_happy-funny-cute-kitty-fluffy-cat_16326393_341.png'
                height='210'
                width='170'
              />
            </Grid>
            <Typography
              variant='h6'
              sx={{
                fontFamily: "'Kaushan Script', cursive",
                color: '#5a8b7e',
              }}
            >
              We will get back to you soon!
            </Typography>
            <button onClick={handleClose} className={styles.buttonClose}>
              close
            </button>
          </Grid>
        ) : (
          <form ref={form} onSubmit={sendEmail} id='myForm'>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'row',
                transition: '0.3s ease-in',
              }}
            >
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
                        type='text'
                        name='email'
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
                      <TextField
                        type='text'
                        name='phone'
                        label='Phone Number'
                        fullWidth
                        fontSize='3px'
                        //   size='small'
                        id='outlined-basic'
                        variant='outlined'
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
                        <Grid item className={styles.dateInput}>
                          <input
                            className={styles.dateInput}
                            type='date'
                            name='fromDate'
                            id='date'
                            class='sign-inputs'
                            max='2999-12-31'
                          />
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
                          label='Adults'
                          name='adults'
                          fontSize='3px'
                          size='small'
                          id='outlined-basic'
                          variant='outlined'
                        />
                        <TextField
                          sx={{ width: '60px', fontSize: '3px' }}
                          label='Child'
                          name='child'
                          fontSize='3px'
                          size='small'
                          id='outlined-basic'
                          variant='outlined'
                        />
                        <TextField
                          sx={{ width: '60px', fontSize: '3px' }}
                          label='Infant'
                          name='infant'
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
                      <input
                        style={{ fontFamily: "'Comfortaa', sans-serif" }}
                        className={styles.buttonPkViewMore}
                        type='submit'
                        value='Get my Customized Package'
                      />
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
          </form>
        )}
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
