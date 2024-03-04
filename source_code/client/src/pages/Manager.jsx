import { Outlet, Route, Routes, redirect, useLoaderData } from "react-router-dom";
import DashboardLayout from "../layout/dashboard/index.jsx";
import UserPage ,{ loader as userFetchAll } from '../Pages/userTabel/view/user-view.jsx';
import UserContext from "../context/userContext.js";
import { ControlOutlined } from "@ant-design/icons";

const Manager =() =>{
    const userData=useLoaderData()
    console.log(userData.permissions)
    return (
<UserContext.Provider value={{
profilePicture:userData.profilePicture,
firstName:userData.firstName,
lastName:userData.lastName,
emailAddress:userData.emailAddress,
navConfig:JSON.parse(userData.permissions),
user_type:userData.user_type
}} >
    <DashboardLayout>
        <Outlet />
    </DashboardLayout>
</UserContext.Provider>

    )
    
}

export const loader = async()=>{
    console.log('the error is in manager loader')
const response= await fetch('http://localhost:8000/users/userdata' ,{
  method: 'GET',
  credentials: 'include',
});
let resData= await response.json();
if(resData.error){
       console.log(resData.error)
    return redirect('/loginError')
 
}

return resData.user;
}



export const action =()=>{
    
}

export default Manager;