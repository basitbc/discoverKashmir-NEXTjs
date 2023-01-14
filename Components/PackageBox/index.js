import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import styles from '../../styles/PackageBox.module.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import slugify from 'slugify';
import Image from 'next/image';

const PackageBox = ({ item, usedIn }) => {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    console.log(item, 'item in box');
    console.log(router, 'router in box');
  }, [router]);
  const handleClick = (item) => {
    Router.push({
      pathname: `/packages/${slugify(item.packageName).toLowerCase()}`,
      query: { id: item.id },
    });
  };

  return (
    <Grid
      item
      className={styles.pboxPackageBox}
      sx={{
        flexDirection: 'column',
        height: '470px',
        margin: '30px 0',
        width: {
          xs: '90%',
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
              fontFamily: "'Comfortaa',sans-serif",
              fontWeight: 700,
            }}
            className={styles.pboxName}
          >
            {item.packageName}
          </Typography>
          <Typography
            sx={{ fontFamily: "'Comfortaa',sans-serif" }}
            fontSize={'17px'}
            className={styles.pboxLocation}
          >
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
            <Typography
              sx={{ fontFamily: "'Comfortaa',sans-serif" }}
              className={styles.pboxFrom}
            >
              From
            </Typography>
            <Typography
              sx={{ fontFamily: "'Comfortaa',sans-serif" }}
              className={styles.pboxPrice}
              fontSize={'21px'}
            >
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
                handleClick(item);
              }}
            >
              <Typography
                sx={{
                  textDecoration: 'none',
                  fontFamily: "'Comfortaa',sans-serif",
                  color: 'black',
                }}
              >
                <span
                  className={styles.pboxButtonEx}
                  style={{
                    textDecoration: 'none',
                    fontFamily: "'Comfortaa',sans-serif",
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
