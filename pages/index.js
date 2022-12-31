import Head from 'next/head';
import { Inter } from '@next/font/google';
import React, { useEffect, useState } from 'react';
import { Button, Fab, Grid, Typography } from '@mui/material';
import Router, { useRouter } from 'next/router';
import HeroCarousel from '../Components/HeroCarousel';
import styles from '../styles/Home.module.css';
import AboutInHome from '../Components/AboutInHome';
import PackagesSection from '../Components/PackagesSection';
import DestinationSection from '../Components/DestinationSection';
import BlogInHome from '../Components/BlogInHome';
import LocationsInHome from '../Components/LocationsInHome';
import TestimonialHome from '../Components/TestimonialHome';

const inter = Inter({ subsets: ['latin'] });
export default function Home({ detailsData, packagesData }) {
  <Head>
    <link
      rel='stylesheet'
      href='https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.css'
    />
    <link
      rel='stylesheet'
      href='https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.theme.min.css'
    />
    <link
      href='https://fonts.googleapis.com/css?family=Montserrat Alternates'
      rel='stylesheet'
    />
    <link rel='apple-touch-icon' href='%PUBLIC_URL%/logo192.png' />
    <link
      rel='stylesheet'
      href='https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css'
      integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
      crossOrigin='anonymous'
    ></link>
    <link rel='icon' href='/favicon.ico' />
  </Head>;
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    console.log(packagesData, 'in index');
  }, [router]);

  return (
    <div>
      <Head>
        <title>Discover Kashmir | Best Travel Company in Kashmir </title>
        <meta
          name='description'
          content='Discover Kashmir is one of the best travel company in kashmir know for its economic and best costomizable tour packages.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />{' '}
      </Head>

      <Grid container sx={{ overflow: 'hidden' }}>
        <Grid
          container
          className={styles.OuterContainer}
          width='100vw'
          sx={{ margin: '0 0 30px 0' }}
        >
          <Grid
            sx={{
              display: 'flex',
              zIndex: '2',
              flexDirection: 'column',
              position: 'absolute',
              top: '50%' /* Position Y halfway in */,
              left: '50%' /* Position X halfway in */,
              transform: 'translate(-50%,-70%)',
              margin: 'auto',
              // top: '30%',
              // left: { xs: '21%', md: '37%' },
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '15px', lg: '24px' },
                color: 'white',
                marginLeft: { xs: '-60px', lg: '-150px' },
                lineHeight: '0',
                fontFamily: "Lato, 'cursive'",
                fontWeight: 900,
              }}
            >
              Escape. Explore. &
            </Typography>
            <Typography
              className={styles.textDis}
              sx={{
                fontSize: { xs: '37px', lg: '70px' },
                color: 'black',
                overflow: 'hidden',
                fontFamily: "'Lato', sans-serif",
                fontWeight: 100,
              }}
            >
              DISCOVER
            </Typography>
            <Typography
              className={styles.textKmr}
              sx={{
                fontSize: { xs: '23px', lg: '50px' },
                color: 'white',
                lineHeight: '0',
                marginRight: { xs: '-60px', lg: '-130px' },
                letterSpacing: '7.0px',
                // overflow: { xs: 'auto', md: 'visible' },
                fontFamily: "'Raleway', cursive",
                fontWeight: 900,
              }}
            >
              Kashmir
            </Typography>

            <Grid>
              <button
                onClick={() => {
                  Router.push({
                    pathname: '/packages',
                  });
                }}
                className={styles.heroButton}
                zIndex='2'
                style={{ fontFamily: "Lato, 'cursive'" }}
              >
                Get Best Deals
              </button>
            </Grid>
          </Grid>
          <HeroCarousel />
        </Grid>
        <AboutInHome detailsData={detailsData} />
        <PackagesSection packagesData={packagesData} />
        <DestinationSection />
        <BlogInHome />
        <LocationsInHome />
        <TestimonialHome />
      </Grid>
    </div>
  );
}

//useSWR allows the use of SWR inside function components
import useSWR from 'swr';

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format

import path from 'path';
import fsPromises from 'fs/promises';
export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), 'Data');
  //Read the json data file data.json
  const detailsData = await fsPromises.readFile(
    jsonDirectory + '/Details.json',
    'utf8'
  );
  const packagesData = await fsPromises.readFile(
    jsonDirectory + '/Packages.json',
    'utf8'
  );
  return {
    props: {
      detailsData: JSON.parse(detailsData),
      packagesData: JSON.parse(packagesData),
    },
  };
}
