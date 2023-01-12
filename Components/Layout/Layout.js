import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import NavBar from '../Navbar';
import MobileSideBar from '../MobileSideBar';
import { Fab, Grid } from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import styles from '../../styles/Layout.module.css';
import details from '../../Data/Details.json';
import Link from 'next/link';
import BreadCrumb from '../Breadcrumb/BreadCrumb';
export default function Layout({ children }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <NavBar />
      <Grid sx={{ display: { xs: 'flex', md: 'none' }, height: '70px' }}></Grid>
      <MobileSideBar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <Grid
        container
        sx={{
          position: 'fixed',
          top: '5px',
          left: '10px',
          justifyContent: 'start',
          // border: '1px solid',
          display: { xs: 'flex', md: 'none' },
          marginTop: '10px',
          zIndex: '99999',
        }}
      >
        <Fab
          onClick={() => {
            openDrawer ? setOpenDrawer(false) : setOpenDrawer(true);
          }}
          size='small'
          aria-label='like'
          sx={{ marginRight: '10px' }}
        >
          {openDrawer ? <CloseIcon /> : <MenuTwoToneIcon />}
        </Fab>
      </Grid>
      {/* <main>{children}</main> */}
      {React.cloneElement(children, {
        openDrawer: openDrawer,
        setOpenDrawer: setOpenDrawer,
      })}
      <Footer />
      <Link
        target={'_blank'}
        href={`https://wa.me/${details.whatsappNumber}?text=Hello, I want to get my customized package for my trip to Kashmir`}
      >
        <Grid
          className={styles.btnWhatsappPulse}
          item
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'fixed',
            alignItems: 'center',
            zIndex: '999999',
            padding: { xs: '27px', md: '35px' },
          }}
        >
          <WhatsAppIcon style={{ fontSize: '40px', color: 'white' }} />
        </Grid>
      </Link>
    </>
  );
}
