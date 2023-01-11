import { Grid, Typography } from '@mui/material';
import React from 'react';
import '../../styles/BlogBox.module.css';
import Router from 'next/router';
import slugify from 'slugify';
import styles from '../../styles/BlogBox.module.css';
import Image from 'next/image';
const BlogBox = ({ item }) => {
  const handleClick = (item) => {
    Router.push({
      pathname: `/travelblogs/${slugify(item.Title).toLowerCase()}`,
      query: { id: item.id },
    });
  };
  return (
    <Grid
      container
      className={styles.boxBg}
      sx={{
        height: '30vh',
        maxWidth: { xs: '640px', md: '25vw' },
        // border: '1px solid',
        borderRadius: '12px',
        flexWrap: 'wrap',
        background: `url(/Assets/Images/Blogs/${item.Image}/cardImage.jpg)`,
        // /Assets/Images/Blogs/1/cardImage.jpg
        // {'/Assets/Images/Packages/' + item.image}
        backgroundSize: '100% 100%',
        overflow: 'hidden',
        padding: '10px 40px',
        cursor: 'pointer',
        // overflow: 'hidden',
      }}
      onClick={() => {
        handleClick(item);
      }}
    >
      <Typography
        variant='h6'
        className={styles.textBg}
        sx={{
          position: 'relative',
          display: 'inline',
          top: '10px',
          left: '10px',
        }}
      >
        <span
          style={{
            fontSize: '1.3vw',
            backgroundColor: 'white',
            boxDecorationBreak: 'clone',
            fontSize: { xs: '20px', md: '' },
          }}
        >
          {item.Title}
        </span>
      </Typography>
      {/* <img
        style={{
          position: 'initial',
          top: '0',
          left: '0',
          height: '100%',
          width: '100%',
          borderRadius: '12px',
        }}
        src={item.Image}
      /> */}
    </Grid>
  );
};

export default BlogBox;
