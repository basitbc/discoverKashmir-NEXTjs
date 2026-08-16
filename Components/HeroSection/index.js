import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from '../../styles/HeroSection.module.css';
import Image from 'next/image';
import BreadCrumb from '../Breadcrumb/BreadCrumb';

const HeroSection = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });

  // Content from the API supplies a complete path (or a Blob URL) via `src`.
  // The usedIn/bgImage pair is kept for the static pages that still hardcode
  // a filename, e.g. HeroSection usedIn='Contact' bgImage='background.jpg'.
  const src = props.src || `/Assets/Images/${props.usedIn}/${props.bgImage}`;

  return (
    <Grid container>
      <Grid item className={styles.heroHeroContainer} sx={{ height: '63vh' }}>
        <img
          style={{ width: isMobile ? '900px' : '100%' }}
          src={src}
          alt={props.Name || ''}
        />
      </Grid>

      <Typography
        variant='bold'
        className={styles.heroTitle}
        sx={{
          fontSize: { xs: '17px', md: '39px' },
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-110%)',
        }}
      >
        {props.Name}
        <BreadCrumb usedIn='packageDetails' />
      </Typography>
    </Grid>
  );
};

export default HeroSection;
