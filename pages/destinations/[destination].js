import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import blogDatas from '../../Data/Blog.json';
import Image1 from '../../public/Assets/Images/Packages/3.jpg';
// import styles from '../../styles/BlogDetails.module.css';
import WeatherWidget from '../../Components/WeatherWidget';
import Router, { useRouter } from 'next/router';
import slugify from 'slugify';
import styles from '../../styles/DestinationDetails.module.css';
const index = ({ BlogsData, packagesData, destinationData }) => {
  var router = useRouter();
  const [destination, setDestination] = useState([]);
  useEffect(() => {
    if (!router.isReady) return;
    console.log(destination);
    setDestination(destinationData[router.query.id]);
    // setPackageData(packageDataAll[router.query.id]);
  }, [router.isReady]);

  const handleClickBlog = (item) => {
    router.push({
      pathname: `/destinations/${slugify(item.Title).toLowerCase()}`,
      query: { id: item.id },
    });
    // setBlogData(item);
    // router.reload();
  };

  return (
    <div>
      <Head>
        <title>
          {destination.destinationName} | Discover Kashmir | Best Travel Company
          in Kashmir{' '}
        </title>
        <meta property='og:title' content={destination.destinationName} />
        <meta
          property='og:description'
          content={destination?.shortDes?.slice(0, 142)}
        />
        <meta
          property='og:image'
          itemprop='image'
          content={`/Assets/Images/Destinations/${destination.District}/${destination.Image}/thumbnail.jpg`}
        />
        <meta property='og:type' content='website' />
        <meta
          name='description'
          content={destination?.shortDes?.slice(0, 142)}
        />
        <meta
          property='og:image'
          itemprop='image'
          content={`/Assets/Images/Destinations/${destination.District}/${destination.Image}/thumbnail.jpg`}
        />
        <link
          itemprop='thumbnailUrl'
          content={`/Assets/Images/Destinations/${destination.District}/${destination.Image}/thumbnail.jpg`}
        />
        <span
          itemprop='thumbnail'
          itemscope
          itemtype='http://schema.org/ImageObject'
        >
          <link
            itemprop='url'
            content={`/Assets/Images/Destinations/${destination.District}/${destination.Image}/thumbnail.jpg`}
          />
        </span>
        {/* <meta property='og:image:type' content='image/jpg'></meta> */}
      </Head>

      {destination ? (
        <Grid>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' },
              overflow: 'hidden',
              flexWrap: 'nowrap',
              pt: { md: '70px' },
            }}
          >
            <Grid
              sx={{
                width: { xs: '100%', md: '20%' },
                // border: '1px solid',
                display: { xs: 'flex', md: 'none' },
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '17px', md: '19px', lg: '23px' },
                  letterSpacing: '-1.5px',
                  // lineHeight: { xs: '40px', md: '60.5px' },
                  // mt: '10px',
                  mb: { xs: '10px', lg: '10px' },
                  fontFamily: "'StayWinter', sans-serif",
                  color: '#71797E',
                  padding: '0px 60px',
                }}
              >
                Distance
              </Typography>
              <Typography
                sx={{
                  color: '#353535',
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                    backgroundColor: '#F0E7E7',
                    boxDecorationBreak: 'clone',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {destination.distance}
                </span>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '17px', md: '19px', lg: '21px' },
                  // letterSpacing: '-1.5px',
                  // lineHeight: { xs: '40px', md: '60.5px' },
                  mt: '30px',
                  mb: { xs: '10px', lg: '10px' },
                  fontFamily: "'StayWinter', sans-serif",
                  color: '#71797E',
                }}
              >
                Best Time to Visit
              </Typography>
              <Typography
                sx={{
                  color: '#353535',
                  padding: '0px 60px',
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                    backgroundColor: '#F0E7E7',
                    boxDecorationBreak: 'clone',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {destination.bestTimeToVisit}
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                width: { xs: '100%', md: '20%' },
                margin: {
                  xs: '40px 80px 0 10px',
                  md: '',
                  lg: '140px 70px 0 20px',
                },
                zIndex: 9,
              }}
            >
              <BreadCrumb usedIn='blog' />

              <Typography
                sx={{
                  fontSize: { xs: '27px', md: '27px', lg: '35px' },
                  letterSpacing: '-0.5px',
                  // lineHeight: { xs: '40px', md: '60.5px' },
                  mt: '30px',
                  mb: { md: '-30px', lg: '-40px' },
                  fontFamily: "'StayWinter', sans-serif",
                }}
              >
                Travel in
              </Typography>
              <Typography
                className={styles.textName}
                sx={{
                  fontSize: { xs: '40px', md: '70px', lg: '83px' },
                  textTransform: 'uppercase',
                  fontFamily: "'Raleway', sans-serif",
                  // lineHeight: '60px',
                  whiteSpace: 'nowrap',
                }}
              >
                {destination.destinationName}
              </Typography>

              <Typography
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: { xs: '13px', md: '13px', lg: '17px' },
                  fontWeight: '300',
                  mb: '30px',
                  padding: { xs: '0 30px 0 10px', md: '0 20px 0 40px' },
                }}
              >
                {destination.shortDes}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                position: 'relative',
                display: 'flex',
                // margin: '-120px -70px 0 0',
                height: { xs: '52vh', md: '70vh', lg: '70vh' },
                // ml: { xs: '-50px', md: '0px' },
                width: { xs: '130%', md: '50%' },
                overflow: 'hidden',
                // borderRadius: '46% 54% 44% 56% / 52% 33% 67% 48% ',
                // borderRadius: '35% 36% 52% 48% / 56% 30% 46% 45% ',
                borderRadius: {
                  xs: '0% 0% 61% 49% / 66% 32% 27% 35% ',
                  md: '76% 34% 30% 70% / 43% 43% 57% 60% ',
                  lg: '76% 34% 30% 70% / 43% 43% 57% 60%  ',
                },
              }}
            >
              <Image
                fill
                src={`/Assets/Images/Destinations/${destination.District}/${destination.Image}/background.jpg`}
                style={{
                  borderRadius: {
                    xs: '0% 0% 61% 49% / 66% 32% 27% 35% ',
                    md: '76% 34% 30% 70% / 43% 43% 57% 60% ',
                    lg: ' 76% 34% 30% 70% / 43% 43% 57% 60%  ',
                  },
                }}
              />
            </Grid>
            <Grid
              sx={{
                width: { xs: '100%', md: '20%' },
                // border: '1px solid',
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '17px', md: '19px', lg: '23px' },
                  letterSpacing: '-1.5px',
                  // lineHeight: { xs: '40px', md: '60.5px' },
                  mt: '90px',
                  mb: { md: '10px', lg: '10px' },
                  fontFamily: "'StayWinter', sans-serif",
                  color: '#71797E',
                }}
              >
                Distance
              </Typography>
              <Typography
                sx={{
                  color: '#353535',
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                    backgroundColor: '#F0E7E7',
                    boxDecorationBreak: 'clone',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {destination.distance}
                </span>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '17px', md: '19px', lg: '21px' },
                  // letterSpacing: '-1.5px',
                  // lineHeight: { xs: '40px', md: '60.5px' },
                  mt: '90px',
                  mb: { md: '10px', lg: '10px' },
                  fontFamily: "'StayWinter', sans-serif",
                  color: '#71797E',
                }}
              >
                Best Time to Visit
              </Typography>
              <Typography
                sx={{
                  color: '#353535',
                  padding: '0 10px',
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                    backgroundColor: '#F0E7E7',
                    boxDecorationBreak: 'clone',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {destination.bestTimeToVisit}
                </span>
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
          >
            {/* One for the left description of the blog */}
            <Grid
              item
              sx={{ display: 'flex', width: { xs: '100%', md: '67%' } }}
            >
              <Typography
                className={styles.span}
                sx={{
                  fontSize: '19px',
                  color: 'gray',
                  p: { xs: '30px 20px 40px 20px', md: '0px 0 40px 70px' },
                  fontFamily: "'Montserrat', sans-serif",
                  whiteSpace: 'pre-wrap',
                  lineHeight: '35px',
                }}
              >
                <span
                  className={styles.span}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '19px',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: [`${destination.description}`],
                  }}
                />
              </Typography>
            </Grid>
            {/* For the right section containg links */}
            <Grid
              item
              sx={{
                display: 'flex',
                width: { xs: '100%', md: '30%' },
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Grid
                sx={{
                  // height: '20px',
                  display: 'flex',

                  margin: { md: '70px 0 10px 0px', xs: '10px 0 0 0' },
                  width: { xs: '90vw', md: '340px' },
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Headings,sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '1.1px',
                    fontWeight: 700,
                  }}
                >
                  Related Articles
                </Typography>
              </Grid>
              <Grid
                item
                display={'flex'}
                flexDirection='column'
                className={styles.bgGridRight}
                sx={{
                  minHeight: { xs: '230px', md: '230px' },
                  width: { xs: '90vw', md: '340px' },
                  padding: { xs: '5px 5px', md: '10px 10px' },
                  margin: { md: '5px 0px', xs: '10px 0' },
                }}
              >
                {BlogsData.slice(0, 3).map((item) => (
                  <Grid
                    onClick={() => {
                      handleClickBlog(item);
                    }}
                    container
                    display={'flex'}
                    alignItems='center'
                    flexDirection='row'
                    flexWrap={'nowrap'}
                    // boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                    className={styles.bgInBox}
                  >
                    <Grid
                      item
                      xs={4}
                      className={styles.bgInnerBox}
                      sx={{
                        position: 'relative',
                        height: { xs: '60px', md: '60px' },
                        width: '90px',
                        borderRadius: '14px',
                        // border: '3px solid',
                        objectFit: 'cover',
                        mr: '15px',
                      }}
                    >
                      <Image
                        src={
                          '/Assets/Images/Blogs/' +
                          item.Image +
                          '/cardImage.jpg'
                        }
                        fill
                        style={{
                          // height: '100%',
                          // width: '100%',
                          borderRadius: '14px',
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      sx={{
                        display: 'inline-block',
                        height: '55px',
                        textOverflow: 'ellipsis',
                        // border: '1px solid red',
                        overflow: 'hidden',
                      }}
                    >
                      <Typography
                        className={styles.textTitle}
                        sx={{
                          fontSize: { xs: '12px', md: '15px' },
                          fontWeight: '700',
                          fontFamily: 'Headings,',
                          letterSpacing: '0.3px',
                          lineHeight: '24.5px',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.Title}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid item>
                <TopPicks BlogsData={BlogsData} packagesData={packagesData} />
              </Grid>
              <Grid item>
                <FacebookEmbed />
              </Grid>
              <Grid>
                <ShareButtons />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid></Grid>
      )}
    </div>
  );
};

export default index;
import path from 'path';
import fsPromises from 'fs/promises';
import TopPicks from '../../Components/TopPicks';
import FacebookEmbed from '../../Components/FacebookEmbed';
import Head from 'next/head';
import ShareButtons from '../../Components/ShareButtons';
import BreadCrumb from '../../Components/Breadcrumb/BreadCrumb';
import destinationDataa from '../../Data/Destinations.json';
export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), 'Data');
  //Read the json data file data.json
  const BlogsData = await fsPromises.readFile(
    jsonDirectory + '/Blog.json',
    'utf8'
  );
  const packagesData = await fsPromises.readFile(
    jsonDirectory + '/Packages.json',
    'utf8'
  );
  const destinationsData = await fsPromises.readFile(
    jsonDirectory + '/Destinations.json',
    'utf8'
  );
  // const res = await fetch(
  //   'https://api.openweathermap.org/data/2.5/weather?q=Gulmarg,in&APPID=2d48b1d7080d09ea964e645ccd1ec93f&units=metric'
  // );
  // const weatherData = await res.json();
  return {
    props: {
      BlogsData: JSON.parse(BlogsData),
      packagesData: JSON.parse(packagesData),
      destinationData: JSON.parse(destinationsData),

      // weatherData: weatherData,
    },
  };
}
export async function getStaticPaths() {
  const paths = destinationDataa.map((item) => {
    return {
      params: {
        destination: slugify(item.destinationName).toLowerCase(),
      },
    };
  });
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}
