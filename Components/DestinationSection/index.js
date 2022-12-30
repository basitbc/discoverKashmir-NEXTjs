import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import destinationData from '../../public/Data/Destinations.json';
import styles from '../../styles/DestinationSection.module.css';

const DestinationSection = () => {
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
            <Grid item className={styles.disBox} width={'190px'}>
              <img
                className={styles.imageDisBox}
                src='https://assets.gqindia.com/photos/616d2712c93aeaf2a32d61fe/master/pass/top-image%20(1).jpg'
                alt='img'
              />
              <Typography
                sx={{
                  fontFamily: "Headings, 'cursive'",
                  paddingLeft: '15px',
                  fontWeight: 700,
                }}
                fontSize='17px'
              >
                {item.DistinationName}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default DestinationSection;
