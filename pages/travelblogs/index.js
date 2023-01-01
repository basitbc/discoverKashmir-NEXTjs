import React from 'react';
import { useTheme } from '@mui/material/styles';
import styles from '../../styles/TravelBlogs.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid, Typography } from '@mui/material';
import heroImage from '../../public/Assets/Images/Blogs/background.jpg';
import BlogBox from '../../Components/BlogBox';
import BlogData from '../../Data/Blog.json';
import Image from 'next/image';
import Head from 'next/head';

const TravelBlogs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  return (
    <div>
      <Head>
        <title>Travel Blogs | Discover Kashmir</title>
        <meta name='description' content='Generated by create next app' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />{' '}
      </Head>
      <Grid container>
        <Grid
          item
          position='relative'
          className={styles.trbHeroContainer}
          sx={{ height: '63vh' }}
        >
          <Image
            fill
            priority
            // style={{ width: isMobile ? '900px' : '100%' }}
            src={heroImage}
          />
        </Grid>
        <Typography
          variant='bold'
          className={styles.trbTitle}
          sx={{
            fontSize: { xs: '21px', md: '39px' },
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-110%)',
          }}
        >
          Tips & How to’s
        </Typography>
        <Grid container>
          <Typography
            sx={{
              fontSize: { xs: '25px', md: '40px' },
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 700,
              padding: { xs: '30px 40px', md: '30px 70px' },
            }}
          >
            Travel Experiences
          </Typography>
          <Grid
            container
            rowGap={4}
            columnGap={1}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              margin: '10px 40px',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              // background: `url(${bg})`,
              // backgroundSize: '100vw 100vh',
            }}
          >
            {BlogData.map((item) => {
              return <BlogBox item={item} />;
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TravelBlogs;

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
