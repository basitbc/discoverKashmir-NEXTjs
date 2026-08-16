import Carousel from 'react-bootstrap/Carousel';
import { Alert, CCarousel, CCarouselItem } from '@coreui/react';
import { Grid, Typography } from '@mui/material';
import { textAlign } from '@mui/system';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

// Slides come from the API so staff can change them in the admin; the
// previous hardcoded array is gone.

function HeroCarousel({ slides = [] }) {
  return (
    <Grid sx={{ zIndex: '1' }}>
      <CCarousel
        controls
        dark
        transition='crossfade'
        style={{ height: '75vh', width: '100vw' }}
      >
        {slides.map((item) => {
          return (
            <CCarouselItem key={item.id}>
              <img
                className='d-block w-100 imageCarousel'
                style={{ height: '75vh', width: '100vw', objectFit: 'cover' }}
                src={item.image}
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
