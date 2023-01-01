import React from 'react';
import { CardMedia, Grid, Typography } from '@mui/material';
import testimonialsData from '../../Data/Testimonials.json';
import Carousel from 'react-bootstrap/Carousel';
import { Alert, CCarousel, CCarouselItem } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from '../../styles/TestimonialHome.module.css';
import Image from 'next/image';

export default function TestimonialHome() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  return (
    <Grid
      container
      sx={{
        // height: '90vh',
        border: '1px sold black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '30px 0px 10px 0',
      }}
    >
      <Grid item className={styles.thInnerContainer1}>
        <Typography
          className={styles.thTitle1}
          sx={{
            fontSize: { xs: '20px', md: '27px', lg: '30px' },
            fontFamily: "'TheaAmelia', 'cursive'",
            color: '#DC834E',
          }}
        >
          Some memoriable Experiences
        </Typography>
      </Grid>
      <Grid item className={styles.thInnerContainer2}>
        <Typography
          className={styles.thTitle2}
          sx={{
            fontSize: { xs: '34px', md: '50px', lg: '60px' },
            fontFamily: "Roboto, 'sans-serif'",
          }}
        >
          People Had With Us
        </Typography>
      </Grid>

      <CCarousel controls dark transition='crossfade'>
        {testimonialsData.map((item) => {
          return (
            <CCarouselItem>
              <Grid
                sx={{
                  backgroundColor: 'white',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  flexDirection: { xs: 'column', md: 'row' },
                  width: '100vw',
                  // border: '1px solid black',
                  padding: {
                    xs: '30px 0px 20px 0px',
                    md: '40px 10px 40px 80px',
                    lg: '80px 40px',
                  },
                }}
              >
                <Grid item lg={4}>
                  <img
                    style={{
                      height: isMobile ? '200px' : '270px',
                      width: isMobile ? '340px' : '440px',
                      marginBottom: isMobile ? '27px' : '0px',
                      borderRadius: '12px',
                      boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;',
                    }}
                    src={item.image}
                    alt='My Photo'
                  />
                </Grid>
                <Grid
                  item
                  lg={5}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: { xs: '0px 10px', md: '0px 40px', lg: '0px' },
                  }}
                >
                  <i
                    className='fa fa-quote-left'
                    style={{ fontSize: '24px', color: 'gray' }}
                  ></i>
                  <Typography
                    sx={{
                      fontSize: { xs: '10px', md: '17px' },
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      padding: '0 20px',
                      color: 'GrayText',
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Grid
                    item
                    sx={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <i
                      className='fa fa-quote-right'
                      style={{
                        fontSize: '24px',
                        color: 'gray',
                      }}
                    ></i>
                  </Grid>
                  <Grid item sx={{}}>
                    <Typography
                      variant='h5'
                      sx={{ fontFamily: 'PTSans', paddingLeft: '20px' }}
                    >
                      {item.Name}
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{
                        fontFamily: 'PTSans',
                        paddingLeft: '20px',
                        color: 'gray',
                      }}
                    >
                      {item.Place}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CCarouselItem>
          );
        })}
      </CCarousel>
    </Grid>
  );
}
