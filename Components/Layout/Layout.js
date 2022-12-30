import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import NavBar from '../Navbar';
import MobileSideBar from '../MobileSideBar';
import { Fab, Grid } from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseIcon from '@mui/icons-material/Close';

export default function Layout({ children }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <NavBar />
      <MobileSideBar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <Grid
        container
        sx={{
          position: 'fixed',
          top: '10px',
          justifyContent: 'end',
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
    </>
  );
}
