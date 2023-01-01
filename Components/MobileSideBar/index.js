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
import Link from 'next/link';

export default function MobileSideBar({ setOpenDrawer, openDrawer }) {
  const sideBarLinks = [
    {
      name: 'Destinations',
      path: '/destinations',
    },
    {
      name: 'Travel Blogs',
      path: '/travelblogs',
    },
    {
      name: 'Packages',
      path: '/packages',
    },
    {
      name: 'Contact Us',
      path: '/contact',
    },
  ];

  const list = () => (
    <Box
      sx={{ width: 250, p: '90px 0 0 0px' }}
      role='presentation'
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
                justifyContent: 'space-between',
              }}
            >
              <Grid>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText>
                      <Link style={{ textDecoration: 'none' }} href={item.path}>
                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontFamily: 'Raleway, sans-serif',
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Link>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <hr
                  style={{
                    height: '0.5px',
                    backgroundColor: 'black',
                    color: 'black',
                  }}
                />
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
          display: 'flex',
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
          <Fab size='small' aria-label='like' sx={{ marginRight: '10px' }}>
            {/* <i
              className='fa fa-instagram'
              style={{ fontSize: '23px', color: '#8a3ab9' }}
            ></i> */}
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            size='small'
            color='primary'
            aria-label='like'
            sx={{ marginRight: '10px' }}
          >
            {/* <i className='fa fa-facebook' style={{ fontSize: '23px' }}></i> */}
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
        <Drawer anchor='right' open={openDrawer}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
