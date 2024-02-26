import './App.css';

import "primereact/resources/themes/lara-light-cyan/theme.css";

import Login , {action as loginAction ,loader as loginLoader} from './Pages/Login'
import Home ,{loader as homeLoader} from './Pages/home'
import Register from './Pages/Register'
import {Router,BrowserRouter, Route, RouterProvider ,Routes,createBrowserRouter, createRoutesFromChildren, createRoutesFromElements} from 'react-router-dom'
import AuthRegister, {action as authAction} from './Pages/AuthRegister'
import Manager from './Pages/Manager'
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
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layout/dashboard';
import DashbordData from './pages/app.jsx'
import { Card } from 'primereact/card';
        

const router=createBrowserRouter(createRoutesFromElements(  
      <Route>
      <Route path='/' end element={ 
      <DashboardLayout>
         <Suspense>
          <DashbordData />
      {/* <Home /> */}
          </Suspense>
      </DashboardLayout>}  loader={homeLoader} />
     <Route path='/home' element={<Home />} loader={homeLoader} />
      <Route path='/login' element={<Login />} action={loginAction} loader={loginLoader} />
      <Route path='/register' element={<Register />} action={authAction}>
        <Route path='/register' element={<AuthRegister />} action={authAction} />
      </Route>
    </Route>))


function App() {
  
  return (
    // <RouterProvider router={router} />
     //   {/* <Router /> */}

  <RouterProvider router={router} />


  );
}

export default App;
