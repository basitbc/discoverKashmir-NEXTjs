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
  return (
    <Grid container>
      <Grid item className={styles.heroHeroContainer} sx={{ height: '63vh' }}>
        <img
          style={{ width: isMobile ? '900px' : '100%' }}
          src={'/Assets/Images/Packages/' + props.bgImage}
        />
      </Grid>
      <Typography
        variant='bold'
        className={styles.heroTitle}
        sx={{
          fontSize: '39px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-110%)',
        }}
      >
        {props.packageName}
        <BreadCrumb usedIn='packageDetails' />
      </Typography>
    </Grid>
  );
};

export default HeroSection;
