import { Button, Fab, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Navbar.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DialpadIcon from '@mui/icons-material/Dialpad';
import { Link as LinkMUI } from '@mui/material';
import logoWhite from '../../public/Assets/logo/logo-whiteColor.png';
import logoBlack from '../../public/Assets/logo/logo-blackColor.png';
import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import Head from 'next/head';
import detailsData from '../../Data/Details.json';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useRouter } from 'next/router';

const NavBar = ({ setOpenDrawer, openDrawer }) => {
  const [changedNavbar, setChangedNavbar] = useState(false);
  const [changedNavbarMobile, setChangedNavbarMobile] = useState(false);
  const [staticBg, setStaticBg] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  const router = useRouter();
  if (typeof window !== 'undefined') {
    let scroll = window.scrollY;
    window.addEventListener('scroll', () => {
      if (window.scrollY < 10) {
        setChangedNavbar(false);
      } else if (scroll > window.scrollY) {
        setChangedNavbar(true);
      } else {
        setChangedNavbar(false);
      }
      scroll = window.scrollY;
    });
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setChangedNavbarMobile(true);
      } else {
        setChangedNavbarMobile(false);
      }
    });
  }
  const setNavStatic = () => {
    if (router.pathname === '/travelblogs/[blog]') {
      setStaticBg(true);
    }
  };

  useEffect(() => {
    setNavStatic();
  }, [router.pathname]);

  return (
    <Grid
      container
      className={styles.navbarContainer}
      id='navbar'
      sx={{
        backgroundColor: {
          // xs: changedNavbarMobile ? 'rgba(2, 27, 48, 0.9)' : '',
          xs: 'white',
          md: staticBg ? 'black' : changedNavbar ? 'black' : 'transparent',
        },
        position: {
          xs: 'fixed',
          md: staticBg ? 'fixed' : changedNavbar ? 'fixed' : 'absolute',
        },
        padding: {
          md: staticBg
            ? '5px 10px 0 10px'
            : changedNavbar
            ? '5px 10px 0 10px'
            : '15px 10px 0 10px',
        },
        height: {
          xs: '70px',
          md: staticBg ? '70px' : changedNavbar ? '70px' : '100px',
        },
        width: '100vw',
        zIndex: '9999',
        // borderBottom: '1px solid',
        justifyContent: { xs: 'space-between', md: 'space-between' },
        // borderBottom: { xs: '2px solid gray', md: '0px solid' },
        boxShadow: {
          xs: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;',
          md: 'unset',
        },
      }}
    >
      <Grid item sx={{ display: { xs: 'flex', md: 'none' } }}></Grid>
      <Grid
        item
        sx={{
          padding: { xs: '0 0 0 20px', md: '0 8px 0 8px' },
          margin: { xs: '0 10px 0 0', lg: '0 30px 0 0' },
        }}
        className={styles.logoContainer}
      >
        <Link href='/' style={{ textDecoration: 'none', color: 'white' }}>
          {/* <Typography
            className={styles.logo-text'
            variant='body1'
            sx={{
              fontSize: { xs: '29px', lg: '36px' },
              fontWeight: 700,
              fontFamily: 'Caveat Brush, cursive',
            }}
          >
            {details.Logo}
          </Typography> */}
          {isMobile ? (
            <Image
              src={logoBlack}
              style={{ height: '52px', width: '130px' }}
              alt='logo'
            />
          ) : (
            <Image
              src={logoWhite}
              // src={logoBlack}
              style={{ height: '50px', width: '130px' }}
              alt='logo'
            />
          )}
        </Link>
      </Grid>

      <Grid container display='flex' flexDirection='row' width='auto'>
        <Grid
          container
          sx={{ display: { xs: 'none', md: 'flex' } }}
          className={styles.navbarContainerLeft}
          item
          height='60px'
          width='auto'
        >
          <Grid
            item
            className={styles.textContainer}
            sx={{
              height: { md: '30px', lg: '60px' },
              width: { md: '90px', lg: '120px' },
              marginTop: '20px',
            }}
            // height='60px'
            // width='150px'
          >
            <Grid className={styles.textItems}>
              <Link href='/' style={{ textDecoration: 'none', color: 'white' }}>
                <Typography
                  className={styles.navText}
                  sx={{
                    fontSize: { md: '13px', lg: '19px' },
                    fontWeight: 800,
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Home
                </Typography>
                {/* <KeyboardArrowDownIcon /> */}
              </Link>
            </Grid>
          </Grid>
          <Grid
            item
            className={styles.textContainer}
            sx={{
              height: { md: '30px', lg: '60px' },
              width: { md: '140px', lg: '160px' },
              marginTop: '20px',
            }}
          >
            <Grid className={styles.textItems}>
              <Link
                href='/travelblogs'
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Typography
                  className={styles.navText}
                  sx={{
                    fontSize: { md: '13px', lg: '19px' },
                    fontWeight: 800,
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Travel Blogs
                </Typography>
              </Link>
              {/* <KeyboardArrowDownIcon /> */}
            </Grid>
          </Grid>
          <Grid
            item
            className={styles.textContainer}
            sx={{
              height: { md: '30px', lg: '60px' },
              width: { md: '90px', lg: '150px' },
              marginTop: '20px',
            }}
          >
            <Grid className={styles.textItems}>
              <Link
                href='/packages'
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Typography
                  className={styles.NavText}
                  sx={{
                    fontSize: { md: '13px', lg: '19px' },
                    fontWeight: 800,
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Packages
                </Typography>
              </Link>
              {/* <KeyboardArrowDownIcon /> */}
            </Grid>
          </Grid>
          <Grid
            item
            className={styles.textContainer}
            sx={{
              height: { md: '30px', lg: '60px' },
              width: { md: '90px', lg: '150px' },
              marginTop: '20px',
            }}
          >
            <Grid className={styles.textItems}>
              <Link
                href='/contact'
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Typography
                  className={styles.navText}
                  sx={{
                    fontSize: { md: '13px', lg: '19px' },
                    fontWeight: 800,
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Contact Us
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        className={styles.navbarContainerRight}
        height='40spx'
        sx={{
          display: { xs: 'none', md: 'flex' },
          margin: { md: '5px 0px 5px 0px', lg: '10px 5px 10px 5px' },
        }}
        width='auto'
      >
        <Grid
          container
          sx={{
            margin: '0 10px 0 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid item>
            <LinkMUI
              target={'_blank'}
              href='https://www.instagram.com/discoverkashmir1/'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <Fab size='small' aria-label='like' sx={{ marginRight: '10px' }}>
                {/* <i className='fa fa-instagram' style={{ fontSize: '23px' }}></i> */}
                <InstagramIcon />
              </Fab>
            </LinkMUI>
          </Grid>
          <Grid item>
            <LinkMUI
              target={'_blank'}
              href='https://www.facebook.com/discoverkashmir1/?mibextid=ZbWKwL'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Fab
                size='small'
                color='primary'
                aria-label='like'
                sx={{ marginRight: '10px' }}
              >
                {/* <i className={styles.fa fa-facebook} style={{ fontSize: '23px' }}></i> */}
                <FacebookIcon />
              </Fab>
            </LinkMUI>
          </Grid>
          <Grid item sx={{ display: 'flex' }}>
            <Typography
              className={styles.textPhoneNo}
              sx={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
            >
              <DialpadIcon />
              &nbsp;{' '}
              <a
                style={{ textDecoration: 'none', color: 'white' }}
                href='tel:+919419584775'
              >
                {detailsData.phoneNumber}
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NavBar;
