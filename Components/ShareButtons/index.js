import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Router, { useRouter } from 'next/router';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  PinterestIcon,
  VKIcon,
} from 'react-share';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ShareButtons() {
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  const url = `https://www.thediscoverkashmir.in${String(router.asPath)}`;

  const size = isMobile ? '2rem' : '2.5rem';
  return (
    <Grid
      sx={{
        position: 'fixed',
        right: 0,
        top: '40%',
        margin: '0px',
        padding: '0px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TwitterShareButton url={url} style={{ background: '#1DA1F2' }}>
        <TwitterIcon size={size} />
      </TwitterShareButton>

      <FacebookShareButton url={url} style={{ background: '#3B599A' }}>
        <FacebookIcon size={size} />
      </FacebookShareButton>
      <LinkedinShareButton url={url} style={{ background: '#027FB1' }}>
        <LinkedinIcon size={size} />
      </LinkedinShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={size} />
      </WhatsappShareButton>
    </Grid>
  );
}

// const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);
