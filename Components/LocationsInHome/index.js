import { Grid, Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/LocationsInHome.module.css';
import destinationData from '../../Data/Destinations.json';
import blogData from '../../Data/Blog.json';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';

const LocationsInHome = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  return (
    <Grid
      container
      className={styles.lhOuterContainer}
      sx={{
        display: 'flex',
        margin: { xs: '16px 10px', md: '50px 10px' },
        flexDirection: { xs: 'column-reverse', md: 'row' },
        height: { md: '432px' },
        width: '100vw',
      }}
    >
      <Grid
        item
        md={4.5}
        className={styles.lhLeftContainer}
        sx={{ width: { xs: '100vw' }, marginTop: { xs: '30px', md: '2px' } }}
      >
        {blogData.slice(0, 4).map((item) => (
          <Grid
            item
            className={styles.lhLeftInnerBox}
            sx={{
              height: { xs: '84px', md: '104px' },
              m: { xs: '0 20px 7px 0', md: '0 10px 0 0' },
              justifyContent: 'flex-start',
            }}
          >
            <img
              className={styles.lhImage}
              style={{
                height: isMobile ? '66px' : '84px',
                width: isMobile ? '99px' : '126px',
                borderRadius: '12px',
                marginRight: '20px',
              }}
              src={item.Image}
              alt='imageOf'
            />
            <Typography
              className={styles.text11}
              sx={{
                fontSize: { xs: '17px', lg: '21px' },
                fontWeight: '700',
                fontFamily: 'Headings,',
                letterSpacing: '-0.3px',
                lineHeight: { xs: '', md: '32.5px' },
                textOverflow: 'ellipsis',
                wordWrap: 'break-word',
                overflow: 'hidden',
                whiteSpace: 'pre-wrap',
              }}
            >
              {item.Title}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        md={7.5}
        className={styles.lhRightContainer}
        sx={{ overflow: 'auto', width: '100vw' }}
      >
        {destinationData.slice(0, 10).map((item) => (
          <Grid
            item
            margin={'0 10px'}
            className={styles.lhRightInnerBox}
            sx={{
              height: { xs: '250px', md: '432px' },
              width: { xs: '226px', md: '249px' },
            }}
          >
            <img
              className={styles.lhInnerRightImg}
              style={{
                height: isMobile ? '250px' : '432px',
                width: isMobile ? '226px' : '249px',
                borderRadius: '7px',
              }}
              src={item.HomeImage}
            />
            <Grid
              sx={{
                position: 'relative',
                bottom: { xs: '30%', md: '17%' },
                left: '10%',
              }}
            >
              <Typography
                fontFamily={"Headings,'Airal'"}
                sx={{
                  color: 'white',
                  fontSize: '26px',
                }}
              >
                {item.DistinationName}
              </Typography>

              <Typography
                sx={{
                  color: 'white',
                  letterSpacing: '0.7px',
                  lineHeight: '10px',
                }}
              >
                Srinagar
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default LocationsInHome;
