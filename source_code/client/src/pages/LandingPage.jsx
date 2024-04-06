
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';

import './GalleriaAdvancedDemo.css';
import { Card } from 'primereact/card';


import { Carousel } from 'primereact/carousel';
import { InputNumber } from 'primereact/inputnumber'
import { MultiSelect } from 'primereact/multiselect'
import { useNavigate, redirect, useLoaderData } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import ButtonGroup from '@mui/material/ButtonGroup';
import MaterialButton from '@mui/material/Button';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';
import { TextField, InputAdornment, Grid } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Typography } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { OverlayPanel } from 'primereact/overlaypanel';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { Message } from 'primereact/message';
import {Chips} from 'primereact/chips'
import {InputMask} from 'primereact/inputmask'
import { FileUpload } from 'primereact/fileupload';
import TemplateDemo from './TemplateDemo';
import { Toast } from 'primereact/toast';
const LandingPage = () => {

const navigate=useNavigate();
    const toast = useRef(null);
  const steps = ['Rooms', 'Gust Details', 'Payment', 'Confirmation'];
const currentDate = dayjs();
const secondDate=currentDate.add(2,'day').format('YYYY-MM-DD');
  const [roomType, setRoomType] = useState(null)
  const [login, setLogin] = useState(false);
  const resData = useLoaderData();
  const disabledDates =resData.reservedData;

  const [userData, setUserData] = useState({firstName:'',lastName:''});
    const [values, setValues] = useState([]);
const [featchedRoom,setFeatchedRoom]=useState({rooms:null,noRoom:true});
const [guestData,setGuestData]=useState({firstName:'',lastName:'',emailAddress:'',phone:'',idCardPic:''});

  const [date, setDate] = useState([
    dayjs(currentDate),
    dayjs(secondDate),
  ]);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const gotoNext=(selectedRoom=null,withSpaAndFood=false)=>{
if(userData){
 return  navigate('/login',selectedRoom)
}
    handleNext(true)
    console.log(selectedRoom)
  }
  const handleNext = (wheatherToNext=false) => {
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

  const handleReset = () => {
    setActiveStep(0);
  };

const disableDates = (day) => {
    const date = dayjs(day);
    if(disabledDates==null){
      return null;
    }
    return disabledDates.some(disabledDate => date.isSame(disabledDate, 'day'));
  };
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const[calendarError,setCalendarError]=useState(false);
const [errorMesage,setErrorMesage]=useState('');

const handleDateChange = (newDate) => {
    const startDate = newDate[0];
    const endDate = newDate[1];


    // Check if the selected range includes any disabled dates
    console.log(disabledDates);
    if(disabledDates===undefined){
      setCalendarError(false);
      setErrorMesage('');
      if(startDate!==null && endDate!==null){
      setDate([startDate.add(1, 'day'),endDate.add(1, 'day')]);}
      
      return
    }
    const includesDisabledDate = disabledDates.some(disabledDate =>
      (startDate.isSame(disabledDate, 'day') || startDate.isBefore(disabledDate, 'day')) &&
      (endDate.isSame(disabledDate, 'day') || endDate.isAfter(disabledDate, 'day'))
    );

    if (includesDisabledDate) {
      setCalendarError(true);
      setErrorMessage(`${includesDisabledDate[0]} are not available`);
    } else {
      setDate(newValue);
      setCalendarError(false);
      setErrorMessage('');
    }
  };



  if (!resData.error) {
    if(userData.firstName!==''){
    setUserData({
      profilePicture: resData.user.profilePicture,
      firstName: resData.user.firstName,
      lastName: resData.user.lastName,
      emailAddress: resData.user.emailAddress,
    })
    setGuestData({firstName:resData.user.firstName,lastName:resData.user.lastName,emailAddress:resData.user.emailAddress})
    if (!login){ setLogin(true)
    console.log(login)
  }
}
}

  
  const itemRenderer = (item) => (
    <a
      className={`flex align-items-center p-menuitem-link ${activeItem === item.label ? 'active' : ''
        }`}
      onClick={() => setActiveItem(item.label)}
    >
      <span className={item.icon} />
      <span className="mx-1">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );


  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);




  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      template: itemRenderer

    },
    {
      label: 'Rooms',
      icon: 'pi pi-room',
      template: itemRenderer
    },
    {
      label: 'Facilities',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Food options',
          icon: 'pi pi-palette',
          items: [
            {
              label: 'Food menu',
              icon: 'pi pi-palette',
              badge: 2,
              // template: itemRenderer
            },
          ]
        }
      ]
    },
    {
      label: 'Gallary',
      icon: 'pi pi-envelope',
      template: itemRenderer

    },
    {
      label: 'About',
      icon: 'pi pi-envelope',
      badge: 3,
      template: itemRenderer
    },
    {
      label: 'Contact us',
      icon: 'pi pi-envelope',
      badge: 3,
      template: itemRenderer
    },

  ];


