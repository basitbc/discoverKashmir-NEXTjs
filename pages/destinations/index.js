import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import HeroSection from '../../Components/HeroSection';

const destination = ({ destinationData, districts }) => {
  const { destinationsBanner } = useSiteSettings();
  // Districts used to be a hardcoded array here; they are a table now so staff
  // can add one without a code change.
  const Districts = districts.map((d) => d.name);
  return (
    <div>
      <HeroSection src={destinationsBanner} Name={'Destinations'} />
      <Grid container>
        <Grid>
          {Districts.length > 0 &&
            Districts.map((item) => {
              return (
                <DistrictSection
                  key={item}
                  name={item}
                  destinationData={destinationData}
                />
              );
            })}
        </Grid>
      </Grid>
    </div>
  );
};

export default destination;

import DistrictSection from "../../Components/DistrictSection";
import { Grid } from "@mui/material";
import { destinationsService, districtsService } from "../../services";
import { getSiteProps, REVALIDATE_SECONDS } from "../../lib/getSiteProps";
import { useSiteSettings } from '../../context/SiteSettingsContext';

export async function getStaticProps() {
  const [destinationData, districts, siteProps] = await Promise.all([
    destinationsService.listAll(),
    districtsService.listAll(),
    getSiteProps(),
  ]);

  return {
    props: { ...siteProps, destinationData, districts },
    revalidate: REVALIDATE_SECONDS,
  };
}
