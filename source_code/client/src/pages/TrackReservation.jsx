import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import Avatar from '@mui/material/Avatar';
import {useLoaderData} from'react-router-dom'
import './Staff.css'
export default function PaginationDemo() {
    const [reservation, setReservations] = useState([]);
const resData= useLoaderData();
const desiredFormat = "%d %b %Y"; // Day, month abbreviation, year
    useEffect(() => {
        console.log(resData.reservation)
    const filteredValue=resData.reservation.map(oneReservation=>{
        const duration=calculateStayDuration(oneReservation.checkinDate,oneReservation.checkoutDate)
        const guestName=oneReservation.firstName+' '+oneReservation.lastName;
        const guestProfilePicture=oneReservation.profilePicture;
        const roomPicture=JSON.parse(oneReservation.roomImage)[0];
        const checkinDates = new Date(oneReservation.checkinDate).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
    

        return {
            duration,
            guestName,
            checkinDates,
            guestProfilePicture,
            roomPicture,
            price:oneReservation.price,
            numberOfPeople:oneReservation.numberOfPeople,
    }
})
        setReservations(filteredValue)
        //load the reservation thing
        
    }, []);

const gridItem = (reservations) => {
        return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={reservations.id}>
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="card flex justify-content-center">
                    <div className="card">
                            <div data-index="2" class="slick-slide slick-active" tabindex="-1" aria-hidden="false"
                                style={{outline: 'none;',width: '306px;'}}>
                                <div>
                                    <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-1e0gpig">
                                        <div class="MuiStack-root css-1giycxh">
                                            <div class="MuiStack-root css-1y3ojfh">
                                                <div class="MuiAvatar-root MuiAvatar-circular css-inlwhr">
                                            <Avatar alt={reservations.guestName}
                                                        src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${reservations.guestProfilePicture}`}
                                                        class="MuiAvatar-img css-1hy9t21" /></div>
                                                <div class="MuiListItemText-root MuiListItemText-multiline css-w6ypuq"><span
                                                        class="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1rnp3ag">
                                                            {reservations.guestName}</span>
                                                        <span
                                                        class="MuiTypography-root MuiTypography-body2 MuiListItemText-secondary css-1r0ksrp">{reservations.checkinDates} 8:30AM</span></div>
                                            </div>
                                            <div class="MuiStack-root css-1baezbn">
                                                <div class="MuiStack-root css-u4p24i"><svg aria-hidden="true" role="img"
                                                        class="component-iconify MuiBox-root css-158fhbv iconify iconify--solar" width="1em"
                                                        height="1em" viewBox="0 0 24 24">
                                                        <path fill="currentColor"
                                                            d="M7.75 2.5a.75.75 0 0 0-1.5 0v1.58c-1.44.115-2.384.397-3.078 1.092c-.695.694-.977 1.639-1.093 3.078h19.842c-.116-1.44-.398-2.384-1.093-3.078c-.694-.695-1.639-.977-3.078-1.093V2.5a.75.75 0 0 0-1.5 0v1.513C15.585 4 14.839 4 14 4h-4c-.839 0-1.585 0-2.25.013z">
                                                        </path>
                                                        <path fill="currentColor" fill-rule="evenodd"
                                                            d="M22 12c0-.839 0-1.585-.013-2.25H2.013C2 10.415 2 11.161 2 12v2c0 3.771 0 5.657 1.172 6.828C4.343 22 6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.172C22 19.657 22 17.771 22 14zm-8 .25A1.75 1.75 0 0 0 12.25 14v2a1.75 1.75 0 1 0 3.5 0v-2A1.75 1.75 0 0 0 14 12.25m0 1.5a.25.25 0 0 0-.25.25v2a.25.25 0 1 0 .5 0v-2a.25.25 0 0 0-.25-.25m-3.213-1.443a.75.75 0 0 1 .463.693v4a.75.75 0 0 1-1.5 0v-2.19l-.22.22a.75.75 0 0 1-1.06-1.06l1.5-1.5a.75.75 0 0 1 .817-.163"
                                                            clip-rule="evenodd"></path>
                                                    </svg>{reservations.duration}</div>
                                                <div class="MuiStack-root css-u4p24i"><svg aria-hidden="true" role="img"
                                                        class="component-iconify MuiBox-root css-158fhbv iconify iconify--solar" width="1em"
                                                        height="1em" viewBox="0 0 24 24">
                                                        <circle cx="9.001" cy="6" r="4" fill="currentColor"></circle>
                                                        <ellipse cx="9.001" cy="17.001" fill="currentColor" rx="7" ry="4"></ellipse>
                                                        <path fill="currentColor"
                                                            d="M21 17c0 1.657-2.036 3-4.521 3c.732-.8 1.236-1.805 1.236-2.998c0-1.195-.505-2.2-1.239-3.001C18.962 14 21 15.344 21 17M18 6a3 3 0 0 1-4.029 2.82A5.688 5.688 0 0 0 14.714 6c0-1.025-.27-1.987-.742-2.819A3 3 0 0 1 18 6.001">
                                                        </path>
                                                    </svg>{reservations.numberOfPeople}</div>
                                            </div>
                                        </div><span class="MuiBox-root css-hg17l0">🔥 ${reservations.price}</span>
                                        <div class="MuiBox-root css-qm9jms"><span class="component-image MuiBox-root css-125jpm"><span
                                                    class="component-image-wrapper lazy-load-image-background blur lazy-load-image-loaded"
                                                    style={{color: 'transparent;', display: "inline-block;"}}><img class="MuiBox-root css-19t2nho"
                                                        alt="https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_3.jpg"
                                                        src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${reservations.roomPicture}`} />
                                                        </span>
                                                    </span>
                                        </div>
                                    </div>
                                </div>
    </div>
                    </div>
                </div>
                   </div>
                 </div>
           
        );
    };
   


function calculateStayDuration(checkinDate, checkoutDate) {
  const oneDay = 1000 * 60 * 60 * 24;

  const checkin = new Date(checkinDate);
  const checkout = new Date(checkoutDate);

  // Ensure checkout is after checkin
  if (checkout <= checkin) {
    throw new Error("Checkout date must be after check-in date.");
  }

  // Calculate the difference in milliseconds
  const differenceInMs = checkout.getTime() - checkin.getTime();

  // Calculate the number of days
  const days = Math.ceil(differenceInMs / oneDay);

  // Nights are always one less than days
  const nights = days - 1;

  return `${days} days ${nights} nights`;
}








const listTemplate = (reservationGrid) => {
        return <div className="grid grid-nogutter">{reservationGrid.map((oneReservation) => itemTemplate(oneReservation))}</div>;
    };

    const itemTemplate = (reservationGrid) => {
        if (!reservationGrid) {
            return;
        }

       
        return gridItem(reservationGrid);
    }; 

    return (
        <div className="card">
            <DataView value={reservation} listTemplate={listTemplate} paginator rows={5} />
        </div>
    )
}
            
export const loader=async()=>{
    const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/reservation/getReservation`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}