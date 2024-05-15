import { useEffect, useState ,useRef } from 'react';
import { Button } from 'primereact/button'
import { TabMenu } from 'primereact/tabmenu';
import './Profile.css'
import {Card} from 'primereact/card'
import Avatar from '@mui/material/Avatar'
import { ButtonGroup } from 'primereact/buttongroup';
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import {UserProfile} from './userProfile/userProfile.tsx'
import { useLoaderData } from 'react-router-dom';
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {Toast } from 'primereact/toast'
import FoodDataView from './FoodDataView.jsx'
import socket from './socket.js'
import { loadStripe } from '@stripe/stripe-js';
const Profile=()=>{
    const [feedBack,setFeedBack]=useState('')
    const toast = useRef(null)
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);
    const items=[
 {label:'Profile',icon:'pi pi-fw pi-user'
    },
    {label:'Edit Profile', icon:'pi pi-user-edit' },

{
    label:'Gallary',
    icon:'pi pi-fw pi-image'
},
{label:'View Booking' ,icon:<i className="pi pi-check"></i>},
{label:'Order Food' ,icon:<i className="pi pi-shoping-cart"></i>},
{label:'View Order' ,icon:<i className="pi pi-check"></i>},
{
        label: 'Back to Home',
        icon: 'pi pi-fw pi-home'
    } ,
]
      const steps1 = [
  'Confirmed',
  'Check In',
  'Qualification',
  'Checkout'
];
      const steps2 = [
  'Confirmed',
  'Processing',
  'Delivered',
];
let resData=useLoaderData();
const handleSuccessFoodOrder=async()=>{
    const data= JSON.parse(localStorage.getItem('userWeFood'))
     const userSession = localStorage.getItem('sessionId');
console.log({...data,userSession})
     const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/foods/saveOrder`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({...data,userSession}),
     });
     const responseResult=await response.json();
    setActiveIndex(5)
    localStorage.setItem('sessionId','')

}
const [paymentStatus,setPaymentStatus] = useState();
useEffect( ()=>{
 handleCheckStatus();
 if(paymentStatus==='paid'){
    handleSuccessFoodOrder()
 }
// fetch(`http://${process.env.REACT_APP_SERVERURL}/users/userdata`, {
//     method: 'GET',
//     credentials: 'include',
//   }).then(responseData=>responseData.json()).then(data=>{
// console.log(data)
//   })

  
  

},[paymentStatus])

 const handlePayment = async (userId,amount) => {
    try {
      const stripe = await stripePromise;
      const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/payment/create-checkout-session-food`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount,userId }),
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


const handleCancel=async ({reservationId,price})=>{
    const response=await fetch(`http://${process.env.REACT_APP_SERVERURL}/payment/refund`,{
        method:'POST',
       headers:{
  'Content-Type':'application/json'
    },
  body:JSON.stringify({reservationId,price})
        
    }); 
    const resData=await response.json();
    if(!resData.error){
        toast.current.show({ severity:'success', summary: 'Refund Successful', detail: resData.message, life: 3000 })
    }else{
         toast.current.show({ severity:'warn', summary: 'Refund Unsuccessful', detail: resData.error, life: 3000 })
    }
}
const handleExtend=()=>{

}
const handleBought=(food)=>{
localStorage.setItem('userWeFood',JSON.stringify({id:resData.user.id,foodId:food.id}))
handlePayment(resData.user.id,food.price)
}
const handleRequestCheckout =(roomId)=>{
    console.log(resData.selectedRoom)
    console.log({guestId:resData.user.id,userName:resData.user.userName,roomId})
    socket.emit('wantToCheckout',JSON.stringify({guestId:resData.user.id,userName:resData.user.userName,roomId}))
toast.current.show({ severity:'success', summary: 'Operation Successful', detail: "Checkout Request has been sent to Receptionist", life: 3000 })
}
console.log('41',resData)

