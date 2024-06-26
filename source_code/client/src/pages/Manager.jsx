import { Outlet, Route, Routes, redirect, useNavigate, useLoaderData } from "react-router-dom";
import DashboardLayout from "../layout/dashboard/index.jsx";
// import UserPage ,{ loader as userFetchAll } from './userTabel/view/user-view.js';
import UserContext from "../context/userContext.js";
import { ControlOutlined } from "@ant-design/icons";
import socket from "./socket.js";

const Manager =() =>{
    
    const userData=useLoaderData()
       const navigate=useNavigate();
        if(userData.user_type!=="manager"){
           
            return  navigate('/login');
        }   
  socket.emit('userName',[userData.userName,userData.user_type])

  const getNotification =()=>{
    console.log('notification fetching')
  }
    return (
<UserContext.Provider value={{
profilePicture:userData.profilePicture,
firstName:userData.firstName,
userName:userData.userName,
userId:userData.id,
lastName:userData.lastName,
emailAddress:userData.emailAddress,
navConfig:JSON.parse(userData.permissions),
user_type:userData.user_type
}} >
    <DashboardLayout getNotification={getNotification}>
        <Outlet />
    </DashboardLayout>
</UserContext.Provider>

    )
    
}

export const loader = async()=>{
const response= await fetch(`http://${process.env.REACT_APP_SERVERURL}/users/userdata` ,{
  method: 'GET',
  credentials: 'include',
});
let resData= await response.json();
if(resData.error){
    return redirect('/loginError')
}

return resData.user;
}



export const action =()=>{

}

export default Manager;