const submitCurrentUserData=(e)=>{
e.preventDefault()
console.log(guestData)
}

  const signupHandle = () => {
    navigate('/register')
  }
  const signIn = () => {
    navigate('/login')
  }


  function customDisableDate(day) {
  // Disable dates from April 1, 2024, to April 10, 2024
  const dateToDisable = day.date();
  const monthToDisable = day.month();
  const yearToDisable = day.year();
  const startDate = dayjs('2025-04-08'); // April 1, 2024
  const endDate = dayjs('2025-04-10'); // April 10, 2024

  return (
    dayjs([yearToDisable, monthToDisable, dateToDisable]).isAfter(endDate) ||
    dayjs([yearToDisable, monthToDisable, dateToDisable]).isBefore(startDate)
  );
}

  const [adult ,setAdult]=useState(0);
  const [children,setChildren]=useState(0)

const searchRoomHandler=async(e)=>{
e.preventDefault();

const searchRoom = {adult ,children ,date ,floor,roomType};
const response= await fetch('http://localhost:8000/rooms/searchroom',{
  method:'POST',
  headers:{
  'Content-Type':'application/json'
    },
  body:JSON.stringify(searchRoom)
})
const resData=await response.json()
if(resData.noRoom){
  setFeatchedRoom((prvValue)=>{
  return {rooms:resData.rooms,noRoom:true}
})
}
else{
setFeatchedRoom((prvValue)=>{
  return {noRoom:false,rooms:resData.rooms}})
}
}



  const start = <img alt="logo" src="/assets/images/logo.svg" height="40" className="mr-2"></img>;
  const end = (
    login ? (<div className="flex align-items-center gap-1">
      <InputText placeholder="Search" type="text" className="w-3rem sm:w-auto" />
      <Avatar image={userData.profilePicture &&userData.profilePicture} shape="circle" />
    </div>)
      : (<div>
        <div className="card flex flex-wrap justify-content-center gap-3">
          <Button label='sign in' icon="pi pi-sign-in" size='small' outlined severity="info" aria-label="Sign in" onClick={signIn} />
          <Button label='sign up' icon="pi pi-user-plus" size='small' raised severity="info" aria-label="Sign up" onClick={signupHandle} />
        </div>
      </div>)

  );

  const typeOpetion = [
    { name: 'Single Room', code: 'SR' },
    { name: 'Double Room', code: 'DR' },
    { name: 'Suite', code: 'SU' },
    { name: 'Family Room', code: 'FR' },
    { name: 'Group Room', code: 'GR' },
    { name: 'Accessible Room', code: 'AR' },

  ]
  const images = [
    { source: '/assets/images/carousel/1.png', alt: 'Image 1' },
    { source: '/assets/images/carousel/2.png', alt: 'Image 2' },
    { source: '/assets/images/carousel/3.png', alt: 'Image 3' },
    { source: '/assets/images/carousel/4.png', alt: 'Image 4' },
    { source: '/assets/images/carousel/5.png', alt: 'Image 5' }
  ];
  const [floor, setFloor] = useState(6);
  const [maxPeople, setMaxPeople] = useState(6);
  const itemTemplate = (item) => {
    return <img src={item.source} alt={item.alt} />;
  };
  const carouselRef = useRef(null);
  const op = useRef(null);




  const [activeItem, setActiveItem] = useState('Home');

  const searchHandler = () => {
    setActiveItem('search')
  }
  const [selectGust, setSelectGust] = useState(false);
  const guesHandle = () => {
    setSelectGust(true)

  }
  const guestDataHandler=()=>{
    const formData=new FormData();
    formData.append('firstName',guestData.firstName);
    formData.append('lastName',guestData.lastName)
    formData.append('phone',guestData.phone)
    formData.append('emailAddress',guestData.emailAddress)
    formData.append('idCardPic',guestData.idCardPic)
  }



  const [selectedRange, setSelectedRange] = useState([null, null]);

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  const handleClick = async (amount) => {
    try {
      const response = await fetch(
        "http://localhost:8000/payment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: [{ id: 1, quantity: 1 }],
            amount: parseInt(amount),
          }),
        }
      );

      if (response.ok) {
        const { url } = await response.json();
        window.location = url;
        console.log(url);
      } else {
        const error = await response.json();
        throw new Error(error.error);
      }
    } catch (error) {
      console.error(error);
    }
  };


  // Function to check if a date should be disabled
  const isDateDisabled = (date) => {
    // Disable May 24, 2024
    return date.getDate() === 24 && date.getMonth() === 4 && date.getFullYear() === 2024;
  };

  const [isCalendarOpen, setCalendarOpen] = useState(false);
