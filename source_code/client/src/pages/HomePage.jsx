import React ,{useState,useRef,useEffect} from 'react';
import PropTypes from 'prop-types';
import './GalleriaAdvancedDemo.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from '../components/AppAppBar';
import Hero from '../components/Hero';
import LogoCollection from '../components/LogoCollection';
import Highlights from '../components/Highlights';
import Pricing from '../components/Pricing';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import getLPTheme from '../components/getLPTheme';
import { Carousel } from 'primereact/carousel';
//import {Card} from 'primereact/card';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Message} from 'primereact/message';
import {InputNumber} from 'primereact/inputnumber'
import {MultiSelect} from 'primereact/multiselect'  
import {Button} from 'primereact/button'  
import MaterialButton from '@mui/material/Button';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {OverlayPanel} from 'primereact/overlaypanel'
import { Typography } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {InputText} from 'primereact/inputtext';
import {InputMask} from 'primereact/inputmask';
import TemplateDemo from './TemplateDemo';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import {Checkbox} from 'primereact/checkbox';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

import { loadStripe } from '@stripe/stripe-js';

import { useNavigate, redirect, useLoaderData, Outlet } from 'react-router-dom';

import  socket  from './socket';
import { ConsoleSqlOutlined } from '@ant-design/icons'; 
import Profile from './Profile.jsx';
import {Dialog} from 'primereact/dialog'; 
import Avatar from '@mui/material/Avatar';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import L from 'leaflet';
// import 'leaflet-routing-machine';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import Conformation from './Conformation.jsx'
import  DataView from './RoomDataView.jsx';
import MapComponent from './MapComponent.jsx';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPEKEY);

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function LandingPage() {
  const carouselRef = useRef(null);
const calendar=useRef()
  const [isCalendarOpen, setCalendarOpen] = useState(false);
const[calendarError,setCalendarError]=useState(false);
const [errorMesage,setErrorMessage]=useState('');
const currentDate = dayjs();
const secondDate=currentDate.add(2,'day').format('YYYY-MM-DD');
  const [date, setDate] = useState([
    dayjs(currentDate),
    dayjs(secondDate),
  ]);
  const [login, setLogin] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const op = useRef(null);
    const [activeStep, setActiveStep] = React.useState(0);
      const steps = ['Rooms', 'Gust Details', 'Payment', 'Confirmation'];
      const steps1 = [
  'Confirmed',
  'Check In',
  'Qualification',
  'Checkout'
];

  const handleNotification = (userRoomDetail) => {
    
   setUserRoomData(userRoomDetail)
    setShowNotification(true);
     confirm('bottom-right')
  };
      socket.on('checkoutApproaching', handleNotification);
        const [skipped, setSkipped] = React.useState(new Set());
  
  const [failedStep,setStepFailed]=useState([]);
        const [floor, setFloor] = useState(6);
    const [adult ,setAdult]=useState(0);
  const [children,setChildren]=useState(0)
    const [featchedRoom,setFeatchedRoom]=useState({rooms:null,noRoom:true});
const [guestData,setGuestData]=useState({firstName:'',lastName:'',emailAddress:'',phone:'',idCardPic:''});

    const resData = useLoaderData();

    const [roomType, setRoomType] = useState(null)
    const [activeItem, setActiveItem] = useState('Home');
  const [mode, setMode] = useState('light');
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
      const toast = useRef(null);
const navigate=useNavigate();
  const [paymentStat, setPaymentStatus] = useState(null); 
const [selectRoom,setSelectRoom]=useState()

const [userRoomData,setUserRoomData]=useState()
const [acceptTheRoom,setAcceptTheRoom]=useState(false)
const goToProfile=()=>{
  console.log('redirected but not working')
navigate('/profile')
}

    
  const accept = () => {
          setActiveStep(1);
    setActiveItem('search');
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
      setAcceptTheRoom(false)
      localStorage.removeItem('selectedRoom')
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirm1 = (message) => {
        confirmDialog({
            message,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    }; 

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };
  const searchHandler = () => {
      setActiveItem('search')
socket.emit('searchRoom','hello server')
    // navigate('/guest')
   
  }
let optionalStep=[];
  const isStepFailed = (step) => {
   return failedStep.includes(step);
  };

const isStepOptional=(step)=>{
return optionalStep.includes(step)
}
// if (!isStepOptional(activeStep)) {
//   // You probably want to guard against something like this,
//   // it should never occur unless someone's actively trying to break something.
//   throw new Error("You can't skip a step that isn't optional.");
// }

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

const searchRoomHandler=async(e)=>{
e.preventDefault();

const searchRoom = {adult ,children ,date ,floor,roomType};
const response= await fetch(`http://${process.env.REACT_APP_SERVERURL}/rooms/searchroom`,{
  method:'POST',
  headers:{
  'Content-Type':'application/json'
    },
  body:JSON.stringify(searchRoom)
})
const resData=await response.json()
console.log(resData)
if(resData.noRoom){
  setFeatchedRoom((prvValue)=>{
  return {rooms:resData.rooms,noRoom:true}
})

}
else{
setFeatchedRoom((prvValue)=>{
  return {noRoom:false,rooms:resData.rooms}})
}

// featchedRoom.rooms.forEach(room=>{
//   if(room.feature!=null)
//   JSON.parse(room.features).forEach(feature=>{
//     console.log(feature)
//   })
// })
}





  const toggleCustomTheme = () => {
//     featchedRoom.rooms.map(room=>{
//   if(room.feature!=null)
//   JSON.parse(room.features).map(feature=>{
//     console.log(feature)
//   })
// })
    setShowCustomTheme((prev) => !prev);
  };
  const images = [
    { source: '/assets/images/carousel/1.png', alt: 'Image 1' },
    { source: '/assets/images/carousel/2.png', alt: 'Image 2' },
    { source: '/assets/images/carousel/3.png', alt: 'Image 3' },
    { source: '/assets/images/carousel/4.png', alt: 'Image 4' },
    { source: '/assets/images/carousel/5.png', alt: 'Image 5' }
  ];
    const typeOpetion = [
    { name: 'Single Room', code: 'SR' },
    { name: 'Double Room', code: 'DR' },
    { name: 'Suite', code: 'SU' },
    { name: 'Family Room', code: 'FR' },
    { name: 'Group Room', code: 'GR' },
    { name: 'Accessible Room', code: 'AR' },

  ];
    const itemTemplate = (item) => {
    return <img src={item.source} alt={item.alt} />;
  };

const handleDateChange = (newValue) => {
  const startDate = newValue[0];
  const endDate = newValue[1];

  // Check if both start and end dates are selected
  if (startDate && endDate) {
    // Convert disabledRanges to dayjs objects


    // Check if any date within the selected range is disabled
    const includesDisabledRange = disabledRanges.some(disabledRange =>
      (startDate.isBefore(disabledRange.checkinDate, 'day') && endDate.isAfter(disabledRange.checkoutDate, 'day'))
    );

    if (includesDisabledRange) {
      setCalendarError(true);
      setErrorMessage('One or more selected date ranges are reserved.');
    } else {
      setCalendarError(false);
      setErrorMessage('');
    }
  } else {
    setCalendarError(false);
    setErrorMessage('');
  }

  setDate(newValue);
};
const shouldDisableDate = (day) => {
  return disabledRanges.some(disabledRange =>
    day.isSame(disabledRange.checkinDate, 'day') ||
    day.isSame(disabledRange.checkoutDate, 'day') ||
    (day.isAfter(disabledRange.checkinDate, 'day') && day.isBefore(disabledRange.checkoutDate, 'day'))
  );
};
const disabledRanges=resData.reservedData.map(range => ({
      checkinDate: dayjs(range.checkinDate),
      checkoutDate: dayjs(range.checkoutDate)
    }));
const gotoNext=(selectedRoom=null,withSpaAndFood=false)=>{
  console.log(selectedRoom)
if(resData.error){
 localStorage.setItem('selectedRoom', JSON.stringify({...selectedRoom,withSpaAndFood}));
console.log(localStorage.getItem('selectedRoom'))
  return  navigate('/login',selectedRoom)
}
localStorage.setItem('selectedRoom', JSON.stringify(selectedRoom));

    handleNext(true)
  
 }
const handleNext = (wheatherToNext=false) => {
  console.log('Called')
    let newSkipped = skipped;
    if(wheatherToNext){
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  } else{
    toast.current.show({ severity: 'warn', summary: 'warning', detail: "You can't skip this Step " })
  }
  };

const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
const submitCurrentUserData=(e)=>{
e.preventDefault()
handleNext(true)
}
const uploads=(imageFile)=>{
  setGuestData((prvValue)=>{
    return {...prvValue,idCardPic:imageFile}
  })
  toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
}
const [amount, setAmount] = useState(30);
const [userData, setUserData] = useState({firstName:'',lastName:''});
const [isCheckoutApproching,setCheckoutApproching]=useState(false);
useEffect(() => {


  // let currentUserLocation;
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       let lat = position.coords.latitude;
  //       let lon = position.coords.longitude;
  //       currentUserLocation = [lat, lon];

  //       var map = L.map('map').setView(currentUserLocation, 13);

  //       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //         maxZoom: 19
  //       }).addTo(map);

  //       var endPoint = [8.5373522, 37.9556175]; // Example end point (Los Angeles)

  //       L.Routing.control({
  //         waypoints: [
  //           L.latLng(currentUserLocation),
  //           L.latLng(endPoint)
  //         ],
  //         serviceUrl: 'https://router.project-osrm.org/route/v1'
  //       }).addTo(map);
  //     });
  //   }







  handleCheckStatus()

  const roomIsSet=localStorage.getItem('selectedRoom')
if(roomIsSet&&paymentStat==='paid'){
  successPaid();
 return;
} else if(roomIsSet&& (paymentStat==='unpaid'||paymentStat==='unknown')){
  paymentFaild()
   return;
}else if(roomIsSet){
    const selecByUserRoom=JSON.parse(roomIsSet)
  confirm1(`Do you want to continue booking the selected room :" ${selecByUserRoom.roomName} " room number ${selecByUserRoom.roomNumber}`)
}



if(resData.error){
setLogin(false)
}
  

}, [login,paymentStat]);



  if (!resData.error) {

    if(userData.firstName===''){
    setUserData({...resData.user })
  setGuestData({firstName:resData.user.firstName,lastName:resData.user.lastName,emailAddress:resData.user.emailAddress})
  console.log(resData)        
    socket.emit('userName',[resData.user.userName,resData.user.user_type])
  setLogin(true)
}

}
    const accept1 = () => {
       socket.emit('acceptCheckout',JSON.stringify(userRoomData))
      
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted To Chekout Staff will Visit Your Room Now!!! Be There!!!', life: 3000 });
    }

    const reject1 = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });

    }
    const rejectToCheckout=()=>{
    }
        const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
                    {/* <Avatar
          src={"https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"}
          alt={"https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {userData.firstName.charAt(0).toUpperCase()}
        </Avatar> */}


