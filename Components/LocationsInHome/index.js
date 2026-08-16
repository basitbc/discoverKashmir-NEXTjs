import { Grid, Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/LocationsInHome.module.css';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import Router from 'next/router';

const LocationsInHome = ({ destinationData = [], blogData = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  const handleClick = (item) => {
    Router.push({
      pathname: `/travelblogs/${item.slug}`,
    });
  };

  const handleClickLocation = (item) => {
    Router.push({
      pathname: `/destinations/${item.slug}`,
    });
  };
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
            onClick={() => {
              handleClick(item);
            }}
            className={styles.lhLeftInnerBox}
            sx={{
              height: { xs: '84px', md: '104px' },
              m: { xs: '0 20px 7px 0', md: '0 10px 0 0' },
              justifyContent: 'flex-start',
            }}
          >
            <Grid
              className={styles.lhImage}
              sx={{
                position: 'relative',
                minHeight: isMobile ? '66px' : '84px',
                minWidth: isMobile ? '99px' : '126px',
                borderRadius: '12px',
                marginRight: '20px',
              }}
            >
              <Image
                className={styles.lhImg}
                fill
                style={{
                  // height: isMobile ? '66px' : '84px',
                  // width: isMobile ? '99px' : '126px',
                  borderRadius: '12px',
                  // marginRight: '20px',
                }}
                src={item.cardImage || ''}
                alt={item.title}
                alt='imageOf'
              />
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                textAlign: 'start',
                alignItems: 'start',
              }}
            >
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
                {item.title}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        md={7.5}
        className={styles.lhRightContainer}
        sx={{ overflow: 'scroll', width: '100vw' }}
      >
        {destinationData.slice(0, 10).map((item) => (
          <Grid
            item
            margin={'0 10px'}
            className={styles.lhRightInnerBox}
            sx={{
              height: { xs: '250px', md: '432px' },
              minWidth: { xs: '226px', md: '249px' },
              position: 'relative',
            }}
            onClick={() => {
              handleClickLocation(item);
            }}
          >
            <Image
              className={styles.lhInnerRightImg}
              fill
              style={{
                // height: isMobile ? '250px' : '432px',
                // width: isMobile ? '226px' : '249px',
                borderRadius: '7px',
              }}
              src={item.cardImage || ''}
              alt={item.destinationName}
            />
            <Grid
              sx={{
                position: 'absolute',
                bottom: { xs: '10%', md: '10%' },
                left: '10%',
              }}
            >
              <Typography
                fontFamily={"Headings,'Airal'"}
                sx={{
                  color: 'white',
                  fontSize: { xs: '17px', md: '26px' },
                }}
              >
                {item.destinationName}
              </Typography>

              <Typography
                sx={{
                  color: 'white',
                  letterSpacing: '0.7px',
                  lineHeight: '10px',
                  fontSize: { xs: '13px', md: '19px' },
                }}
              >
                {item.district?.name}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default LocationsInHome;
