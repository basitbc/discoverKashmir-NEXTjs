import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Fab, Grid, Typography } from '@mui/material';
import DialpadIcon from '@mui/icons-material/Dialpad';
import styles from '../../styles/MobileSideBar.module.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import DeckOutlinedIcon from '@mui/icons-material/DeckOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { blue } from '@mui/material/colors';
export default function MobileSideBar({ setOpenDrawer, openDrawer }) {
  const sideBarLinks = [
    {
      name: 'Home',
      path: '/',
      icon: <HouseOutlinedIcon sx={{ fontSize: '25px', color: '#DC834E' }} />,
    },
    {
      name: 'Travel Blogs',
      path: '/travelblogs',
      icon: (
        <FlightTakeoffOutlinedIcon
          sx={{ fontSize: '25px', color: '#DC834E' }}
        />
      ),
    },
    {
      name: 'Packages',
      path: '/packages',
      icon: <DeckOutlinedIcon sx={{ fontSize: '25px', color: '#DC834E' }} />,
    },
    {
      name: 'Contact Us',
      path: '/contact',
      icon: <PhoneOutlinedIcon sx={{ fontSize: '25px', color: '#DC834E' }} />,
    },
  ];

  const list = () => (
    <Box
      sx={{ width: '100vw', mt: '110px', overflow: 'hidden', height: '100vh' }}
      role='persistent'
      onClick={() => {
        openDrawer ? setOpenDrawer(false) : setOpenDrawer(true);
      }}
      //   onKeyDown={setOpenDrawer(false)}
    >
      <List>
        {sideBarLinks.map((item) => {
          return (
            <Grid
              container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Grid>
                <ListItem disablePadding>
                  <ListItemButton
                    style={{
                      textDecoration: 'none',
                      borderBottom: '1px solid #D3D3D3',
                    }}
                  >
                    <ListItemText>
                      <Link
                        style={{
                          textDecoration: 'none',
                          display: 'inline-flex',
                          // flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                        }}
                        href={item.path}
                      >
                        <Grid item sx={{ color: 'black', mr: '16px' }}>
                          {item.icon}
                        </Grid>
                        <Grid item>
                          <Typography
                            sx={{
                              fontWeight: 300,
                              fontSize: '13px',
                              fontFamily: 'Lato, sans-serif',
                              color: 'black',
                              textTransform: 'uppercase',
                              alignItems: 'center',
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Grid>
                      </Link>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Grid>
            </Grid>
          );
        })}
      </List>
      <Divider />
      <Grid
        container
        sx={{
          margin: '0 10px 0 20px',
          height: '30px',
          display: 'flex',
          mt: '20px',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{ mr: '20px', fontFamily: "'Roboto', sans-serif", color: 'gray' }}
        >
          Follow us:
        </Typography>
        <Grid item>
          <Fab
            size='small'
            aria-label='like'
            sx={{
              marginRight: '10px',
              background: '#d6249f',
              background:
                'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
              color: 'white',
            }}
          >
            <InstagramIcon />
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            size='small'
            aria-label='like'
            sx={{
              marginRight: '10px',
              background: '#d6249f',
              background: ' #4267B2 ',
              color: 'white',
            }}
          >
            <FacebookIcon />
          </Fab>
        </Grid>
        {/* <Grid item sx={{ display: 'flex' }}>
          <Typography
            className={styles.textPhoneno}
            sx={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
          >
            <DialpadIcon />
            &nbsp; {details.phoneNo}
          </Typography>
        </Grid> */}
      </Grid>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor='right'
          open={openDrawer}
          PaperProps={{
            sx: {
              background: 'white',
            },
          }}
          transitionDuration={{ enter: 770, exit: 500 }}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