const calendar=useRef()

const uploads=(imageFile)=>{
  setGuestData((prvValue)=>{
    return {...prvValue,idCardPic:imageFile}
  })
  toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
}

  const renderContent = () => {
    switch (activeItem) {
      case 'Home':
        return <div>
          <Carousel value={images} itemTemplate={itemTemplate} numVisible={1} className="custom-carousel" circular={true}
            autoplayInterval={3000} numScroll={1} responsiveOptions={[{ '1024px': { numVisible: 2, numScroll: 1 } }]}>
            ref={carouselRef}
          </Carousel>
          <Card style={{ position: 'relative', top: '-130px', margin: '30px' }} title="Check Room Availability">
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
                       shouldDisableDate={disableDates}
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
              <div className="flex-auto">
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
          </Card>
        </div>;

      case 'Rooms':
        return <div>Features Page Content</div>;



      case 'search':
        return <div className='app_row'>
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
                       shouldDisableDate={disableDates}
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
              <Stepper activeStep={activeStep}>
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
                                  src="/assets/images/room.jpg"
                                  alt="Petit Room" />
                          </div>
                          <div className="thumb-cards_amenitiesList">
                              
                              {element.features?(
                                
                                 <ul className="product-icons_iconList">
                                  {features.forEach((feature)=>{
                                  <li className="product-icons_deskLamp"><span aria-hidden="true"></span><span>Desk or
                                          {feature}</span></li>
                                  })}

                                  {/* <li className="product-icons_wifi"><span aria-hidden="true"></span><span>Free
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
                                          {/* <MaterialButton
                                          onClick={()=>{
                                            gotoNext(element,false)
                                          }}
                                            variant="contained"
                                                  className="button_btn button_primary button_sm"
                                                  datatest="Button">
                                                    <span>Book Now</span>
                                              </MaterialButton > */}
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
                                          onClick={(element)=>{
                                              gotoNext(element);
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
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingTop: '10px' }}>
                    <Button style={{ paddingLeft: '13px' }} label='Cancel' outlined text />
                    <Button label='Submit'  style={{ paddingLeft: '13px' }} type='submit' />
                  </div>
                   
                  </form>
                  </div>
  </div>

              )}
               { activeStep === 2 && (
                  <Button label="Procced to payment" onClick={() => handleClick(10)} severity="info" outlined />
               )
               
               }

              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <MaterialButton onClick={handleReset}>Reset</MaterialButton>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <MaterialButton
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </MaterialButton>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <MaterialButton color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                      </MaterialButton>
                    )}

                    <MaterialButton onClick={()=>{
                      handleNext(false)
                    }}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </MaterialButton>
                  </Box>
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
      case 'Blocks':
        return <div>Blocks Page Content</div>;
      case 'UI Kit':
        return <div>UI Kit Page Content</div>;
      case 'Apollo':
        return <div>Apollo Page Content</div>;
      case 'Ultima':
        return <div>Ultima Page Content</div>;
      case 'Contact':
        return <div>Contact Page Content</div>;
      default:
        return null;
    }
  };

  return (
    <div>
<Toast ref={toast} />
      <Menubar model={items} start={start} end={end} />

      <div>
        {renderContent()}
      </div>

    </div>
  )
}
export default LandingPage

export const loader = async () => {
  const response = await fetch('http://localhost:8000/users/userdata', {
    method: 'GET',
    credentials: 'include',
  });
  let resData = await response.json();
  const reservedRoom = await fetch('http://localhost:8000/rooms/searchreservedroom')
const reservedData = await reservedRoom.json();
const finalResult = {...resData,reservedData}

  if (resData.error) {
    return { error: true }
  }

  return resData;
}       