import React, { useState, useEffect, useRef } from 'react';

import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Card } from 'primereact/card'
import { useLoaderData } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material'
import {OverlayPanel} from 'primereact/overlaypanel'
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';
import './roomDataView.css'
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
export default function BasicDemo({handleBook}) {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState('grid');
const [selectedRoom,setSelectedRoom] =useState()

  const footer = (room)=>{
    
    return (    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <Button label="Book" icon="pi pi-sign-in" style={{marginRight:"13px"}} onClick={(e)=>{
        handleRoomChoosing(room,e)
      }}/>
      <Button
        label="View Detail"
        severity="secondary"
        outlined
        icon="pi pi-eye"
        style={{marginRight:"3px"}}
      
      />
    </div>);
  };

const handleClick=(e)=>{
  handleBook({selectedRoom,date})
  op.current.hide();
}

  useEffect( () => {
//     let data;
//     fetch(`http://${process.env.REACT_APP_SERVERURL}/rooms/freeToday`)
//     .then(response=>response.json)
//     .then(resData=>{
// console.log(resData.rooms)
//     data= resData.rooms.map(room=>{
//         return {
//                     id:room.id,
           
//                     name: room.roomName,
//                     description: room.description,
//                     image: JSON.parse(room.roomImage)[0],
//                     price: room.price,
//                     // category: 'Accessories',
//                     // quantity: 24,
//                      inventoryStatus: room.available_today===null || room.available_today>0?'Available':'Available Constraint',
//                     available:room.available_today,
//                      rating: room.rating
//                 }
//     })
//       setProducts(data);
//     })
  
//   console.log(data)


  fetch(`http://${process.env.REACT_APP_SERVERURL}/rooms/freeToday`)
    .then(response => response.json())
    .then(resData => {
      const products = resData.rooms.map(room => ({
        id: room.id,
        name: room.roomName,
        description: room.description,
        image: JSON.parse(room.roomImage)[0],
        price: room.price,
        adult: room.adult,
        children: room.children,
        inventoryStatus: room.available_today !== null || room.available_today > 0 ? 'Available Constraint' : 'Available',
        available: room.available_today,
        rating: room.rating
      }));
      setProducts(products);
    });



  }, []);

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case 'Available':
        return 'success';

      case 'Available Constraint':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };

  const listItem = (product, index) => {
    return (
      <div className="col-12" key={product.id}>
        <div
          className={classNames(
            'flex flex-column xl:flex-row xl:align-items-start p-4 gap-4',
            { 'border-top-1 surface-border': index !== 0 }
          )}
        >
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${product.image}`}
            alt={product.name}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.name}</div>
              <Rating value={product.rating} readOnly cancel={false}></Rating>
              <div className="flex align-items-center gap-3">
                {/* <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{product.category}</span>
                </span> */}
                <Tag
              value={product.inventoryStatus==='Available'?`Available for ${product.available===null?'All days':product.available }`:`The room is Not Available for ${Math.abs(product.available)==0?1:Math.abs(product.available)} days`}
              severity={getSeverity(product)}>
              </Tag>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${product.price}</span>
              <Button
                icon="pi pi-sign-in"
                className="p-button-rounded"
                disabled={product.inventoryStatus === 'OUTOFSTOCK'}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

const gridItem = (product) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="card flex justify-content-center">
            <Card
              title={product.name}
              subTitle={

                <div>
<Rating value={product.rating} readOnly cancel={false}></Rating>
              
              <div >
              
               <div style={{padding:'20px 0px 0px 0px' ,fontSize:'1.5rem' }}>
                Description
              </div>
              <div style={{ display:'flex',flexDirection:'row' }}>


                 <div>
                  Adult : {product.adult} Children : {product.children} 
                </div>
                <div>
                 Price : {product.price} 
                </div>
            </div>
                 <Tag
                value={product.inventoryStatus==='Available'?`Available for ${product.available===null?'All days':product.available }`:`The room is Not Available for ${Math.abs(product.available)==0?1:Math.abs(product.available)} days`}
                severity={getSeverity(product)}>
                </Tag>
              </div>
                </div>}
              footer={()=>{
              return footer(product)
              }}
              header={    <img
      alt="Card"
      src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${product.image}`}
    />}
              className="md:w-25rem"
            >
              <p className="m-0">

   {` ${product.description}`}
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout, index) => {
    if (!product) {
      return;
    }

    if (layout === 'list') return listItem(product, index);
    else if (layout === 'grid') return gridItem(product);
  };

  const listTemplate = (products, layout) => {
    return (
      <div className="grid grid-nogutter">
        {products.map((product, index) => itemTemplate(product, layout, index))}
      </div>
    );
  };

  const header = () => {
    return (
      <div className="flex justify-content-end">
        <DataViewLayoutOptions
          layout={layout}
          onChange={(e) => setLayout(e.value)}
        />
      </div>
    );
  };
  const [date,setDate]=useState();
