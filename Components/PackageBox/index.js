import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import styles from '../../styles/PackageBox.module.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';

const PackageBox = ({ item, usedIn }) => {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
  }, [router]);

  return (
    <Grid
      // container
      className={styles.pboxPackageBox}
      sx={{
        maxHeight: '470px',
        maxWidth: {
          xs: usedIn === 'home' ? '90%' : '100%',
          md: '410px',
        },
      }}
    >
      <Grid
        position='relative'
        className={styles.pboxImageContainer}
        sx={{ height: '250px', width: { xs: '100%', md: '410px' } }}
      >
        <Image
          fill
          className={styles.pboxImage}
          src={'/Assets/Images/Packages/' + item.image}
        />
      </Grid>
      <Grid
        item
        width={'90%'}
        margin='auto'
        className={styles.pboxDurationContainer}
        sx={{ position: 'relative', bottom: '7%' }}
      >
        <CalendarMonthIcon style={{ color: 'orange', marginRight: '12px' }} />
        <Typography sx={{ color: 'GrayText' }} className={styles.durationText}>
          <b>{item.duration}</b>
        </Typography>
      </Grid>
      <Grid container sx={{ padding: '0 30px' }}>
        <Grid
          item
          className={styles.pboxNameContainer}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 500,
            }}
            className={styles.pboxName}
          >
            {item.packageName}
          </Typography>
          <Typography fontSize={'17px'} className={styles.pboxLocation}>
            <PlaceIcon style={{ marginRight: '10px', color: 'gray' }} />
            {item.location}
          </Typography>
        </Grid>
        <hr className={styles.pboxLine} />
        <Grid
          container
          className={styles.pboxPriceContainer}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography className={styles.pboxFrom}>From</Typography>
            <Typography className={styles.pboxPrice} fontSize={'21px'}>
              ₹ {item.price} /-
            </Typography>
          </Grid>

          <Grid
            item
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              mt: '20px',
            }}
          >
            <Button
              className={styles.pboxButtonContainer}
              variant='text'
              onClick={() => {
                Router.push({
                  pathname: '/packagedetails',
                  query: { id: item.id },
                });
              }}
            >
              <Typography
                sx={{
                  textDecoration: 'none',
                  fontFamily: "'Comfortaa', cursive",
                  color: 'black',
                }}
              >
                <span
                  className={styles.pboxButtonEx}
                  style={{
                    textDecoration: 'none',

                    textTransform: 'capitalize',
                  }}
                >
                  Explore
                  <ArrowRightAltIcon sx={{ ml: '5px' }} />
                </span>
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PackageBox;
