import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Grid } from '@mui/material';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `0px solid ${theme.palette.divider}`,
  width: '100%',
  borderRadius: '12px',
  marginBottom: '20px',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const PackageAccordain = ({ tourPlan }) => {
  useEffect(() => {
    console.log(tourPlan);
  }, []);

  const [expanded, setExpanded] = React.useState(0);

  const handleChange = (index) => (event, newExpanded) => {
    setExpanded(newExpanded ? index : false);
  };
  return (
    <Grid container sx={{ mt: '30px' }}>
      {tourPlan.map((item, index) =>
        item.day !== '' && item.title !== '' && item.description !== '' ? (
          <Accordion
            expanded={expanded === index}
            onChange={handleChange(index)}
          >
            <AccordionSummary
              aria-controls='panel1d-content'
              id='panel1d-header'
            >
              <Typography
                sx={{
                  color: '#DC834E',
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: '700',
                }}
              >
                <LocationOnOutlinedIcon
                  style={{ color: 'black', marginRight: '10px' }}
                />
                Day {item.day} : {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'gray', padding: '0 0 0 30px' }}>
                {item.description}
              </Typography>
              {item.note ? (
                <Typography sx={{ color: 'gray', paddingTop: '20px' }}>
                  <span
                    style={{
                      color: 'black',
                      fontWeight: '500',
                    }}
                  >
                    Note:{' '}
                  </span>
                  {item.note}
                </Typography>
              ) : null}
            </AccordionDetails>
          </Accordion>
        ) : null
      )}
    </Grid>
  );
};

export default PackageAccordain;
