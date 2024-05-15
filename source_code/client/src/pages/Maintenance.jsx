import { Outlet, Route, Routes, useLoaderData } from "react-router-dom";
import DashboardLayout from "../layout/dashboard/index.jsx";
// import UserPage ,{ loader as userFetchAll } from './userTabel/view/user-view.js';
import UserContext from "../context/userContext.js";
import { ControlOutlined } from "@ant-design/icons";
import socket from './socket.js';

const Maintenance =() =>{
    const userData=useLoaderData()
  socket.emit('userName',userData.userName+userData.id)
  const getNotification =() =>{
    console.log('notification fetching')
  }
    return (
<UserContext.Provider value={{
profilePicture:userData.profilePicture,
firstName:userData.firstName,
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
    console.log('the error is in manager loader')
const response= await fetch(`http://${process.env.REACT_APP_SERVERURL}/users/userdata` ,{
  method: 'GET',
  credentials: 'include',
});
let resData= await response.json();
console.log(resData)
if (!resData.user){
    resData.user={
        profilePicture:'',
        firstName:'',
        lastName:'',
        emailAddress:'',
        navConfig:[],
        user_type:''
    }
}

return resData.user;
}



export const action =()=>{
    
}

export default Maintenance;