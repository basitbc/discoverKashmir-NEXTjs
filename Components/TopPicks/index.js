import { Grid, Typography } from '@mui/material';
import styles from '../../styles/TopPicks.module.css';
import React from 'react';
import path from 'path';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import slugify from 'slugify';

const TopPicks = ({ packagesData }) => {
  const handleClickPackage = (item) => {
    Router.push({
      pathname: `/packages/${slugify(item.packageName).toLowerCase()}`,
      query: { id: item.id },
    });
  };
  return (
    <Grid>
      <Grid
        sx={{
          // height: '20px',
          display: 'flex',

          margin: { md: '70px 0 0px 0px', xs: '10px 0 0 0' },
          width: { xs: '90vw', md: '340px' },
          // justifyContent: 'center',
          pl: '20px',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Headings,sans-serif',
            textTransform: 'uppercase',
            fontSize: '20px',
            letterSpacing: '1.1px',
            fontWeight: 700,
          }}
        >
          Top Picks
        </Typography>
      </Grid>
      <Grid
        item
        display={'flex'}
        flexDirection='column'
        className={styles.bgGridRight}
        sx={{
          minHeight: { xs: '230px', md: '230px' },
          width: { xs: '90vw', md: '340px' },
          padding: { xs: '5px 5px', md: '10px 10px' },
          margin: { md: '5px 0px', xs: '10px 0' },
        }}
      >
        {packagesData.slice(0, 4).map((item) => (
          <Grid
            onClick={() => {
              handleClickPackage(item);
            }}
            container
            display={'flex'}
            flexDirection='row'
            flexWrap={'nowrap'}
            bgcolor='white'
            sx={{ mb: '20px' }}
            // boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'

            className={styles.bgInBox}
          >
            <Grid
              item
              xs={4}
              className={styles.bgInnerBox}
              sx={{
                position: 'relative',
                height: { xs: '60px', md: '70px' },
                width: '130px',
                borderRadius: '14px',
                objectFit: 'cover',
                mr: '15px',
              }}
            >
              <Image
                className={styles.imageCont}
                src={'/Assets/Images/Packages/' + item.image}
                fill
                style={{
                  // height: '100%',
                  // width: '100%',
                  borderRadius: '14px',
                }}
              />
            </Grid>
            <Grid
              className={styles.textCont}
              item
              xs={7}
              sx={{
                display: 'inline-block',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  width: '100%',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  fontSize: { xs: '12px', md: '15px' },
                  fontWeight: '700',
                  fontFamily: 'Headings,',
                  letterSpacing: '0.3px',
                }}
              >
                {item.packageName}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '12px', md: '15px' },
                  fontWeight: '700',
                  fontFamily: 'Headings,',
                  letterSpacing: '0.3px',
                  textOverflow: 'ellipsis',
                  color: 'gray',
                }}
              >
                {item.duration}
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  fontSize: { xs: '12px', md: '15px' },
                  fontWeight: '700',
                  fontFamily: 'Headings,',
                  letterSpacing: '0.3px',
                  lineHeight: '24.5px',
                  textOverflow: 'ellipsis',
                  color: '#DC834E',
                  flexWrap: 'nowrap',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'line-through',
                  }}
                >
                  <CurrencyRupeeOutlinedIcon style={{ fontSize: '13px' }} />
                  {item.notPrice}/-
                </span>
                <span
                  style={{
                    paddingLeft: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <CurrencyRupeeOutlinedIcon style={{ fontSize: '13px' }} />
                  {item.price}/-
                </span>
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default TopPicks;
