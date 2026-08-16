import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import PackageDetail from '../../public/Data/Packages.json';
// import MorePackageDetails from '../../public/Data/MorePackageDetails.json';
import styles from '../../styles/PackageDetails.module.css';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HeroSection from '../../Components/HeroSection';
import SingleAccordion from '../../Components/SingleAccordion';
import BookingBox from '../../Components/BookingBox';
import PackageBox from '../../Components/PackageBox';
import FacebookEmbed from '../../Components/FacebookEmbed';
import PackageAccordain from '../../Components/PackageAccordain';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
const PackageDetails = ({ packageData, relatedPackages }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });

  // The API resolves per-package overrides against the global defaults and
  // returns ready-to-render arrays, so there is nothing to split or fall back
  // to here. Previously these came from a semicolon-delimited string.
  const {
    INCLUSION: Inclusions = [],
    EXCLUSION: Exclusions = [],
    THING_TO_CARRY: ThingsToCarry = [],
    MAJOR_ACTIVITY: MajorActivities = [],
    TERM: TermsAndConditions = [],
  } = packageData.lists ?? {};

  const MainData = [
    {
      name: 'Price',
      icon: (
        <CurrencyRupeeOutlinedIcon
          style={{ fontSize: isMobile ? '30px' : '40px' }}
        />
      ),
      value: packageData.price,
    },
    {
      name: 'Duration',
      icon: (
        <AccessTimeOutlinedIcon
          style={{ fontSize: isMobile ? '30px' : '40px' }}
        />
      ),
      value: packageData.duration,
    },
    {
      name: 'PickUp/Drop',
      icon: (
        <NearMeOutlinedIcon style={{ fontSize: isMobile ? '30px' : '40px' }} />
      ),
      value: packageData.pickAndDrop,
    },
    {
      name: 'Meals Plan',
      icon: (
        <RestaurantMenuOutlinedIcon
          style={{ fontSize: isMobile ? '30px' : '40px' }}
        />
      ),
      value: packageData.mealsPlan,
    },
    {
      name: 'Vehicle',
      icon: (
        <DirectionsCarIcon style={{ fontSize: isMobile ? '30px' : '40px' }} />
      ),
      value: packageData.vehicle,
    },
  ];
  // Image fields now hold a complete path (or a Blob URL for admin uploads),
  // so nothing is assembled from fragments at render time any more.
  const ogImage = packageData.cardImage || packageData.bgImage || '';

  return (
    <div>
      <Head>
        <title>{packageData.metaTitle || packageData.packageName}</title>
        <meta
          name='description'
          content={
            packageData.metaDescription ||
            (packageData.description || '').slice(0, 142)
          }
        />
        {ogImage ? (
          <>
            <meta property='og:image' itemProp='image' content={ogImage} />
            <link itemProp='thumbnailUrl' href={ogImage} />
            <span
              itemProp='thumbnail'
              itemScope
              itemType='http://schema.org/ImageObject'
            >
              <link itemProp='url' href={ogImage} />
            </span>
          </>
        ) : null}
      </Head>
      <Grid container>
        <HeroSection
          src={packageData.bgImage}
          Name={packageData.packageName}
        />
        <Grid container className={styles.pdUpperContainer}>
          <Grid
            item
            sx={{
              margin: { xs: '10px', md: '10px 0 10px 70px' },
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <FmdGoodOutlinedIcon
              sx={{ color: '#999999', fontSize: '30px', mr: '10px' }}
            />
            <Typography
              sx={{ fontSize: '25px', color: '#999999', fontWeight: '300' }}
            >
              {packageData.location}
            </Typography>
          </Grid>
          <Grid
            container
            sx={{
              margin: { xs: '10px', md: '10px 0 10px 70px' },
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {MainData.map((item) => {
              return (
                <Grid
                  item
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    m: '0 20px 20px 0',
                  }}
                >
                  <Grid
                    item
                    sx={{
                      mr: { xs: '7px', md: '12px' },
                      color: '#DC834E',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}
                  >
                    {item.icon}
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: { xs: '13px', md: '16px' },
                        fontFamily: "'Roboto', sans-serif",
                        fontWeight: '400',
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '13px', md: '16px' },
                        color: '#999999',
                        fontWeight: '400',
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
        >
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: { xs: '90vw', md: '47vw', lg: '57vw' },
              m: { xs: '30px 20px 0 20px', md: '30px 30px 0 70px' },
            }}
          >
            <Grid>
              <Typography
                sx={{
                  fontSize: '30px',
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 700,
                }}
              >
                About
              </Typography>
            </Grid>
            <Grid sx={{ width: '100%' }}>
              <Typography
                sx={{
                  fontSize: '16px',
                  color: 'gray',
                  p: '20px 0 40px 0',
                  fontFamily: "'Comfortaa', sans-serif",
                }}
              >
                {packageData.description}
              </Typography>
            </Grid>
            <hr
              style={{
                height: '1px',
                margin: '10px 0',
                backgroundColor: '#D3D3D3',
              }}
            />
            <Grid item sx={{ width: '100%' }}>
              <Typography
                sx={{
                  fontSize: '30px',
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 700,
                  color: '#DC834E',
                  pt: '20px',
                }}
              >
                Tour Plan
              </Typography>
              <PackageAccordain tourPlan={packageData.tourPlan} />
            </Grid>
            <hr
              style={{
                height: '1px',
                margin: '0px 0 20px 0',
                backgroundColor: '#D3D3D3',
              }}
            />
            <Grid item sx={{ mb: '30px', width: '100%' }}>
              <Typography
                sx={{
                  fontSize: '30px',
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 700,
                }}
              >
                Included
              </Typography>
              {Inclusions?.map((item) => {
                return (
                  <Typography
                    variant='body1'
                    sx={{
                      paddingTop: '10px',
                      color: 'gray',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <CheckCircleOutlineOutlinedIcon
                      sx={{ color: 'green', marginRight: '10px' }}
                    />
                    {item}
                  </Typography>
                );
              })}
            </Grid>
            <hr
              style={{
                height: '1px',
                margin: '10px 0',
                backgroundColor: '#D3D3D3',
              }}
            />
            <Grid item sx={{ mb: '30px', width: '100%' }}>
              <Typography
                sx={{
                  fontSize: '30px',
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 700,
                }}
              >
                Excluded
              </Typography>
              {Exclusions?.map((item) => {
                return (
                  <Typography
                    variant='body1'
                    sx={{ paddingTop: '10px', color: 'gray', display: 'flex' }}
                  >
                    <CancelOutlinedIcon
                      sx={{ color: 'red', marginRight: '10px' }}
                    />
                    {item}
                  </Typography>
                );
              })}
            </Grid>
            <Grid sx={{ mb: '10px', width: '100%' }}>
              <SingleAccordion
                title={'Major Activities'}
                description={MajorActivities}
                expanded={true}
              />
            </Grid>
            <Grid sx={{ mb: '10px' }}>
              <SingleAccordion
                title={'Things to Carry'}
                description={ThingsToCarry}
              />
            </Grid>
            <Grid sx={{ mb: '30px' }}>
              <SingleAccordion
                title={'Terms and Conditions'}
                description={TermsAndConditions}
              />
            </Grid>

            <Typography
              sx={{
                fontSize: '30px',
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 700,
                mb: '20px',
              }}
            >
              You may like
            </Typography>
            <Grid
              // item
              container
              columnGap={2}
              rowGap={2}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'center', md: 'unset' },
                flexWrap: 'nowrap',
              }}
            >
              {relatedPackages.map((item) => (
                <PackageBox key={item.id} item={item} />
              ))}
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              // border: '1px solid',
              pt: { md: '70px' },
              mt: { xs: '40px', md: '' },
              width: { xs: '100vw', md: '35vw' },
              alignItems: 'center',
            }}
          >
            <Grid item>
              {/* Passing the package through means the enquiry email finally
                  says which package the visitor was looking at. */}
              <BookingBox packageName={packageData.packageName} />
            </Grid>
            <Grid
              item
              sx={{
                // width: '100%',
                mt: '40px',
                // border: '1px solid',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FacebookEmbed />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PackageDetails;

import Head from 'next/head';
import { packagesService } from '../../services';
import { getSiteProps, REVALIDATE_SECONDS } from '../../lib/getSiteProps';

export async function getStaticProps({ params }) {
  // Look the record up BY SLUG. The old version took no params at all, shipped
  // every package into every page, and picked one client-side from a ?id=
  // querystring — so visiting a bare slug always rendered the first package.
  const packageData = await packagesService.getBySlug(params.package);

  if (!packageData) return { notFound: true };

  const { items } = await packagesService.list({ perPage: 3 });
  const relatedPackages = items.filter((p) => p.id !== packageData.id).slice(0, 2);

  return {
    props: { ...(await getSiteProps()), packageData, relatedPackages },
    revalidate: REVALIDATE_SECONDS,
  };
}

export async function getStaticPaths() {
  const packages = await packagesService.listAll();

  return {
    paths: packages.map((item) => ({ params: { package: item.slug } })),
    // 'blocking' so a package added in the admin resolves on first visit
    // instead of 404ing until the next deploy.
    fallback: 'blocking',
  };
}