const headerElement = (
        <div style={{  paddingLeft: "25px;", paddingTop: "10px;"}} className="inline-flex align-items-center justify-content-center gap-2">
            <Avatar style={{  paddingLeft: "25px;", paddingTop: "10px;"}} src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${resData.user.profilePicture}`} alt={resData.user.firstName} shape="circle" />
            <span className="font-bold white-space-nowrap">{`${resData.user.firstName}`}</span>
        </div>
    );
            const Room=resData.selectedRoom.filter(selectRoom=>{
                if(selectRoom.status==='Checked In')return selectRoom;
            })

const handleFeedBack = async () => {
   
    const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/feedback/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({feedback:feedBack,userId:resData.user.id}),
      });
      const responseResult=await response.json();
      console.log(responseResult)
      if(!responseResult.error){
                toast.current.show({ severity:'success', summary: 'Operation Successful', detail: responseResult.message, life: 3000 })
            }else{
                toast.current.show({ severity:'error', summary: 'Operation Unsuccessful', detail: responseResult.error, life: 3000 })
            }   


}

    const footerContent = (
        <div style={{display: 'flex',flexDirection:'row-reverse'}}>

<Button label="Post" onClick={handleFeedBack} severity="secondary" icon='pi pi-send'/>
        </div>
    );
    const [activeIndex, setActiveIndex] = useState(1);
    console.log(resData)
return (       <>
<Toast ref={toast} />


                <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root css-1qjv8e6">
                <div class="MuiBox-root css-1xqfr0f">
                    <div class="MuiStack-root css-db2kgc">
                        <div class="MuiAvatar-root MuiAvatar-circular css-btmpc1">
                            <Avatar 
                                src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${resData.user.profilePicture}`} alt={resData.user.firstName}
                                class="MuiAvatar-img css-1hy9t21" />
                        </div>
                        <div class="MuiListItemText-root MuiListItemText-multiline css-mjofsa"><span
                                class="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-o8vyvo">{`${resData.user.firstName} ${resData.user.lastName}`}
                               </span>
                               <span
                                class="MuiTypography-root MuiTypography-body2 MuiListItemText-secondary css-ad49p8">{resData.user.user_type} Member</span></div>
                    </div>
                </div>
                <div class="MuiTabs-root css-193cqlv">
                    <div class="MuiTabs-scrollableX MuiTabs-hideScrollbar css-oqr85h"
                        style={{width: "99px;", height: "99px;", position: "absolute;" ,top: "-9999px;",
                         overflow: "scroll;"}}></div>
                    <div class="MuiTabs-scroller MuiTabs-hideScrollbar MuiTabs-scrollableX css-1t0s2fz"
                        style={{marginBottom: "0px;"}}>
                        <div class="MuiTabs-flexContainer css-7sga7m" role="tablist">
                    <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                                </div><span class="MuiTabs-indicator css-4ue53l"
                            style={{left: "179.328px;", width: "75.625px;"}}></span>
                    </div>
                </div>
            </div>
            {activeIndex===0&&(
    <div class="layout-content">
        <div class="flex flex-column md:flex-row gap-5">
            <div class="md:w-25rem card p-0">
                <Card title="About" subTitle="Personal Details">

                 <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root css-mq4bdj">
                        <div class="MuiStack-root css-u3gl1n">
                            <div class="MuiBox-root css-zelatz">Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..
                                </div>
                            <div class="MuiStack-root css-lgk7oi">
                                <svg  class="component-iconify MuiBox-root css-9uy14h iconify iconify--mingcute" width="1em" height="1em"
                                    viewBox="0 0 24 24">
                                    <g fill="none">
                                        <path
                                            d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z">
                                        </path>
                                        <path fill="currentColor"
                                            d="M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.441 20.441 0 0 1-2.876 2.416l-.426.29l-.2.133l-.377.24l-.336.205l-.416.242a1.874 1.874 0 0 1-1.854 0l-.416-.242l-.52-.32l-.192-.125l-.41-.273a20.638 20.638 0 0 1-3.093-2.566C4.676 16.589 3 14.074 3 11a9 9 0 0 1 9-9m0 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6">
                                        </path>
                                    </g>
                                </svg>
                                 Live at <a class="MuiTypography-root MuiTypography-subtitle2 MuiLink-root MuiLink-underlineHover css-1utdui4">{resData.user.nationality}</a>
                                
                            </div>
                            <div class="MuiStack-root css-1o30227"><svg xmlns="http://www.w3.org/2000/svg"
                            
                                    class="component-iconify MuiBox-root css-1anrb5w iconify iconify--fluent" width="1em" height="1em"
                                    viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M22 8.608v8.142a3.25 3.25 0 0 1-3.066 3.245L18.75 20H5.25a3.25 3.25 0 0 1-3.245-3.066L2 16.75V8.608l9.652 5.056a.75.75 0 0 0 .696 0zM5.25 4h13.5a3.25 3.25 0 0 1 3.234 2.924L12 12.154l-9.984-5.23a3.25 3.25 0 0 1 3.048-2.919zh13.5z">
                                    </path>
                                    </svg>
                                    {resData.user.emailAddress}
                                    </div>
                            <div class="MuiStack-root css-lgk7oi"><svg xmlns="http://www.w3.org/2000/svg"
                            
                                    class="component-iconify MuiBox-root css-9uy14h iconify iconify--ic" width="1em" height="1em"
                                    viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M13 16h-2c-.55 0-1-.45-1-1H3.01v4c0 1.1.9 2 2 2H19c1.1 0 2-.9 2-2v-4h-7c0 .55-.45 1-1 1m7-9h-4c0-2.21-1.79-4-4-4S8 4.79 8 7H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-1c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2M10 7c0-1.1.9-2 2-2s2 .9 2 2H9.99z">
                                    </path>
                                </svg>
                                {resData.user.user_type}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <div class="flex-1 card p-0">
        <Card  header={headerElement} footer={footerContent}  >
           <div className="card flex justify-content-center">
                <FloatLabel>
                    <InputTextarea id="description" value={feedBack} onChange={(e) => setFeedBack(e.target.value)} rows={5} cols={83} />
                    <label htmlFor="description">Write Your FeedBack Here</label>
                </FloatLabel>
          </div>
            </Card>

            </div>
        </div>
    </div>

            )}
            

            {activeIndex===1&&(
           <div>
            <UserProfile userData={resData}/>
           </div>
            )}
            
            
            
            {activeIndex===3&&(
                <div>
                    {resData.selectedRoom.length!==0&&
                   resData.selectedRoom.map(selectedRoom=>{
                 return   (  <div class="card">
        <div class="flex flex-column sm:flex-row sm:justify-content-between sm:align-items-center">
          <span
                class="text-2xl font-medium text-900">Thanks for your Booking!
                </span>
            <div class="flex mt-3 sm:mt-0">
                <div class="flex flex-column align-items-center"><span class="text-900 font-medium mb-2">Reservation
                        ID</span>
                        <span class="text-700">{selectedRoom.reservationId}</span>
                        </div>
                <div class="flex flex-column align-items-center ml-6 md:ml-8"><span
                        class="text-900 font-medium mb-2">Reservation Date</span><span class="text-700">{selectedRoom.checkinDate}</span>
                </div>
            </div>
        </div>
        <div class="flex flex-column md:flex-row md:align-items-center border-bottom-1 surface-border py-5"><img
                src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${JSON.parse(selectedRoom.roomImage)[0]}`} class="w-15rem flex-shrink-0 md:mr-6"
                alt="summary-1-2" />
            <div class="flex-auto mt-3 md:mt-0">
              <span class="text-xl text-900">{selectedRoom.roomName} ,({selectedRoom.id})</span>
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
      <Stepper activeStep={selectedRoom.status==='CONFIRMED'?0:selectedRoom.status==='Checked In'?1:2} alternativeLabel>
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
            <div class="flex sm:mr-5 mb-5"><span class="font-medium text-900 text-xl mr-8">{selectedRoom.roomName}, ({selectedRoom.id})</span><span
                    class="text-900 text-xl">{selectedRoom.price}</span>
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
        <div style={{display:'flex',flexDirection:'row-reverse'}}>
            <ButtonGroup >
                <Button label="Request Checkout" onClick={()=>{
                    handleRequestCheckout(selectedRoom.id)
                }}  severity="secondary" outlined icon="pi pi-sign-out" />
                <Button label="Extend Reservation"  onClick={()=>{
                    handleExtend(selectedRoom.id)
                }} severity="success" outlined  icon="pi pi-calendar-plus" />
                <Button label="Cancel Reservation" onClick={()=>{
                    handleCancel({reservationId:selectedRoom.reservationId,price:selectedRoom.price})
                }} severity="danger" outlined icon="pi pi-times-circle" />
            </ButtonGroup>
        </div>
<Divider />

         </div>)
                   })

                    }
  
                </div>
            )}
            {activeIndex===4&&Room.length!==0
            &&(

                    <FoodDataView handleBought={handleBought} />
            )}
            {activeIndex===5&&(
                              <div>
                    {[...resData.foods].length!==0&&
                   resData.foods.map(selectedFood=>{
                 return   (  <div class="card">
        <div class="flex flex-column sm:flex-row sm:justify-content-between sm:align-items-center">
          <span
                class="text-2xl font-medium text-900">Thanks for your Order!
                </span>
            <div class="flex mt-3 sm:mt-0">
                <div class="flex flex-column align-items-center"><span class="text-900 font-medium mb-2">Reservation
                        ID</span>
                        <span class="text-700">{selectedFood.orderId}</span>
                        </div>
                <div class="flex flex-column align-items-center ml-6 md:ml-8"><span
                        class="text-900 font-medium mb-2">Reservation Date</span><span class="text-700">{selectedFood.orderDate}</span>
                </div>
            </div>
        </div>
        <div class="flex flex-column md:flex-row md:align-items-center border-bottom-1 surface-border py-5"><img
                src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${JSON.parse(selectedFood.foodImage)[0]}`} class="w-15rem flex-shrink-0 md:mr-6"
                alt="summary-1-2" />
            <div class="flex-auto mt-3 md:mt-0">
              <span class="text-xl text-900">{selectedFood.foodName} ,({selectedFood.id})</span>
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
      <Stepper activeStep={selectedFood.status==='CONFIRMED'?0:selectedFood.status==='Processing'?1:2} alternativeLabel>
        {steps2.map((label) => (
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
            <div class="flex sm:mr-5 mb-5"><span class="font-medium text-900 text-xl mr-8">{selectedFood.foodName}, ({selectedFood.id})</span><span
                    class="text-900 text-xl">Price {selectedFood.price}</span>
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
<Divider />
        <div style={{display:'flex',flexDirection:'row-reverse'}}>
            {/* <ButtonGroup >
                <Button label="Request Checkout" onClick={()=>{
                    handleRequestCheckout(selectedRoom.id)
                }}  severity="secondary" outlined icon="pi pi-sign-out" />
                <Button label="Extend Reservation"  onClick={()=>{
                    handleExtend(selectedRoom.id)
                }} severity="success" outlined  icon="pi pi-calendar-plus" />
                <Button label="Cancel Reservation" onClick={()=>{
                    handleCancel({reservationId:selectedRoom.reservationId,price:selectedRoom.price})
                }} severity="danger" outlined icon="pi pi-times-circle" />
            </ButtonGroup> */}
        </div>


         </div>)
                   })

                    }
  
                </div>
            )}
            </>
)
}
export default Profile
export const loader=async()=>{
    console.log('request accepted')
  const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/users/userdata`, {
    method: 'GET',
    credentials: 'include',
  });
  let resData = await response.json();
console.log('249',resData.user.id)
const otherData= await fetch(`http://${process.env.REACT_APP_SERVERURL}/reservation/fetchusersreservation`,{
    method:'POST',
     headers: {
                            'Content-Type': 'application/json',
                        },
    body:JSON.stringify({id:resData.user.id}),
        credentials: 'include',
})
const result=await otherData.json();
const otherResponse= await fetch(`http://${process.env.REACT_APP_SERVERURL}/foods/fetchOwnFoodOrder`,{
    method:'POST',
      headers: {
           'Content-Type': 'application/json',
          },
          body:JSON.stringify({id:resData.user.id})

})
const foodFetched= await otherResponse.json();
const finalResult ={...resData,...result,...foodFetched}
console.log('final result',finalResult)

  return finalResult;
}