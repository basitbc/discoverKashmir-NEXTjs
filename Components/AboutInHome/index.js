import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect } from 'react';
import styles from '../../styles/AboutInHome.module.css';

const AboutInHome = (props) => {
  useEffect(() => {
    console.log(props.detailsData);
  }, []);

  return (
    <Grid
      container
      display={'flex'}
      className={styles.abhOuterContainer}
      justifyContent={'center'}
      alignItems='center'
      sx={{
        flexDirection: 'column',
        margin: { xs: '10px 0px', md: '30px 0px' },
      }}
    >
      <Grid item className={styles.abhInnerContainer1}>
        <Typography
          className={styles.abhTitle1}
          sx={{
            fontSize: { xs: '20px', md: '27px', lg: '30px' },
            fontFamily: "'TheaAmelia', 'sans-serif'",
            color: '#DC834E',
          }}
        >
          Explore Different Ways
        </Typography>
      </Grid>
      <Grid item className={styles.abhInnerContainer2}>
        <Typography
          className={styles.abhTitle2}
          sx={{
            fontSize: { xs: '34px', md: '50px', lg: '60px' },
            fontFamily: "Roboto, 'sans-serif'",
          }}
        >
          To Travel With Us
        </Typography>
      </Grid>
      <Grid
        container
        className={styles.abhInnerContainer}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // border: '1px solid black',
          justifyContent: 'center',
          alignItems: 'center',
          margin: { xs: '20px 0px', md: '30px 0px', lg: "50px 0px'" },
          // flexDirection: { md: 'row', xs: 'column' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          className={styles.abhInnerContainerLeft}
          item
          // xs={12}
          md={5}
          sx={{
            padding: { xs: '10px 10px', md: '17px 43px', lg: "20px 50px'" },
            margin: { xs: '0px 10px', md: '0px 17px', lg: "0px 20px'" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '15px', lg: '20px' },
              color: 'gray',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
            }}
          >
            "{props.detailsData.about1}"
          </Typography>
          <br />

          <Typography
            sx={{
              color: 'gray',
              fontSize: { xs: '15px', lg: '20px' },
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
            }}
          >
            "{props.detailsData.about2}"
          </Typography>
          {/* <img
            style={{ marginTop: '23px' }}
            src='https://ld-wp73.template-help.com/wordpress/prod_19731/v2/wp-content/uploads/2018/07/img-home-4.png'
          /> */}
          <Typography
            sx={{
              fontFamily: "'TheaAmelia', sans-serif",
              fontSize: { xs: '17px', md: '27px' },
              paddingTop: '23px',
            }}
          >
            SajadKralyari
          </Typography>
        </Grid>
        <Grid
          item
          // xs={12}
          md={6}
          // border='1px solid'
          //   className={styles.Abh-inner-container-right'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: { xs: '27px', md: '0px' },
            justifyContent: 'center',
          }}
        >
          <Grid
            item
            className={styles.abhImg}
            position='relative'
            sx={{
              height: { xs: '340px', md: '360px', lg: '459px' },
              width: { xs: '270px', md: '370px', lg: '365px' },
            }}
          >
            <Image
              className={styles.abhImage}
              // style={{
              //   height: '100%',
              //   width: '100%',
              // }}
              layout='fill'
              src={props.detailsData.aboutImageBack}
            />
          </Grid>
          <Grid
            item
            className={styles.abhImg}
            sx={{
              position: 'relative',
              height: { xs: '340px', md: '360px', lg: '459px' },
              width: { xs: '270px', md: '370px', lg: '365px' },
              left: '-23%',
              top: '7%',
              border: '4px solid white',
            }}
          >
            <Image
              className={styles.abhImage}
              layout='fill'
              src={props.detailsData.aboutImageFront}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutInHome;
