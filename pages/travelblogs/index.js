import React from 'react';
import { useTheme } from '@mui/material/styles';
import styles from '../../styles/TravelBlogs.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid, Typography } from '@mui/material';
import heroImage from '../../public/Assets/Images/Blogs/background.jpg';
import BlogBox from '../../Components/BlogBox';
// import BlogData from '../../Data/Blog.json';
import Image from 'next/image';
import Head from 'next/head';

const TravelBlogs = ({ blogData }) => {
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
        <HeroSection
          usedIn='Blogs'
          bgImage='background.jpg'
          Name={'Tips & How to’s '}
        />
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
            columnGap={10}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              margin: '10px 40px',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              // background: `url(${bg})`,
              // backgroundSize: '100vw 100vh',
            }}
          >
            {blogData.map((item) => {
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
import HeroSection from '../../Components/HeroSection';
export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), 'Data');
  //Read the json data file data.json
  const blogData = await fsPromises.readFile(
    jsonDirectory + '/Blog.json',
    'utf8'
  );
  return {
    props: { blogData: JSON.parse(blogData) },
  };
}
