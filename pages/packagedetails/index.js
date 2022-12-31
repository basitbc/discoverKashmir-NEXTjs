import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
import packages from '../../public/Data/Packages.json';
import HeroSection from '../../Components/HeroSection';
import SingleAccordion from '../../Components/SingleAccordion';
import BookingBox from '../../Components/BookingBox';
import PackageBox from '../../Components/PackageBox';
import FacebookEmbed from '../../Components/FacebookEmbed';
import PackageAccordain from '../../Components/PackageAccordain';
import { useRouter } from 'next/router';

const PackageDetails = ({ packageDataAll, morePackageData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  const [packageData, setPackageData] = useState(packageDataAll[0]);

  const router = useRouter();
  const packageName = router.query.packageName;

  let Inclusions = morePackageData?.inclusions?.split(';');
  let Exclusions = morePackageData?.exclusions?.split(';');
  let ThingsToCarry = morePackageData?.thingsToCarry?.split(';');
  let TermsAndConditions = morePackageData?.termsAndConditions?.split(';');
  let MajorActivities = morePackageData?.majorActivities?.split(';');
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query.id, 'props id router');
      setPackageData(packageDataAll[router.query.id]);
    }
  }, [router.query.id, router.isReady]);
  useEffect(() => {
    console.log(packageDataAll);
    console.log(morePackageData);
  }, []);
  const MainData = [
    {
      name: 'Price',
      icon: (
        <CurrencyRupeeOutlinedIcon
          style={{ fontSize: isMobile ? '30px' : '40px' }}
        />
      ),
      value: 'From ' + packageData.price + '/-',
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
  ];
  return (
    <Grid container>
      <HeroSection
        bgImage={packageData.bgImage}
        packageName={packageData.packageName}
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
          <Typography
            sx={{ fontSize: '16px', color: 'gray', p: '20px 0 40px 0' }}
          >
            {packageData.description}
          </Typography>
          <hr style={{ height: '1px' }} />
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
          <hr style={{ height: '1px', color: 'black' }} />
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
                sx={{ paddingTop: '10px', color: 'gray' }}
              >
                <CheckCircleOutlineOutlinedIcon
                  sx={{ color: 'green', marginRight: '10px' }}
                />
                {item}
              </Typography>
            );
          })}
          <hr style={{ height: '1px', color: 'black' }} />
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
                sx={{ paddingTop: '10px', color: 'gray' }}
              >
                <CancelOutlinedIcon
                  sx={{ color: 'red', marginRight: '10px' }}
                />
                {item}
              </Typography>
            );
          })}
          <hr style={{ height: '1px', color: 'black' }} />
          <Grid sx={{ mb: '10px' }}>
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
          <Grid>
            <SingleAccordion
              title={'Terms and Conditions'}
              description={TermsAndConditions}
            />
          </Grid>
          <hr style={{ height: '1px', color: 'black' }} />
          <Typography
            sx={{
              fontSize: '30px',
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 700,
            }}
          >
            You may like
          </Typography>
          <Grid
            container
            columnGap={1}
            sx={{ display: 'flex', flexDirection: { md: 'row' } }}
          >
            {packages.slice(0, 2).map((item) => {
              return <PackageBox item={item} />;
            })}
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
            <BookingBox />
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
  );
};

export default PackageDetails;

import path from 'path';
import fsPromises from 'fs/promises';
export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), 'Data');
  //Read the json data file data.json
  const packageDataAll = await fsPromises.readFile(
    jsonDirectory + '/Packages.json',
    'utf8'
  );
  const morePackageData = await fsPromises.readFile(
    jsonDirectory + '/MorePackageDetails.json',
    'utf8'
  );
  return {
    props: {
      packageDataAll: JSON.parse(packageDataAll),
      morePackageData: JSON.parse(morePackageData),
    },
  };
}
