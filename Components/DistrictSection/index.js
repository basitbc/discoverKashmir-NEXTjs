import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Router, { useRouter } from 'next/router';
import slugify from 'slugify';

import useMediaQuery from '@mui/material/useMediaQuery';
import styles from '../../styles/DistrictSection.module.css';
import Image from 'next/image';

const DistrictSection = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  const handleClick = (item) => {
    Router.push({
      pathname: `/destinations/${slugify(item.destinationName).toLowerCase()}`,
      query: { id: item.id },
    });
  };

  return (
    <Grid>
      <Grid
        sx={{
          padding: '40px 20px 20px 20px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            height: '37px',
            width: '10px',
            backgroundColor: '#DC834E',
            mr: '10px',
          }}
        ></Box>
        <Typography
          sx={{
            fontSize: { xs: '25px', md: '30px' },
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 700,
          }}
        >
          {props.name}
        </Typography>
      </Grid>
      <Grid className={styles.dsOuterContainer} rowGap={2}>
        {props.destinationData.map((item) => {
          return item.District.includes(props.name) ? (
            <Grid
              item
              margin={'0 10px'}
              className={styles.dsRightInnerBox}
              onClick={() => {
                handleClick(item);
              }}
              sx={{
                position: 'relative',
                height: { xs: '250px', md: '270px' },
                width: { xs: '330px', md: '310px' },
              }}
            >
              <Image
                fill
                className={styles.dsInnerRightImg}
                style={{
                  //   height: isMobile ? '250px' : '270px',
                  //   width: isMobile ? '330px' : '310px',
                  borderRadius: '7px',
                }}
                src={`/Assets/Images/Destinations/${item.District}/${item.Image}/cardImage.jpg`}
              />
              <Grid
                sx={{
                  position: 'relative',
                  top: { xs: '10%', md: '3%' },
                  left: '7%',
                }}
              >
                <Typography
                  fontFamily={"Headings,'Airal'"}
                  sx={{
                    color: 'white',
                    fontSize: '32px',
                  }}
                >
                  {item.destinationName}
                </Typography>

                {/* <Typography
                  sx={{
                    color: 'white',
                    fontFamily: "Headings,'Airal'",
                    letterSpacing: '0.7px',
                    lineHeight: '10px',
                  }}
                >
                  {item.District}
                </Typography> */}
              </Grid>
            </Grid>
          ) : null;
        })}
      </Grid>
    </Grid>
  );
};

export default DistrictSection;