const handleDateChange = (newValue) => {
  const startDate = newValue[0];
  const endDate = newValue[1];

  // Check if both start and end dates are selected
  // if (startDate && endDate) {
  //   // Convert disabledRanges to dayjs objects


  //   // Check if any date within the selected range is disabled
  //   const includesDisabledRange = disabledRanges.some(disabledRange =>
  //     (startDate.isBefore(disabledRange.checkinDate, 'day') && endDate.isAfter(disabledRange.checkoutDate, 'day'))
  //   );

  //   if (includesDisabledRange) {
  //     setCalendarError(true);
  //     setErrorMessage('One or more selected date ranges are reserved.');
  //   } else {
  //     setCalendarError(false);
  //     setErrorMessage('');
  //   }
  // } else {
  //   setCalendarError(false);
  //   setErrorMessage('');
  // }

  setDate(newValue);
};
// const shouldDisableDate = (day) => {
//   return disabledRanges.some(disabledRange =>
//     day.isSame(disabledRange.checkinDate, 'day') ||
//     day.isSame(disabledRange.checkoutDate, 'day') ||
//     (day.isAfter(disabledRange.checkinDate, 'day') && day.isBefore(disabledRange.checkoutDate, 'day'))
//   );
// };
// shouldDisableDate={shouldDisableDate}
const op=useRef(null)
const calendar=useRef(null)
    const footerDate = (
        <>
            <Button label="Save" icon="pi pi-check" onClick={handleClick} />
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} onClick={()=>{
               op.current.hide();
            }} />
        </>
    );
     const handleRoomChoosing=(room,e)=>{
      setSelectedRoom(room)
op.current.toggle(e)

 }
  return (
        <Container id="rooms" sx={{ py: { xs: 8, sm: 16 } ,paddingTop:'0px' ,marginTop:'0px' }}>
             <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          marginTop:'0px',
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography sx={{textAlign:'center',display:'block', margin:'10px'}} component="h2" variant="h4" color="text.primary">
          Our Rooms
        </Typography>
        </Box>
    <div className="card">
      <DataView
        value={products}
        listTemplate={listTemplate}
        layout={layout}
        paginator
        rows={5}
        header={header()}
      />
    </div>
          <OverlayPanel ref={op}>
                
                
                <Card title="Please Enter The Checkin and Checkout Dates"  footer={footerDate}>


                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    label="Checkin/Checkout"
                     ref={calendar}
                    disablePast={true}
                    onChange={handleDateChange}
                    localeText={{ start: 'Check-in', end: 'Check-out' }}       
                     slots={{ field: SingleInputDateRangeField }}
                      
                        allowSameDateSelection
                  />
               
                </LocalizationProvider>
                </Card>
          </OverlayPanel>
    </Container>
  );
}
export const loader=async()=>{
    const response= await fetch(`http://${process.env.REACT_APP_SERVERURL}/rooms/freeToday`)

    const resData= await response.json();
    return resData;
}