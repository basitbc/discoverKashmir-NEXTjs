import Head from 'next/head';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from '../../styles/PreLoader.module.css';

const PreLoader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  return (
    <>
      <Head>
        <link rel='stylesheet' type='text/css' href='loader.css' />
        <link
          href='https://fonts.googleapis.com/css?family=Roboto:900&display=swap'
          rel='stylesheet'
        />
      </Head>
      <div className={styles.loader}>
        <div className={`${styles.wait} ${styles.loading}`}>Loading...</div>
        <div
          style={{ fontSize: isMobile ? '2rem' : '6rem' }}
          className={`${styles.iataCode} ${styles.departureCity}`}
        >
          {isMobile ? 'DISCOVER' : 'KAS'}
        </div>
        <div className={styles.plane}>
          <img
            src='https://zupimages.net/up/19/34/4820.gif'
            className={styles.planeImg}
          />
        </div>
        <div className={styles.earthWrapper}>
          <div className={styles.earth}></div>
        </div>
        <div
          style={{ fontSize: isMobile ? '2rem' : '6rem' }}
          className={`${styles.iataCode} ${styles.arrivalCity}`}
        >
          {isMobile ? 'KASHMIR' : 'MIR'}
        </div>
      </div>
    </>
  );
};

export default PreLoader;
