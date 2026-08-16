import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/PackageBox.module.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Router from 'next/router';
import Image from 'next/image';
import { useSiteSettings } from '../../context/SiteSettingsContext';

const PackageBox = ({ item, usedIn }) => {
  const { whatsappNumber } = useSiteSettings();

  // The slug is stored on the record now, so it is no longer re-derived from
  // the name — and no ?id= is needed, because the detail page looks the record
  // up by slug rather than picking it client-side.
  const handleClick = () => {
    Router.push(`/packages/${item.slug}`);
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
        {item.cardImage ? (
          <Image
            fill
            className={styles.pboxImage}
            src={item.cardImage}
            alt={item.packageName}
          />
        ) : null}
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
                // Number comes from site settings so staff can change it in the
                // admin instead of it being hardcoded here.
                const phoneNumber = (whatsappNumber || '').replace(/[^0-9]/g, '');
                const message = encodeURIComponent(
                  `Hello! I would like to know more about ${item.packageName}.`
                );
                window.open(
                  `https://wa.me/${phoneNumber}?text=${message}`,
                  '_blank',
                  'noopener,noreferrer'
                );
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
                  WhatsApp
                  <ArrowRightAltIcon sx={{ ml: '5px' }} />
                </span>
              </Typography>
            </Button>
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
              onClick={handleClick}
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
