import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import blogDatas from '../../Data/Blog.json';
import Image1 from '../../public/Assets/Images/Packages/3.jpg';
import styles from '../../styles/BlogDetails.module.css';

const index = ({ BlogsData }) => {
  const [blogData, setBlogData] = useState(BlogsData[0]);
  const setBlog = () => {
    BlogsData.map((item) => {
      item.id === router.query.id ? setBlogData(item) : null;
    });
  };
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;

    console.log(router, 'router in blog');
    // setPackageData(packageDataAll[router.query.id]);
    setBlog();
  }, [router.isReady]);
  return (
    <Grid>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          overflow: 'hidden',
          flexWrap: 'nowrap',
          pt: { md: '70px' },
        }}
      >
        <Grid
          item
          sx={{
            width: { xs: '100%', md: '40%' },
            margin: { xs: '40px 80px 0 10px', md: '140px 70px 0 20px' },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '27px', md: '35px' },
              letterSpacing: '-0.5px',
              lineHeight: { xs: '40px', md: '60.5px' },
              mb: '30px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: '900',
            }}
          >
            {blogData.Title}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Montserrat', sans-serif",
              fontStyle: 'italic',
              fontSize: { xs: '18px', md: '23px' },
              lineHeight: { xs: '', md: '35.15px' },
              fontWeight: '300',
              letterSpacing: '-0.5px',
              color: 'gray',
              padding: { xs: '0 20px 0 0', md: '' },
            }}
          >
            {blogData.shortDes}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            position: 'relative',
            display: 'flex',
            margin: '-120px -70px 0 0',
            height: { xs: '70vh', lg: '53vw' },
            ml: { xs: '-50px', md: '0px' },
            width: { xs: '130%', md: '60%' },
            overflow: 'hidden',
            // borderRadius: '46% 54% 44% 56% / 52% 33% 67% 48% ',
            borderRadius: '35% 36% 52% 48% / 56% 30% 46% 45% ',
          }}
        >
          <Image
            fill
            src={'/Assets/Images/Blogs/0/background.jpg'}
            style={{ borderRadius: '46% 54% 44% 56% / 52% 33% 67% 48% ' }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
      >
        {/* One for the left description of the blog */}
        <Grid item sx={{ display: 'flex', width: { xs: '100%', md: '67%' } }}>
          <Typography
            className={styles.span}
            sx={{
              fontSize: '19px',
              color: 'gray',
              p: { xs: '30px 20px 40px 20px', md: '0px 0 40px 70px' },
              fontFamily: "'Montserrat', sans-serif",
              whiteSpace: 'pre-wrap',
              lineHeight: '35px',
            }}
          >
            <span
              className={styles.span}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '19px',
              }}
              dangerouslySetInnerHTML={{ __html: [`${blogData.description}`] }}
            />
          </Typography>
        </Grid>
        {/* For the right section containg links */}
        <Grid item sx={{ display: 'flex', width: '30%' }}></Grid>
      </Grid>
    </Grid>
  );
};

export default index;
import path from 'path';
import fsPromises from 'fs/promises';
import slugify from 'slugify';
import { useRouter } from 'next/router';
export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), 'Data');
  //Read the json data file data.json
  const BlogsData = await fsPromises.readFile(
    jsonDirectory + '/Blog.json',
    'utf8'
  );
  return {
    props: {
      BlogsData: JSON.parse(BlogsData),
    },
  };
}
export async function getStaticPaths() {
  const paths = blogDatas.map((item) => {
    return {
      params: {
        blog: slugify(item.Title).toLowerCase(),
      },
    };
  });
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}
