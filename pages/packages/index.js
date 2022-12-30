import { Grid, Typography } from '@mui/material';
import styles from '../../styles/Packages.module.css';
import React, { useEffect } from 'react';
import packages from '../../public/Data/Packages.json';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PackageBox from '../../Components/PackageBox';
import heroImage from '../../public/Assets/Images/pexels-imad-clicks-8627807.jpg';
import imagesvg from '../../public/Assets/Images/gurez tree.jpg';
import Image from 'next/image';
import Head from 'next/head';
import handler, { getDetails } from '../api/details';
const Packages = ({ detailsData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });

  useEffect(() => {
    console.log(detailsData, 'packages');
  }, []);

  return (
    <>
      <Head>
        <title>Kashmir Packages</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Grid container>
        <Grid item className={styles.pkgHeroContainer} sx={{ height: '63vh' }}>
          <img style={{ width: isMobile ? '900px' : '100%' }} src={heroImage} />
        </Grid>
        <Typography
          variant='bold'
          className={styles.pkgTitle}
          sx={{
            fontSize: '39px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-110%)',
          }}
        >
          Packages
        </Typography>
        <Grid
          container
          sx={{
            m: '40px 0',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12} md={6} className={styles.pkgTextContainer}>
            <Grid>
              <Typography
                sx={{
                  fontSize: '40px',
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 700,
                }}
              >
                Overview
              </Typography>
            </Grid>
            <Typography sx={{ fontSize: '16px', color: 'gray', pt: '20px' }}>
              Christmas bells are about to ring and the countdown will begin for
              the New Year 2023. It is usual to celebrate the New Year because
              every new beginning comes with great energy and positivity.
              Looking at the clock and waiting for the tong is one of the most
              awaited moments of December 31st night. Get ready to indulge in
              festivities and celebrate the best New Year ever! With all-new
              hopes, goals, resolutions, feelings, and with Ek Karvaan.
            </Typography>
          </Grid>
          <Grid item className={styles.pkgImgContainer}>
            <Grid
              className={styles.pkgImgContainerInner}
              item
              sx={{
                height: { xs: '33vh', md: '44vh' },
                width: { xs: '79vw', md: '43vw' },
                borderRadius: '12px',
                mt: { xs: '40px', md: '20px' },
                overflow: 'hidden',
              }}
            >
              <img
                style={{ width: '100%', height: '100%', borderRadius: '12px' }}
                src={imagesvg}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mt: '50px' }}>
            <hr
              style={{
                color: 'black',
                backgroundColor: 'black',
                height: '1px',
                width: '87vw',
                mt: { xs: '10px', md: '30px' },
              }}
            />
          </Grid>
        </Grid>

        <Grid item sx={{ ml: { xs: '40px', md: '90px' }, overflow: 'hidden' }}>
          <Typography
            sx={{
              fontSize: '40px',
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 700,
            }}
          >
            Explore
          </Typography>
        </Grid>

        <Grid
          container
          columnGap={2}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: { xs: 'center', md: 'flex-start' },
            mt: '10px',
            m: { md: '10px 30px 0px 60px' },
          }}
        >
          {packages.map((item) => {
            return <PackageBox item={item} />;
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default Packages;

import path from 'path';
import fsPromises from 'fs/promises';
export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), 'Data');
  //Read the json data file data.json
  const detailsData = await fsPromises.readFile(
    jsonDirectory + '/Details.json',
    'utf8'
  );
  return {
    props: { detailsData: JSON.parse(detailsData) },
  };
}
