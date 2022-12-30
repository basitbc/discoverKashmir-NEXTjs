import { Grid } from '@mui/material';

const FacebookEmbed = () => {
  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
      <iframe
        src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fdiscoverkashmir1&tabs=timeline%2C%20messages&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
        width='340'
        height='500'
        style={{
          border: 'none',
          overflow: 'hidden',
          boxShadow:
            'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
          borderRadius: '0 0 12px 12px',
        }}
        scrolling='no'
        frameborder='0'
        allowfullscreen='true'
        allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
      ></iframe>
    </Grid>
  );
};

export default FacebookEmbed;
