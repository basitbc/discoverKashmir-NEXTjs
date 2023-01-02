import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid } from '@mui/material';

const SingleAccordion = (props) => {
  useEffect(() => {
    console.log(props.description);
  }, []);
  const [expand, setExpand] = useState(props.expanded);
  const handleExpand = () => {
    if (expand) {
      setExpand(false);
    } else {
      setExpand(true);
    }
  };

  return (
    <Grid>
      <Accordion
        expanded={expand}
        onChange={() => {
          handleExpand();
        }}
      >
        <AccordionSummary
          sx={{ background: '#DC834E', border: '0px solid' }}
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography
            sx={{
              fontFamily: "'Raleway', sans-serif",
              color: 'white',
              fontWeight: '700',
              fontSize: '17px',
            }}
          >
            {props.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ mt: '20px' }}>
          <ul style={{ paddingLeft: '10px' }}>
            {props?.description?.map((item) => {
              return (
                <li
                  style={{
                    color: 'gray',
                    paddingLeft: '5px',
                    fontFamily: "'Raleway', sans-serif",
                    marginBottom: '16px',
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default SingleAccordion;
