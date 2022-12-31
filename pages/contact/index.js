import { Dialog, Grid, Slide, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from '../../styles/Contact.module.css';
import { useRef } from 'react';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ContactUs = ({ detailsData, contactData }) => {
  const theme = useTheme();
  const [open, setopen] = useState(false);
  const bkcolor = 'white';
  const [ischecked, setisChecked] = useState(true);
  const router = useRouter();
  const packageName = router.query.packageName;
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
  });

  const handleOpen = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    sendForm(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      form.current,
      'YOUR_PUBLIC_KEY'
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

  const styleTypo = {
    fontFamily: "Roboto, 'cursive'",
    fontSize: '1.2vw',
    fontWeight: '500',
    flexWrap: 'wrap',
  };
  const form = useRef();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });

  return (
    <div>
      <Head>
        <title>Get in Touch - Discover Kashmir</title>
        <meta name='description' content='Generated by create next app' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />{' '}
      </Head>
      <Grid container>
        <Grid
          item
          position='relative'
          className={styles.cnHeroContainer}
          sx={{ height: '63vh', width: '100vw' }}
        >
          <Image
            // className={styles.abhImage}
            fill
            src={'/' + contactData.backgroundImage}
          />
        </Grid>
        <Typography
          variant='bold'
          className={styles.cnTitle}
          sx={{
            fontSize: { xs: '21px', md: '39px' },
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-110%)',
          }}
        >
          Contact
        </Typography>
        <Grid
          container
          sx={{ display: 'flex', flexDirection: 'row', width: '100vw' }}
        >
          <Grid
            item
            className={styles.cnInnerContainerLeft}
            sx={{ width: '40vw' }}
          >
            <Grid
              className={styles.cnLeftContainer}
              container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: { md: '439px' },
                width: { md: '27vw' },
                flexWrap: 'wrap',
              }}
            >
              <Grid
                item
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  m: '10px 0',
                  width: '100%',
                }}
              >
                <Grid sx={{ mr: '27px' }}>
                  <NearMeOutlinedIcon
                    style={{ color: 'orange', fontSize: '30px' }}
                  />
                </Grid>
                <Grid item sx={{ height: '100%', width: '100%' }}>
                  <Typography sx={styleTypo}>Address</Typography>
                  <Typography sx={{ color: 'GrayText', fontSize: '1vw' }}>
                    {detailsData.address}
                  </Typography>
                </Grid>
              </Grid>
              <hr
                style={{
                  height: '1px',
                  color: 'gray',
                  background: 'black',
                  width: '100%',
                }}
              />
              <Grid
                item
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  m: '10px 0',
                  width: '100%',
                }}
              >
                <Grid sx={{ mr: '27px' }}>
                  <LocalPhoneOutlinedIcon
                    style={{ color: 'orange', fontSize: '30px' }}
                  />
                </Grid>
                <Grid>
                  <Typography sx={styleTypo}>
                    {detailsData.phoneNumber}
                  </Typography>
                </Grid>
              </Grid>
              <hr
                style={{
                  height: '1px',
                  color: 'gray',
                  background: 'black',
                  width: '100%',
                }}
              />
              <Grid
                item
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  m: '10px 0',
                  width: '100%',
                }}
              >
                <Grid sx={{ mr: '27px' }}>
                  <WhatsAppIcon style={{ color: 'orange', fontSize: '30px' }} />
                </Grid>
                <Typography sx={styleTypo}>
                  {detailsData.phoneNumber}
                </Typography>
              </Grid>
              <hr
                style={{
                  height: '1px',
                  color: 'gray',
                  background: 'black',
                  width: '100%',
                }}
              />
              <Grid
                item
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  m: '10px 0',
                  width: '100%',
                }}
              >
                <Grid sx={{ mr: '27px' }}>
                  <EmailOutlinedIcon
                    style={{ color: 'orange', fontSize: '30px' }}
                  />
                </Grid>
                <Grid sx={styleTypo}>{detailsData.email}</Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            className={styles.cnInnerContainerRight}
            sx={{ width: '50vw' }}
          >
            <Grid container className={styles.cnRightContainer}>
              <Grid item>
                <Typography
                  sx={{ fontSize: '30px', fontWeight: '700', pb: '10px' }}
                >
                  Send Us a message
                </Typography>
                <Typography sx={{ fontSize: '16px', color: 'gray' }}>
                  We would love to hear from you
                </Typography>
              </Grid>
              <form ref={form} onSubmit={sendEmail}>
                <Grid
                  container
                  rowGap={2}
                  sx={{ justifyContent: 'space-between', mt: '30px' }}
                >
                  <Grid item xs={12}>
                    <TextField
                      name='name'
                      fullWidth
                      required
                      id='outlined-required'
                      label='Name'
                      placeholder='Your Name'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id='outlined-basic'
                      label='Email'
                      variant='outlined'
                      type='email'
                      name='email'
                      placeholder='Your Email'
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id='outlined-multiline-static'
                      required
                      name='message'
                      label='Message'
                      multiline
                      rows={4}
                      placeholder='Write Your Message...'
                    />
                  </Grid>
                </Grid>
                <input className={styles.cnButton} type='submit' value='Send' />
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactUs;

import path from 'path';
import fsPromises from 'fs/promises';
import Head from 'next/head';
import { sendForm } from '@emailjs/browser';
import dynamic from 'next/dynamic';
export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), 'Data');
  //Read the json data file data.json
  const detailsData = await fsPromises.readFile(
    jsonDirectory + '/Details.json',
    'utf8'
  );
  const contactData = await fsPromises.readFile(
    jsonDirectory + '/Contact.json',
    'utf8'
  );
  return {
    props: {
      detailsData: JSON.parse(detailsData),
      contactData: JSON.parse(contactData),
    },
  };
}
