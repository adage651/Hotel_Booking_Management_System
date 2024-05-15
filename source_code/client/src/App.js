 import 'devextreme/dist/css/dx.light.css';
import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import Login , {action as loginAction ,loader as loginLoader} from './pages/Login.jsx'
import Register from './pages/Register'
import {Router,BrowserRouter, Route, RouterProvider ,Routes,createBrowserRouter, createRoutesFromChildren, createRoutesFromElements} from 'react-router-dom'
import AuthRegister, {action as authAction ,loader as userFetch} from './pages/AuthRegister'
import Manager,{ loader as fetchUserData} from './pages/Manager.jsx'
import './global.css';
import StaffFoodManage,{loader as staffMangeLoader} from './pages/StaffFoodManage.jsx'
import { useScrollToTop } from './hooks/use-scroll-to-top.js';
import CheckoutStaffTable, { loader as checkoutLoader } from './pages/ChckoutStaffTable.jsx'
// const router=createBrowserRouter([
//   {path:'/',element:<Home />, loader:homeLoader},
//   {path:'/manager' ,element:<Manager />},
//   {path:'/login',element:<Login />, action:loginAction,loader:loginLoader},
//   {path:'/register',element:<Register />,
//     action:authAction ,
//     children:[
//     {index:true, element:<AuthRegister />,
// action:authAction
//       }
//   ]},
// ])
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes ,Switch} from 'react-router-dom';
import DashboardLayout from './layout/dashboard';
import DashbordData from './pages/app.jsx'
import RoomData from './pages/user.jsx'
import { Card } from 'primereact/card';
import UserPage ,{ loader as userFetchAll } from './pages/userTabel/view/user-view.jsx';
import RoomDetail,{action as actionRoom,loader as roomLoader} from './RoomDetail.jsx';
import LoginError from './pages/LoginError.jsx';
// import LoginError from './pages/LoginError.jsx'
import LandingPage, {loader as userLoader} from './pages/LandingPage.jsx';
import Receptionist ,{loader as receptionstLoader} from './pages/Receptionist.jsx';
import Staff,{loader as staffLoader} from './pages/Staff.jsx';
import Maintenance from './pages/Maintenance.jsx';
import Contact,{loader as contactLoader} from './pages/Contact.jsx';
import FoodDetail,{loader as foodLoader,action as actionFood} from './FoodDetail.jsx';
import ConformationPage from './pages/ConformationPage.jsx'
// import ReservationStatus from './pages/ReservationDetail.jsx'
import ReservationDetail,{loader as reservationLoader} from './pages/ReservationDetail.jsx';
import HomePage,{loader as homeLoader} from './pages/HomePage.jsx';
import Profile ,{loader as profileLoader} from './pages/Profile.jsx'       
import  socket  from './pages/socket';
import { UserProfile } from './pages/userProfile/userProfile';
import ReceptionistDataTable,{ loader as receptionstLoaders } from './pages/ReceptionistDataTable.jsx'
import CheckoutDataTable ,{ loader as checkoutDataTableLoader } from './pages/CheckoutDataTable';
import Practice from './Practice.jsx'
import DataView,{loader as dataViewLoader} from './pages/FoodDataView.jsx'
import TrackReservation,{loader as trackReservaionLoader} from './pages/TrackReservation.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx';
import { MapProvider } from './MapContext.js'; 
import FeedBack from './pages/FeedBack.jsx';
import ContactReceptionist,{loader as contactReceptionist} from './pages/ContactReceptionist.jsx';
import ForgotPassword,{loader as forgotPasswordLoader} from './pages/ForgotPassword.jsx';
const router=createBrowserRouter(
  [

    {path:'/', element:<HomePage />, loader:homeLoader},
    {path:'/landing', element:<LandingPage />, loader:userLoader},
    {path:'/practice' ,element:  <Practice />,},
    {path:'/dataview',element:<DataView /> , loader:dataViewLoader},
{path:'/forgotpassword',element:<ForgotPassword />,loader:forgotPasswordLoader},
    {path:'/manager', element:<Manager />,loader:fetchUserData,errorElement:<LoginError />,
    children:[
      // {path:'view-account', element:<UserPage /> ,loader:userFetchAll},
      {path:'rooms', element:<RoomDetail />, loader:roomLoader,action:actionRoom ,errorElement:<LoginError />},
      {path:'view-account', element:<UserPage />,loader:userFetchAll ,errorElement:<LoginError /> },
      {path:'reservation', element:<ReservationDetail /> ,loader:reservationLoader ,errorElement:<LoginError />},
      {path:'managefood', element:<FoodDetail />,loader:foodLoader,action:actionFood ,errorElement:<LoginError />},
      {path:'feadback',element:<FeedBack />},
      {path:'notification',element:<Contact /> ,loader:contactLoader,errorElement:<LoginError />},
      {path:'', element:<DashbordData />,errorElement:<LoginError />},
        ],
      // errorElement:<LoginError />
    },
    
    

    {path:'/receptionist', element:<Receptionist />,loader:receptionstLoader,errorElement:<LoginError />
    ,children:[
      {path:'checkin',element:<ReceptionistDataTable />,loader:receptionstLoaders,errorElement:<LoginError />},
      {path:'checkout', element:<CheckoutDataTable /> ,loader:checkoutDataTableLoader,errorElement:<LoginError />},
     {path:'notification',element:<Contact /> ,loader:contactLoader,errorElement:<LoginError />},
      {path:'',element:<TrackReservation /> ,loader:trackReservaionLoader,errorElement:<LoginError />},

      
    ]
     ,errorElement:<LoginError /> },


    {path:'/staff_member', element:<Staff />,loader:staffLoader,errorElement:<LoginError />
   ,children:[
      {path:'checkout', element:<CheckoutStaffTable /> ,loader:checkoutLoader},
      {path:'rooms', element:<RoomDetail />},
     {path:'notification',element:<Contact /> ,loader:contactLoader,errorElement:<LoginError />},
      {path:'',element:<StaffFoodManage /> ,loader:staffMangeLoader}
    ] 
  ,errorElement:<LoginError /> },
    { path:'/maintenace_team', element:<Maintenance />,errorElement:<LoginError />,errorElement:<LoginError />,
    children:[
      {path:'', element:<UserPage /> ,loader:userFetchAll},
           {path:'notification',element:<Contact /> ,loader:contactLoader,errorElement:<LoginError />},
      {path:'rooms', element:<RoomDetail />}
      
    ]  
  ,errorElement:<LoginError />},
     {path:'/guest', element:<HomePage /> ,loader:homeLoader,errorElement:<LoginError />,errorElement:<LoginError />
     , children:[
      {path:'profile' ,element:<Profile /> , loader:profileLoader    },
     ]
    },
    {path:'/profile' ,element:<Profile /> , loader:profileLoader  , errorElement:<LoginError />,  },
   
  {path:'/login' ,element:<Login />,action:loginAction ,loader:loginLoader },
  {path:'/loginError' ,element:<LoginError />},
  {path:'/register' ,element:<Register /> ,loader:loginLoader,
children:[
  {index:true ,element:<AuthRegister /> ,action:authAction}
  ],errorElement:<LoginError /> 
},

{ path: '*', element: <NotFoundPage /> },
]

)


function App() {
  return (
  <RouterProvider router={router} />
  );
}

export default App;
