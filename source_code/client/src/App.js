import './App.css';

import "primereact/resources/themes/lara-light-cyan/theme.css";

import Login , {action as loginAction ,loader as loginLoader} from './pages/Login.jsx'
import Register from './pages/Register'
import {Router,BrowserRouter, Route, RouterProvider ,Routes,createBrowserRouter, createRoutesFromChildren, createRoutesFromElements} from 'react-router-dom'
import AuthRegister, {action as authAction ,loader as userFetch} from './pages/AuthRegister'
import Manager,{ loader as fetchUserData} from './pages/Manager.jsx'
import './global.css';
import { useScrollToTop } from './hooks/use-scroll-to-top.js';

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
import Practice from './Practice.jsx';
import FoodDetail,{loader as foodLoader,action as actionFood} from './FoodDetail.jsx';
import ConformationPage from './pages/ConformationPage.jsx'
import ReservationStatus from './pages/ReservationDetail.jsx'
import ReservationDetail,{loader as reservationLoader} from './pages/ReservationDetail.jsx';

        

const router=createBrowserRouter(
  [
    {path:'/', element:<LandingPage />, loader:userLoader,
  children:[

  ]
  },
  {path:'/ReservationStatus',element:<ReservationDetail />},

    
    {path:'/manager', element:<Manager />,loader:fetchUserData,
    children:[
      // {path:'view-account', element:<UserPage /> ,loader:userFetchAll},
      {path:'rooms', element:<RoomDetail />, loader:roomLoader,action:actionRoom},
      {path:'view-account', element:<UserPage />,loader:userFetchAll },
      {path:'reservation', element:<ReservationDetail /> ,loader:reservationLoader},
      {path:'managefood', element:<FoodDetail />,loader:foodLoader,action:actionFood},
      {path:'', element:<DashbordData />},
        ],
      // errorElement:<LoginError />
    },
    
    

    {path:'/receptionist', element:<Receptionist />,loader:receptionstLoader
     ,errorElement:<LoginError /> },


    {path:'/staff_member', element:<Staff />,loader:staffLoader,
    children:[
      {path:'user', element:<UserPage /> ,loader:userFetchAll},
      {path:'rooms', element:<RoomDetail />}
    ] 
  ,errorElement:<LoginError /> },
    { path:'/maintenace_team', element:<Maintenance />,
    children:[
      {path:'user', element:<UserPage /> ,loader:userFetchAll},
      {path:'rooms', element:<RoomDetail />}
      
    ]  
  ,errorElement:<LoginError />},
     {path:'/guest', element:<LandingPage /> ,loader:userLoader,errorElement:<LoginError />
    },

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
