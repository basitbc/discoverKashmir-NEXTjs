import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import HeroSection from '../../Components/HeroSection';

const destination = ({ destinationData }) => {
  const Districts = [
    'Srinagar',
    'Baramulla',
    'Anantnag',
    'Budgam',
    'Ganderbal',
    'Bandipora',
  ];
  console.log(destinationData);
  return (
    <div>
      <HeroSection
        usedIn='Destinations'
        bgImage='background.jpg'
        Name={'Destinations'}
      />
      <Grid container>
        <Grid>
          {Districts.length > 0 &&
            Districts.map((item) => {
              return (
                <DistrictSection
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

import path from 'path';
import fsPromises from 'fs/promises';
import DistrictSection from '../../Components/DistrictSection';
import { Grid } from '@mui/material';
export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), 'Data');
  const destinationData = await fsPromises.readFile(
    jsonDirectory + '/Destinations.json',
    'utf8'
  );
  return {
    props: { destinationData: JSON.parse(destinationData) },
  };
}
