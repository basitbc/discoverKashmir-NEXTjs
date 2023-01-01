import Carousel from 'react-bootstrap/Carousel';
import { Alert, CCarousel, CCarouselItem } from '@coreui/react';
import { Grid, Typography } from '@mui/material';
import { textAlign } from '@mui/system';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

const data = [
  {
    image: 'hero1.jpg',
  },
  // {
  //   image: 'hero2.jpg',
  // },
  // {
  //   image: 'hero3.jpg',
  // },
  // {
  //   image: 'hero4.jpg',
  // },
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
        {data.map((item) => {
          return (
            <CCarouselItem>
              <img
                className='d-block w-100 imageCarousel'
                style={{ height: '75vh', width: '100vw', objectFit: 'cover' }}
                src={'/Assets/Images/Home/' + item.image}
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
