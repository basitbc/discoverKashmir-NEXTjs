import { Grid, Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/BlogInHome.module.css';
import blogData from '../../Data/blog.json';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';

const BlogInHome = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  return (
    <Grid
      container
      className={styles.bgContainer}
      sx={{
        margin: '20px 0 30px 0',
        flexDirection: { xs: 'column', md: 'row' },
        padding: { xs: '20px 0 0 0', md: '' },
        minHeight: {
          xs: '70vh',
          md: '480px',
        },
        backgroundSize: { xs: '100vw 598px', md: '100vw 480px' },
        overflow: 'hidden',
        flexWrap: 'nowrap',
      }}
    >
      <Grid item>
        <Grid
          container
          className={styles.bgGridLeft}
          spacing={isMobile ? 0 : 2}
          sx={{ flexDirection: 'column' }}
        >
          <Grid item>
            <Typography
              sx={{
                color: 'black',
                fontFamily: "Roboto, 'cursive'",
                fontWeight: 500,
                fontSize: { xs: '16px', md: '24px' },
                marginLeft: '10px',
                lineHeight: '1px',
                wordSpacing: '0px',
              }}
            >
              It's easy to do better
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                color: '#c89666',
                fontFamily: "Roboto, 'cursive'",
                fontSize: { xs: '52.5px', md: '75px' },
                fontWeight: 700,
                lineHeight: { md: '67px' },
                wordSpacing: '0px',
              }}
            >
              Sustainable
            </Typography>
            <Typography
              sx={{
                color: 'black',
                fontFamily: "Headings, 'cursive'",
                fontSize: { xs: '52.5px', md: '75px' },
                lineHeight: { xs: '10px', md: '67px' },
                paddingBottom: { xs: '34px', md: '0px' },
                wordSpacing: '0px',
              }}
            >
              Travel
            </Typography>
          </Grid>
          <Grid item sx={{ width: '350px', flexWrap: 'nowrap' }}>
            <Typography
              sx={{
                color: 'black',
                fontFamily: "'Lato', sans-serif'",
                fontWeight: 500,
                fontSize: { xs: '12px', md: '14px' },
                lineHeight: '23.1px',
                letterSpacing: '0.42px',
                fontWeight: '200',
              }}
            >
              Sustainable travel means traveling slow, with different transport,
              packing eco-friendly, stay local and much more!
            </Typography>
          </Grid>
          <Grid item>
            {!isMobile ? (
              <button
                style={{ fontFamily: "Headings, 'cursive'" }}
                className={styles.bgButton}
              >
                More Travel Experiences
              </button>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        display={'flex'}
        flexDirection='column'
        className={styles.bgGridRight}
        sx={{
          height: { xs: '270px', md: '320px' },
          width: { xs: '90vw', md: '400px' },
          padding: { xs: '5px 10px', md: '10px 20px' },
          margin: { md: '0px', xs: '10px 0' },
        }}
      >
        {blogData.slice(0, 3).map((item) => (
          <Grid
            container
            display={'flex'}
            alignItems='center'
            flexDirection='row'
            flexWrap={'nowrap'}
            bgcolor='white'
            boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
            className={styles.bgInBox}
          >
            <Grid
              item
              xs={4}
              className={styles.bgInnerBox}
              sx={{
                height: { xs: '60px', md: '72px' },
                width: '108px',
                borderRadius: '14px',
                // border: '3px solid',
                objectFit: 'cover',
                mr: '15px',
              }}
            >
              <img
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: '14px',
                }}
                src={item.Image}
              />
            </Grid>
            <Grid
              item
              xs={8}
              sx={{
                height: '55px',
                textOverflow: 'ellipsis',
                // border: '1px solid red',
                overflow: 'hidden',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '14px', md: '18px' },
                  fontWeight: '700',
                  fontFamily: 'Headings,',
                  letterSpacing: '0.3px',
                  lineHeight: '27.5px',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.Title}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      {isMobile ? (
        <Grid item>
          <button
            style={{ fontFamily: "Headings, 'cursive'", margin: '10px' }}
            className={styles.bgButton}
          >
            More Travel Experiences
          </button>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default BlogInHome;
