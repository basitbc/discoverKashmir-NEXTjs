import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import styles from '../../styles/packagesSection.module.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PackageBox from '../PackageBox';
import Router from 'next/router';

const packagesSection = ({ packagesData }) => {
  useEffect(() => {
    console.log(packagesData, 'home');
  }, []);

  return (
    <>
      <Grid
        container
        className={styles.pkOuterContainer}
        sx={{
          flexDirection: 'column',
          margin: { xs: '60px 0 20px 0', md: '30px 0 20px 0' },
        }}
      >
        <Grid item className={styles.pkInnerContainer1}>
          <Typography
            className={styles.pkTitle1}
            sx={{
              fontSize: { xs: '20px', md: '27px', lg: '30px' },

              fontFamily: "'TheaAmelia', 'cursive'",
              color: '#DC834E',
            }}
          >
            Make it memoriable
          </Typography>
        </Grid>
        <Grid item className={styles.pkInnerContainer2}>
          <Typography
            className={styles.pkTitle2}
            sx={{
              fontSize: { xs: '34px', md: '50px', lg: '60px' },
              fontFamily: "Roboto, 'sans-serif'",
            }}
          >
            Choose Best for You
          </Typography>
        </Grid>
        <Grid
          container
          rowGap={2}
          columnGap={2}
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'unset' },
            justifyContent: { xs: 'center', md: 'space-evenly' },
            flexWrap: 'wrap',
          }}
          className={styles.pkInnerContainer3}
        >
          {packagesData.slice(0, 3).map((item) => {
            return <PackageBox item={item} usedIn={'home'} />;
          })}
        </Grid>
      </Grid>
      <button
        className={styles.buttonPkViewMore}
        onClick={() => {
          Router.push({
            pathname: '/packages',
          });
        }}
      >
        View All Tours <ArrowRightAltIcon />
      </button>
    </>
  );
};

export default packagesSection;
