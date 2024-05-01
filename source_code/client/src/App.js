 import 'devextreme/dist/css/dx.light.css';
import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import Login , {action as loginAction ,loader as loginLoader} from './pages/Login.jsx'
import Register from './pages/Register'
import {Router,BrowserRouter, Route, RouterProvider ,Routes,createBrowserRouter, createRoutesFromChildren, createRoutesFromElements} from 'react-router-dom'
import AuthRegister, {action as authAction ,loader as userFetch} from './pages/AuthRegister'
import Manager,{ loader as fetchUserData} from './pages/Manager.jsx'
import './global.css';
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
import LoginErrorPage from './pages/LoginErrorPage.jsx';
import LoginError from './pages/LoginError.jsx'
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
import Profile from './pages/Profile.jsx'       
import  socket  from './pages/socket';
import { UserProfile } from './pages/userProfile/userProfile';
import ReceptionistDataTable,{ loader as receptionstLoaders } from './pages/ReceptionistDataTable.jsx'
import CheckoutDataTable ,{ loader as checkoutDataTableLoader } from './pages/CheckoutDataTable';
const router=createBrowserRouter(
  [
    // {path:'/', element:<LandingPage />, loader:userLoader},
  // {path:'/ReservationStatus',element:<ReservationDetail />},
{path:'/', element:<HomePage />, loader:homeLoader},
// {path:'/table',element:<CheckoutDataTable /> ,loader:checkoutDataTableLoader },
// }},
    {path:'/landing', element:<LandingPage />, loader:userLoader},
    {path:'/edit-profile',element:<UserProfile />},

    {path:'/manager', element:<Manager />,loader:fetchUserData,
    children:[
      // {path:'view-account', element:<UserPage /> ,loader:userFetchAll},
      {path:'rooms', element:<RoomDetail />, loader:roomLoader,action:actionRoom},
      {path:'view-account', element:<UserPage />,loader:userFetchAll },
      {path:'reservation', element:<ReservationDetail /> ,loader:reservationLoader},
      {path:'managefood', element:<FoodDetail />,loader:foodLoader,action:actionFood},
      // {path:'user',element:<Practice />},
      {path:'notifications',element:<Contact /> ,loader:contactLoader},
      {path:'', element:<DashbordData />},
        ],
      // errorElement:<LoginError />
    },
    
    

    {path:'/receptionist', element:<Receptionist />,loader:receptionstLoader
    ,children:[
      {path:'checkin',element:<ReceptionistDataTable />,loader:receptionstLoaders},
      {path:'checkout', element:<CheckoutDataTable /> ,loader:checkoutDataTableLoader}


      
    ]
     ,errorElement:<LoginError />},


    {path:'/staff_member', element:<Staff />,loader:staffLoader,
    children:[
      {path:'checkout', element:<CheckoutStaffTable /> ,loader:checkoutLoader},
      {path:'rooms', element:<RoomDetail />}
    ] 
  ,errorElement:<LoginError /> },
    { path:'/maintenace_team', element:<Maintenance />,
    children:[
      {path:'user', element:<UserPage /> ,loader:userFetchAll},
      {path:'rooms', element:<RoomDetail />}
      
    ]  
  ,errorElement:<LoginError />},
     {path:'/guest', element:<HomePage /> ,loader:homeLoader,errorElement:<LoginError />
     , children:[
      {path:'profile' ,element:<Profile /> },
     ]
    },
{path:'/profile' ,element:<Profile /> },
  {path:'/login' ,element:<Login />,action:loginAction ,loader:loginLoader },
  {path:'/loginError' ,element:<LoginError />},
  {path:'/register' ,element:<Register /> ,loader:loginLoader,children:[
  {index:true ,element:<AuthRegister /> ,action:authAction}
  ],errorElement:<LoginError /> 
}

]

)


function App() {
  return (
  <RouterProvider router={router} />
  );
}

export default App;