<IconButton color="primary">
  <SettingsIcon />
</IconButton>
            <span className="font-bold white-space-nowrap">New Message From System</span>
        </div>
    );
    const confirm = (position) => {
   
        confirmDialog({
            message: 'Your Chekout Date is Approcing do you to Chekout now?',
            header: (<div className="inline-flex align-items-center justify-content-center gap-2">
                    {/* <Avatar
          src={"https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"}
          alt={"https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {userData.firstName.charAt(0).toUpperCase()}
        </Avatar> */}


<IconButton color="primary">
  <SettingsIcon />
</IconButton>
            <span className="font-bold white-space-nowrap">New Message From System</span>
        </div>),
            icon: 'pi pi-warn-circle',
            position,
            accept:accept1,
            reject:reject1
        });
    };
    

  // console.log(featchedRoom)
  // socket.on('checkoutApproaching', handleNotification);
const successPaid = async () => {
const selectedRoom=JSON.parse( localStorage.getItem('selectedRoom'))
  const userDataFinal = JSON.parse(localStorage.getItem('guestData'));

  setSelectRoom(selectedRoom)
  const sessionId=localStorage.getItem('sessionId');
  const [checkin,checkout]=date;
const checkinDate=checkin.format('YYYY-MM-DD');
const checkoutDate=checkout.format('YYYY-MM-DD');
console.log(selectedRoom)
  const reservationData = {
    guestId: userData.id,
    roomId: selectedRoom.id,
    checkinDate,
    checkoutDate,
    withBreackFast: selectedRoom.withSpaAndFood,
  };
console.log(userData)
  const formData = new FormData();
  formData.append('guestId', userData.id);
  formData.append('roomId', selectedRoom.id);
  formData.append('checkinDate', checkinDate);
  formData.append('checkoutDate', checkoutDate);
  formData.append('price',selectedRoom.price);
  formData.append('sessionId',sessionId)
  formData.append('withBreackFast', selectedRoom.withSpaAndFood);

  const fileUploadresponse= await fetch(userDataFinal.idCardPic[0])
    const blob = await fileUploadresponse.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });
  formData.append('identificationCardPic',file)
  try {
    const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/reservation/create`, {
  method: 'POST',
  body: formData,
});
const res=await response.json();
console.log(res)
    if (response.ok) {

      setActiveItem('search');
      setStepFailed([]);
      setActiveStep(3);
      setPaymentStatus(null);
    } else {
      console.log('Failed to create reservation.');
    }
  } catch (error) {
    console.error('Error in POST request:', error);
  }
};

const paymentFaild=()=>{
  setActiveStep(2)
     setStepFailed([2])
  setActiveItem('search')
}


 const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/payment/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount,userId:userData.id }),
      });
      const { sessionId } = await response.json();
localStorage.setItem('sessionId',sessionId)
console.log(sessionId)
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };


    const handleCheckStatus = async () => {
  try {
    const userSession = localStorage.getItem('sessionId');
    if(userSession){
    const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/payment/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: userSession }), // Corrected line
      credentials: 'include',
    });
    const { paymentStatus } = await response.json();
setPaymentStatus(paymentStatus);
 }
 } catch (error) {
    console.error('Error checking payment status:', error);
  }
};


const handleBook=(room)=>{
const withSpaAndFood =false;
  if(resData.error){
 localStorage.setItem('selectedRoom', JSON.stringify({...room.selectedRoom,withSpaAndFood}));
const selectedRoom=localStorage.getItem('selectedRoom')
  return  navigate('/login',selectedRoom)
}
localStorage.setItem('selectedRoom', JSON.stringify(room.selectedRoom));
setDate(room.date)
setActiveItem('search')
  setActiveStep(1)
    

}
const getNotification= async()=>{
    const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/users/getNotifications`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName:resData.user.userName })
  })
  const result = await response.json()
  console.log(result)
  return result;
}
const [agreement,setAgreement]=useState();


    const renderContent=()=>{
      switch (activeItem) {
      case 'Home':
        return  <div> 
      <div>
          <Carousel value={images} itemTemplate={itemTemplate} numVisible={1} className="custom-carousel" circular={true}
            autoplayInterval={3000} numScroll={1} responsiveOptions={[{ '1024px': { numVisible: 2, numScroll: 1 } }]}>
            ref={carouselRef}
          </Carousel>
          <Card style={{ position: 'relative', top: '-130px', margin: '30px 30px 0px 30px' }} title="Check Room Availability">
           <CardContent>
            <div className="card flex  gap-3 p-fluid">
              <div className="flex-auto">
                <label htmlFor="minmax-buttons" className="font-bold block mb-2">Check in Date</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    label="Checkin/Checkout"
                     ref={calendar}
                    disablePast={true}
                    onChange={handleDateChange}
                    localeText={{ start: 'Check-in', end: 'Check-out' }}       
                     slots={{ field: SingleInputDateRangeField }}
                       shouldDisableDate={shouldDisableDate}
                        allowSameDateSelection
                  />
                  {calendarError&&<Message severity="error" style={{marginTop:'5px'}} text={errorMesage}></Message>}
                </LocalizationProvider>
                {calendarError&&<Message severity="error" style={{marginTop:'5px'}} text={errorMesage}></Message>}
              </div>

              <div className="flex-auto">
                <label htmlFor="minmax-buttons" className="font-bold block mb-2">Floor</label>
                <InputNumber style={{ height: '63px', paddingTop: '10px', paddingBottom: '0px' }} className='p-inputtext-sm custom-button-height' inputId="minmax-buttons" value={floor} onValueChange={(e) => setFloor(e.value)} mode="decimal" showButtons min={0} max={6} />
              </div>
              {/* <div className="flex-auto">
                <label htmlFor="minmax-buttons" className="font-bold block mb-2">Max people</label>
                <InputNumber style={{ height: '63px', paddingTop: '10px', paddingBottom: '0px' }} inputId="minmax-buttons" value={maxPeople} onValueChange={(e) => setMaxPeople(e.value)} mode="decimal" showButtons min={0} max={6} />
              </div> */}
              <div className="flex-auto">
                <label htmlFor="price" className="font-bold">
                  Room Type
                </label>
                <MultiSelect
                  value={roomType}
                  name="roomType"
                  onChange={(e) => setRoomType(e.value)}
                  options={typeOpetion}
                  optionLabel="name"
                  filter
                  placeholder="Select Room Type"
                  maxSelectedLabels={3}
                  style={{ height: '69px', paddingTop: '10px', paddingBottom: '0px' }}
                  className="w-full sm:w-15rem custom-multiselect"
                />
              </div>
              <div className='flex-auto' >
                <label htmlFor="minmax-buttons" className="font-bold block mb-2 p-ml-2 custom-button">     .</label>
                <Button style={{ height: '63px', paddingTop: '10px', paddingBottom: '0px' }} icon="pi pi-search" label='Search' severity="info" aria-label="Search user" className="p-ml-2"
                  onClick={searchHandler} />
              </div>
            </div>
            </CardContent>
          </Card>
                <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
        </div>
    
      <div >
        <DataView handleBook={handleBook} />
        <Divider />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <FAQ />
        <Divider />
      <MapComponent />
        <Divider />
        <Footer />
      </div>
      </div>
      break;  
      case 'search':
        return <div className='app_row'>
                <div>
          <Carousel value={images} itemTemplate={itemTemplate} numVisible={1} className="custom-carousel" circular={true}
            autoplayInterval={3000} numScroll={1} responsiveOptions={[{ '1024px': { numVisible: 2, numScroll: 1 } }]}>
            ref={carouselRef}
          </Carousel>
          {/* <Card style={{ position: 'relative', top: '-130px', margin: '30px' }} title="Check Room Availability">
           <CardContent>
            <div className="card flex  gap-3 p-fluid">
              <div className="flex-auto">
                <label htmlFor="minmax-buttons" className="font-bold block mb-2">Check in Date</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    label="Checkin/Checkout"
                     ref={calendar}
                    disablePast={true}
                    onChange={handleDateChange}
                    localeText={{ start: 'Check-in', end: 'Check-out' }}       
                     slots={{ field: SingleInputDateRangeField }}
                       shouldDisableDate={shouldDisableDate}
                        allowSameDateSelection
                  />
                  {calendarError&&<Message severity="error" style={{marginTop:'5px'}} text={errorMesage}></Message>}
                </LocalizationProvider>
                {calendarError&&<Message severity="error" style={{marginTop:'5px'}} text={errorMesage}></Message>}
              </div>

              <div className="flex-auto">
                <label htmlFor="minmax-buttons" className="font-bold block mb-2">Floor</label>
                <InputNumber style={{ height: '63px', paddingTop: '10px', paddingBottom: '0px' }} className='p-inputtext-sm custom-button-height' inputId="minmax-buttons" value={floor} onValueChange={(e) => setFloor(e.value)} mode="decimal" showButtons min={0} max={6} />
              </div>
              {/* <div className="flex-auto">
                <label htmlFor="minmax-buttons" className="font-bold block mb-2">Max people</label>
                <InputNumber style={{ height: '63px', paddingTop: '10px', paddingBottom: '0px' }} inputId="minmax-buttons" value={maxPeople} onValueChange={(e) => setMaxPeople(e.value)} mode="decimal" showButtons min={0} max={6} />
              </div> 
              <div className="flex-auto">
                <label htmlFor="price" className="font-bold">
                  Room Type
                </label>
                <MultiSelect
                  value={roomType}
                  name="roomType"
                  onChange={(e) => setRoomType(e.value)}
                  options={typeOpetion}
                  optionLabel="name"
                  filter
                  placeholder="Select Room Type"
                  maxSelectedLabels={3}
                  style={{ height: '69px', paddingTop: '10px', paddingBottom: '0px' }}
                  className="w-full sm:w-15rem custom-multiselect"
                />
              </div>
              <div className='flex-auto' >
                <label htmlFor="minmax-buttons" className="font-bold block mb-2 p-ml-2 custom-button">     .</label>
                <Button style={{ height: '63px', paddingTop: '10px', paddingBottom: '0px' }} icon="pi pi-search" label='Search' severity="info" aria-label="Search user" className="p-ml-2"
                  onClick={searchHandler} />
              </div>
            </div>
            </CardContent>
          </Card> */}
        </div>
          <main id="mainContent" className="app_col-sm-12 app_col-md-12 app_col-lg-8">
          <form onSubmit={searchRoomHandler} method='post' >
            <div className="search-bar-container_top" style={{ border: "1px solid #333" }}>
              <div className="search-bar-container_guestsWrapper" >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    label="Checkin/Checkout"
                     ref={calendar}
                    disablePast={true}
                    onChange={handleDateChange}
                    localeText={{ start: 'Check-in', end: 'Check-out' }}       
                     slots={{ field: SingleInputDateRangeField }}
                       shouldDisableDate={shouldDisableDate}
                        allowSameDateSelection
                  />
                  {calendarError&&<Message severity="error" style={{marginTop:'5px'}} text={errorMesage}></Message>}
                </LocalizationProvider>
                  
              
                <MaterialButton startIcon={<PeopleAltIcon />} onClick={(e) => op.current.toggle(e)} className="search-bar-container_guests"
                  aria-expanded="false" aria-controls="guests-selection-flyout">
                    <span>Guests {adult}  Adult,{children} Children</span>
                </MaterialButton>
                <OverlayPanel style={{ width: '190px' }} ref={op}>

                  <Typography>Adults</Typography>
                  <InputNumber value={adult} onValueChange={(e) => setAdult(e.value)} showButtons buttonLayout="horizontal" step={1}
                    decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" showButtons style={{ maxWidth: '30px' }}
                    decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />


                  <Typography>Children</Typography>
                  <InputNumber value={children} onValueChange={(e) => setChildren(e.value)} showButtons buttonLayout="horizontal" step={1}
                    decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" showButtons style={{ maxWidth: '30px' }}
                    decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingTop: '10px' }}>
                    <Button style={{ paddingLeft: '13px' }} label='Cancel' outlined text  onClick={(e)=>{
                      op.current.toggle(e); setAdult(0); setChildren(0);
                    }}/>
                    <Button label='Save'  style={{ paddingLeft: '13px' }} onClick={(e)=>{
                      op.current.toggle(e);
                    }} />
                  </div>

                </OverlayPanel>


              
              </div>
          
            </div>
            <div className="app_row" style={{ float: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'end', marginTop: isCalendarOpen ? '-200px' : '0', transition: 'margin-top 0.3s' }} >
              <Divider style={{ display: 'block' }} />
              <div>
                <Button style={{ paddingRight: '13px' }} label="Cancel" icon="pi pi-cancel" outlined text />
                <Button label="Search" type='submit' icon="pi pi-search" />
              </div>

            </div>
            </form>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep} sx={{padding: '30px 0px'}}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
               
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Not Successfull
              </Typography>
            );

            labelProps.error = true;
          }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>

                    </Step>
                  );
                })}
              </Stepper>

              {activeStep === 0&&
                featchedRoom.noRoom&&activeStep===0?(
                <Card > No room Available </Card>)
                :activeStep===0&&(
                <div className='card'>  
          {featchedRoom.rooms.map(element => (

            <div>
          <div className="thumb-cards_groupedCards app_col-sm-12 app_col-md-12 app_col-lg-12" id="auto-parent-card-0">
              <div className="thumb-cards_cardSplit thumb-cards_byRoom" data-room-code="A2T">
                  <div className="thumb-cards_container">
                      <div className="thumb-cards_extraDetails app_col-sm-12 app_col-md-4 app_col-lg-4">
                          <div className="thumb-cards_imgWrapper thumb-cards_hasMultipleImages">
                              <img
                                  src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${JSON.parse(element.roomImage)[0]}`}
                                  alt="Petit Room" />
                          </div>
                          <div className="thumb-cards_amenitiesList">
                              
                              {element.features?(
                                
                                 <ul className="product-icons_iconList">
                                  {  JSON.parse(element.features).map((feature)=>{
                                     return (
                                  <li className="product-icons_deskLamp">
                                    <span aria-hidden="true"></span>
                                        <span>
                                          {feature.name}
                                          </span>
                                          </li>
                                  )})}

                                  {
                                 
                                  /* <li className="product-icons_wifi"><span aria-hidden="true"></span><span>Free
                                          Wifi</span></li>
                                  <li className="product-icons_hairDryer"><span aria-hidden="true"></span><span>Hair
                                          Dryer</span></li>
                                  <li className="product-icons_nonSmoking"><span
                                          aria-hidden="true"></span><span>Non-smoking</span></li>
                                  <li className="product-icons_safe"><span aria-hidden="true"></span><span>Safe in
                                          Room</span></li> */}
                              </ul>
                              ):(<p>no features available for this room</p>)
                              }
                             
                          </div>
                      </div>
                      <div className="app_col-sm-12 app_col-md-8 app_col-lg-8">
                          <div className="thumb-cards_cardHeader">
                              <h2 className="app_heading1">{element.roomName}</h2>
                              <div className="thumb-cards_urgencyTriggerAndRoomInfo">
                                  <div className="guests-and-roomsize_roomProperties">
                                      <div className="guests-and-roomsize_item guests-and-roomsize_guests">
                                          <span>{element.roomType}</span>
                                      </div>
                                      <div className="guests-and-roomsize_item guests-and-roomsize_bed">
                                          <span>{element.adult} Adults, {element.children} Children</span>
                                      </div>
                                      <div className="guests-and-roomsize_item guests-and-roomsize_size">{element.area} <span
                                              aria-hidden="true"
                                              for="room-size-meters-sreader-A2T"><span>m²</span></span><span
                                              className="sr-only" id="room-size-meters-sreader-A2T">square meters</span>
                                      </div>
                                  </div>
                              </div>
                              <div className="thumb-cards_roomShortDesc">{element.roomName}</div>
                          </div>
                          <div className="thumb-cards_detailsLink">
                            <MaterialButton href="#"
                                  aria-label="Room details for Petit Room">
                                    Room details
                            </MaterialButton></div>
                          <div data-rate-code="L05" className="thumb-cards_rate thumb-cards_show"
                              id="auto-child-card-A2T1">
                              <div className="thumb-cards_cardItem">
                                  <div className="thumb-cards_details">
                                      <div className="thumb-cards_left">
                                          <h3 className="app_subheading2"><MaterialButton href="#"
                                                  aria-label="Details for Petit Room Best Available Rate Breakfast Inclusive">
                                                    Best Available Rate Breakfast Inclusive</MaterialButton></h3>
                                          <ul className="product-icons_iconList">
                                              <li className="product-icons_coffee product-icons_bold"><span>Breakfast Included</span></li>
                                          </ul>
                                          <div className="thumb-cards_rateShortDesc">
                                              <li>Access to the Spa Circuit </li>
                                          </div>
                                      </div>
                                      <div className="thumb-cards_right">
                                          <div className="thumb-cards_priceMessages">
                                              <div className="thumb-cards_priceContainer">
                                                  <div className="thumb-cards_price"><span>€{element.price+250}</span></div>
                                                  <div className="thumb-cards_frequency thumb-cards_primaryPriceText">
                                                      <span className="price-and-nights-text_perNight"><span>Per
                                                              Night</span></span></div>
                                                  <div className="thumb-cards_taxesFees">
                                                    <span>Including Taxes &amp;
                                                          Fees</span></div>
                                              </div>
                                          </div>
                                          <div className="thumb-cards_button">
                                          <MaterialButton
                                          onClick={()=>{
                                            gotoNext(element,false)
                                          }}
                                            variant="contained"
                                                  className="button_btn button_primary button_sm"
                                                  datatest="Button">
                                                    <span>Book Now</span>
                                              </MaterialButton >
                                            </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div data-rate-code="L05" className="thumb-cards_rate thumb-cards_show"
                              id="auto-child-card-A2T1">
                              <div className="thumb-cards_cardItem">
                                  <div className="thumb-cards_details">
                                      <div className="thumb-cards_left">
                                          <h3 className="app_subheading2"><MaterialButton href="#"
                                                  aria-label="Details for Petit Room Best Available Rate Breakfast Inclusive">Best
                                                  Standard Room Booking</MaterialButton>
                                          </h3>
                                      </div>
                                      <div className="thumb-cards_right">
                                          <div className="thumb-cards_priceMessages">
                                              <div className="thumb-cards_priceContainer">
                                                  <div className="thumb-cards_price"><span>€{element.price}</span></div>
                                                  <div className="thumb-cards_frequency thumb-cards_primaryPriceText">
                                                      <span className="price-and-nights-text_perNight"><span>Per
                                                              Night</span></span></div>
                                                  <div className="thumb-cards_taxesFees"><span>Including Taxes &amp;
                                                          Fees</span></div>
                                              </div>
                                          </div>
                                          <div className="thumb-cards_button">
                                          <MaterialButton
                                          onClick={(e)=>{
                                              gotoNext(element,false);
                                          }}
                                            variant="contained"
                                                  className="button_btn button_primary button_sm"
                                                  datatest="Button">
                                                    <span>Book Now</span>
                                              </MaterialButton >
                                            </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>    
    ))
    }

                </div>)
      }


              {activeStep === 1 && (


  <div className="col-12">
                <div className="card">
                    <h5>Guest Information</h5>
                  <form onSubmit={submitCurrentUserData} method='post' encType='multipart/form-data'>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="firstname2">Firstname</label>
                            <InputText value={guestData.firstName}  id="firstname2" type="text" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="lastname2">Lastname</label>
                            <InputText value={guestData.lastName} id="lastname2" type="text" />
                        </div>
                    </div>
                      <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="firstname2">Phone</label>
                            <InputMask value={guestData.phone} onChange={(e)=>{setGuestData((prevValue)=>{ return {...prevValue,phone:e.value}  })}} id="phone" mask="(999) 999-9999" placeholder="(999) 999-9999"></InputMask>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="lastname2">Email adress</label>
                            <InputText value={guestData.emailAddress} onChange={(e)=>{
                              setGuestData((prevValue)=>{
                                return {...prevValue,emailAddress:e.value}
                              })
                            }}  id="lastname2" type="text" />
                        </div>

                    </div>
                      <div className="p-fluid formgrid grid">
                      <div className="field col-12">
                     <TemplateDemo multiple='none' uploads={uploads} message='Drag and drop the id Card Picture here'/>
                     </div>
                     </div> 
                  {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingTop: '10px' }}>
                    <Button style={{ paddingLeft: '13px' }} label='Cancel' outlined text />
                    <Button label='Submit'  style={{ paddingLeft: '13px' }} type='submit' onclick={()=>{
                          handleNext(true)
                    }} />
                  </div> */}
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                      label='Back'
                   />
                      
                    
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={()=>{ 
                      setUserData((prv)=>{
                        return {...prv,...guestData}
                      })
                    localStorage.setItem('guestData',JSON.stringify(guestData))  
                      handleNext(true)
                    }
                    }
                     label={activeStep === steps.length - 1 ? 'Finish' : 'Continue Booking'}
                    type='submit'
                    /> 
                  </Box>
                   
                  </form>
                  </div>

  </div>

              )}
               { activeStep === 2 && (<div>
 <section class="guest-policies_container" style={{paddingLeft:'10px'}}><h2 class="app_heading1"><span>Policies:</span></h2>
 
 <div class="guest-policies_hotelDetails"><div class="guest-policies_checkIn"><b><span>Check-in</span></b><span>After 3:00 PM</span></div><div class="guest-policies_checkOut"><b><span>Check-out</span></b><span>Before 12:00 PM</span></div></div><div class="guest-policies_perRoom"><h3 class="app_subheading1"><span>Room 1 <span>{'Single Room'}</span></span></h3><div class="guest-policies_guaranteePolicy"><h4 class="app_subheading2"><span>Guarantee Policy</span></h4><span>The full amount of the stay will be charged to the Credit Card 48 hours prior to the arrival date.
In the event of a no-show, the full stay will be charged.</span>&nbsp;</div>
<div class="guest-policies_guaranteePolicy"><h4 class="app_subheading2"><span>Guarantee Policy</span></h4><span>Free cancellation is available up to 48 hours before the scheduled arrival date.
In the event of a no-show, the full stay will be charged.
The full amount of the stay will be charged to the Credit Card 48 hours prior to the arrival date.
Cancellation before 48 hours to the arrival date is possible with a refund of 90% of the booking amount.
Cancellation within 48 hours of the arrival date or in the case of a no-show, no refund will be provided (non-refundable).</span>&nbsp;</div>

<div class="guest-policies_guaranteePolicy"><h4 class="app_subheading2"><span>Modification Policy</span></h4><span>
Modifications to the reservation can be made up to 48 hours before the scheduled arrival date, subject to availability.
Changes made within 48 hours of the arrival date may incur additional charges or penalties, depending on the hotel's policy.
Any modifications to the reservation, including changes to the dates, room type, or guest names, are subject to confirmation by the hotel.
Please note that any modifications may be subject to rate differences, and the guest will be responsible for any additional costs incurred due to the changes.</span>&nbsp;</div>





</div></section>
 <section class="policy-acknowledgement_container" style={{paddingLeft:'10px'}}>><h2 class="app_heading1"><span>Acknowledgement</span></h2><b class="policy-acknowledgement_acceptanceOfTermsAndConditions">
  <span>By completing this booking, I agree with the Booking Conditions.</span>
  </b><div class="policy-acknowledgement_privacyCheckbox">
    <Checkbox aria-required="true" aria-labelledby="privacyPolicy_labelled-by" data-error="false" id="privacyPolicy" type="checkbox" value={agreement}  ></Checkbox><
      label for="privacyPolicy"><b>
        <span class="policy-checkbox-description-link_required" aria-hidden="true">
          * </span><span>I agree with the Privacy Terms.</span>
          </b>
          </label>
          <div role="alert"></div>
          </div>
          </section>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={agreement}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                      label='Back'
                   />
                      
                    
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <MaterialButton color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                      </MaterialButton>
                    )}

                    <Button onClick={handlePayment}
                     label={activeStep === steps.length - 1 ? 'Finish' : 'Procced to payment'}
                     severity="info" outlined
                    />
                   
                  </Box>

                
                   
               </div>
                  
                  )
               
               }


               {activeStep ===3 &&(
               <div>
                <div class="card">
        <div class="flex flex-column sm:flex-row sm:justify-content-between sm:align-items-center">
          <span
                class="text-2xl font-medium text-900">Thanks for your Booking!
                </span>
            <div class="flex mt-3 sm:mt-0">
                <div class="flex flex-column align-items-center"><span class="text-900 font-medium mb-2">Reservation
                        ID</span>
                        <span class="text-700">451234</span>
                        </div>
                <div class="flex flex-column align-items-center ml-6 md:ml-8"><span
                        class="text-900 font-medium mb-2">Reservation Date</span><span class="text-700">7 Feb 2023</span>
                </div>
            </div>
        </div>
        <div class="flex flex-column md:flex-row md:align-items-center border-bottom-1 surface-border py-5"><img
                src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${JSON.parse(selectRoom.roomImage)}`} class="w-15rem flex-shrink-0 md:mr-6"
                alt="summary-1-2" />
            <div class="flex-auto mt-3 md:mt-0">
              <span class="text-xl text-900">{selectRoom.roomName}</span>
                <div class="font-medium text-2xl text-900 mt-3 mb-5">Booking Processing</div>
                <div class="border-round overflow-hidden surface-300 mb-3" style={{height: "7px;"}}>
                    <div class="bg-primary border-round w-4 h-full"></div>
                </div>
                <div class="flex w-full justify-content-between">
                  {/* <span
                        class="text-900 text-xs sm:text-base">Ordered</span><span
                        class="text-900 font-medium text-xs sm:text-base">Processing</span><span
                        class="text-500 text-xs sm:text-base">Shipping</span><span
                        class="text-500 text-xs sm:text-base">Delivered</span> */}
                            <Box sx={{ width: '100%' }}>
      <Stepper activeStep={4} alternativeLabel>
        {steps1.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
                        </div>
            </div>
        </div>
        <div class="py-5 flex justify-content-between flex-wrap">
            <div class="flex sm:mr-5 mb-5"><span class="font-medium text-900 text-xl mr-8">{selectRoom.roomName}</span><span
                    class="text-900 text-xl">{selectRoom.price}</span>
                    </div>
            <div class="flex flex-column sm:mr-5 mb-5"><span class="font-medium text-900 text-xl">Hotel
                    Address</span>
                <div class="flex flex-column text-900 mt-3"><span class="mb-1">Celeste Slater</span><span
                        class="mb-1">606-3727 Ullamcorper. Roseville NH 11523</span><span>(786) 713-8616</span></div>
            </div>
            <div class="flex flex-column"><span class="font-medium text-900 text-xl">Payment</span>
                <div class="flex align-items-center mt-3">
                  <img src="assets/images/visa.png"
                        class="w-4rem mr-3" alt="visa-2" />
                    <div class="flex flex-column"><span class="text-900 mb-1">Visa Debit Card</span><span
                            class="text-900 font-medium">**** **** **** 1234</span></div>
                </div>
            </div>
        </div>
         </div>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                      label='Back'
                   />
                      
                    
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <MaterialButton color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                      </MaterialButton>
                    )}

                    <Button disabled={true}
                     label={activeStep === steps.length - 1 ? 'Finished' : 'Finished'}
                     severity="info" outlined
                    />
                   
                  </Box>
               </div>
               )}

              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <MaterialButton onClick={handleReset}>Reset</MaterialButton>
                  </Box> */}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                  {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                      label='Back'
                   />
                      
                    
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <MaterialButton color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                      </MaterialButton>
                    )}

                    <Button onClick={()=>{ handleNext(true)}}
                     label={activeStep === steps.length - 1 ? 'Finish' : 'Continue Booking'}
                    />
                  </Box> */}
                </React.Fragment>
              )}

            </Box>







          </main>
          <aside className="app_col-sm-12 app_col-md-12 app_col-lg-4 reservation-cart-container_collapsed">
            <div className="reservation-cart-container_box">
              <div className="reservation-cart-container_inner"><div className="reservation-cart-container_body">
                <div className="reservation-cart-container_header">
                  <h2 className="app_heading1" id="reservation-cart-header">
                    <span>Your Stay</span></h2><button aria-label="Close" className="reservation-cart-container_close"></button>
                </div><div className="reservation-cart-container_hotelDetails">
                  <div className="reservation-cart-container_checkIn">
                    <b><span>Check-in</span></b><span>After 3:00 PM</span></div>
                  <div className="reservation-cart-container_checkOut"><b><span>Check-out</span></b><span>Before 12:00 PM</span></div></div><div className="reservation-cart-container_summary"><div className="reservation-cart-container_dates"><span>Mon, Apr 1, 2024</span> - <span>Tue, Apr 2, 2024</span></div><div className="reservation-cart-container_guests"><span>1 Adult</span></div></div></div><div className="price-summary_container"><hr className="desktopOnly" /><div className="price-summary_totalPrice"><div className="price-summary_total"><span>Total:</span></div><div className="price-summary_price"><span>€0.00</span></div></div></div></div>
            </div>
          </aside>

        </div>
    }
  }
  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
        <Toast ref={toast} />
       <ConfirmDialog/>
      <AppAppBar getNotification={getNotification} profile={goToProfile} mode={mode} login={login} profilePicture={userData.profilePicture}  toggleColorMode={toggleColorMode} />
     {renderContent()}
   {/* <Dialog
      visible={showNotification}
      onHide={() => setShowNotification(false)}
      header="Checkout Notification"
      footer={<Button label="OK" onClick={() => setShowNotification(false)} />}
    >
      <p>You have 1 hour and 5 minutes left for checkout.</p>
    </Dialog> */}

    </ThemeProvider>
  );
}

export const loader = async () => {

  const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/users/userdata`, {
    method: 'GET',
    credentials: 'include',
  });
  let resData = await response.json();

  const reservedRoom = await fetch(`http://${process.env.REACT_APP_SERVERURL}/rooms/searchreservedroom`)
const reservedData = await reservedRoom.json();
//console.log(reservedData)
const finalResult = {...resData,reservedData}



  return finalResult;
}       