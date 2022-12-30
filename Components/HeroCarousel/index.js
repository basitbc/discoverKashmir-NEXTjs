import Carousel from 'react-bootstrap/Carousel';
import { Alert, CCarousel, CCarouselItem } from '@coreui/react';
import { Grid, Typography } from '@mui/material';
import { textAlign } from '@mui/system';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import Image from 'next/image';

const data = [
  'https://images.unsplash.com/photo-1545979756-58754f4113c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  'https://images.unsplash.com/photo-1614056965546-42fbe24eb36c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2729&q=80',
];

function HeroCarousel() {
  return (
    <Grid sx={{ zIndex: '1' }}>
      <CCarousel
        controls
        dark
        transition='crossfade'
        style={{ height: '75vh', width: '100vw' }}
      >
        {data.map((image) => {
          return (
            <CCarouselItem>
              <img
                className='d-block w-100 imageCarousel'
                style={{ height: '75vh', width: '100vw', objectFit: 'cover' }}
                src={image}
                alt='slide'
                width='100%'
              />
            </CCarouselItem>
          );
        })}
      </CCarousel>
    </Grid>
  );
}

export default HeroCarousel;
