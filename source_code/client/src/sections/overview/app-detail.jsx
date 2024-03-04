import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from '../../components/chart';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import SvgColor from '../../components/svg-color';
import { ReactComponent as ReservationIcon } from '../../icons/calendar-cheak.svg';

import 'primeicons/primeicons.css';
import { Typography } from '@mui/material';



export default function AppWebsiteVisits({ title, subheader, chart, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} style={{fontSize:'32px'}} />
      <Box container style={{padding:'0px'}}>        
<Grid2 lg={12} cstyle={{padding:'0px'}}>
  <Grid2 container  spacing={3} style={{padding:'0px'}}>
    <Grid2 lg={3}>
        <ReservationIcon style={{width:'16px' ,height:'16px' ,borderColor:'#708090'}}/>
    </Grid2>
    <Grid2 lg={3}>
        <i className='pi pi-calendar-plus' style={{color:'#708090'}}/>
    </Grid2>
    <Grid2 lg={3}>
    <i className='pi pi-calendar-minus' style={{color:'#708090'}}/> 
    </Grid2>
      <Grid2 lg={3}>
    <i className='pi pi-building' style={{color:'#708090'}}/> 
    </Grid2>
      </Grid2>
</Grid2>

<Grid2 lg={12} style={{padding:'0px'}}>
  <Grid2 container  spacing={3}>
    <Grid2 lg={3}>
        <h3>
           50
        </h3>
    </Grid2>
    <Grid2 lg={3}>
       
         <h3>
            20
        </h3>
    </Grid2>
    <Grid2 lg={3}>
      <h3>
            18
        </h3>
    </Grid2>
      <Grid2 lg={3}>
     <h3>
            32
        </h3>
    </Grid2>
      </Grid2>
</Grid2>

<Grid2 lg={12} columnGap={1}  style={{padding:'0px'}}>
    <Grid2 container >
    <Grid2 lg={3} style={{color:':#708090' ,textDecoration:'underline'}}>
        Booking
    </Grid2>
    <Grid2 lg={3} style={{color:':#708090' ,textDecoration:'underline'}}>
        Check in
    </Grid2>
    <Grid2 lg={3} style={{color:':#708090' ,textDecoration:'underline'}}>
    Check out
    </Grid2>
      <Grid2 lg={3} style={{color:':#708090' ,textDecoration:'underline'}}>
    Stay now
    </Grid2>
      </Grid2>
    </Grid2>
</Box>
    </Card>
  );
}

AppWebsiteVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
