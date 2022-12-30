import { Grid, Typography } from '@mui/material';
import React from 'react';
import '../../styles/BlogBox.module.css';

const BlogBox = ({ item }) => {
  return (
    <Grid
      container
      className='box-bg'
      sx={{
        height: '30vh',
        maxWidth: { xs: '640px', md: '25vw' },
        // border: '1px solid',
        borderRadius: '12px',
        flexWrap: 'wrap',
        background: `url(${item.Image})`,
        backgroundSize: '100% 100%',
        overflow: 'hidden',
        padding: '10px 40px',
        // overflow: 'hidden',
      }}
    >
      <Typography
        variant='h6'
        className='text-bg'
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
