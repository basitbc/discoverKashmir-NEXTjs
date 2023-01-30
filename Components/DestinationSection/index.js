import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import destinationData from '../../Data/Destinations.json';
import styles from '../../styles/DestinationSection.module.css';
import Router from 'next/router';
import slugify from 'slugify';

const DestinationSection = () => {
  const handleClickLocation = (item) => {
    Router.push({
      pathname: `/destinations/${slugify(item.destinationName).toLowerCase()}`,
      query: { id: item.id },
    });
  };
  return (
    <Grid
      container
      display={'flex'}
      flexDirection='row'
      wrap='nowrap'
      sx={{ margin: '40px 0 10px 10px' }}
      className={styles.outerContainerDis}
    >
      <Grid item>
        <Grid container className={styles.innerContainerTitleDis}>
          <Grid item>
            <Typography
              sx={{
                flexDirection: 'column',
                fontSize: '17px',
                fontWeight: 700,
                fontFamily: "Headings, 'cursive'",
              }}
            >
              Where to
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              sx={{
                fontSize: '27px',
                fontWeight: 700,
                lineHeight: '16px',
                fontFamily: "Headings, 'cursive'",
              }}
            >
              Next?
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        columnGap={1}
        flexWrap='nowrap'
        className={styles.innerContainerNameDis}
      >
        {destinationData.map((item) => {
          return (
            <Grid
              item
              className={styles.disBox}
              onClick={() => {
                handleClickLocation(item);
              }}
            >
              <Image
                className={styles.imageDisBox}
                height='40'
                width='40'
                src={`/Assets/Images/Destinations/${item.District}/${item.Image}/cardImage.jpg`}
                alt='img'
              />
              <Typography
                sx={{
                  fontFamily: "Headings, 'cursive'",
                  paddingLeft: '15px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
                fontSize='17px'
              >
                {item.destinationName}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default DestinationSection;
