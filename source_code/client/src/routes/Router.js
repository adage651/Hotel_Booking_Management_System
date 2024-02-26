import { useRoutes } from "react-router-dom"
import Login , {action as loginAction ,loader as loginLoader} from '../Pages/Login'
import Home ,{loader as homeLoader} from '../Pages/home'
import Register from '../Pages/Register'
import {RouterProvider ,createBrowserRouter} from 'react-router-dom'
import AuthRegister, {action as authAction} from '../Pages/AuthRegister'
import Manager from '../Pages/Manager'
//import {action as loginAction } from './Pages/Login'



const Router=()=>{

    const route=[
  {path:'/',element:<Home />, loader:homeLoader},
  {path:'/manager' ,element:<Manager />},
  {path:'/login',element:<Login />, action:loginAction,loader:loginLoader},
  {path:'/register',element:<Register />,
    action:authAction ,
    children:[
    {index:true, element:<AuthRegister />,
action:authAction
      }
  ]},
]
    const routes=useRoutes(route);
    return routes;

}
export default Router


//onst router=createBrowserRouter()