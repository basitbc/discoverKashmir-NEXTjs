import { Grid, Typography } from '@mui/material';
import React from 'react';
import '../../styles/BlogBox.module.css';
import Router from 'next/router';
import styles from '../../styles/BlogBox.module.css';

const BlogBox = ({ item }) => {
  // Slug is stored on the record; no ?id= because the detail page resolves by
  // slug rather than picking the record client-side.
  const handleClick = () => {
    Router.push(`/travelblogs/${item.slug}`);
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
        background: item.cardImage ? `url(${item.cardImage})` : '#ddd',
        backgroundSize: '100% 100%',
        overflow: 'hidden',
        padding: '10px 40px',
        cursor: 'pointer',
      }}
      onClick={handleClick}
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
          {item.title}
        </span>
      </Typography>
    </Grid>
  );
};

export default BlogBox;
