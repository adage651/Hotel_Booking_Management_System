import { Outlet, Route, Routes, useLoaderData } from "react-router-dom";
import DashboardLayout from "../layout/dashboard/index.jsx";
import UserPage ,{ loader as userFetchAll } from '../Pages/userTabel/view/user-view.jsx';
import UserContext from "../context/userContext.js";
import { ControlOutlined } from "@ant-design/icons";

const Staff =() =>{
    const userData=useLoaderData()
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
console.log(resData)
if (!resData.user){
    resData.user={
        profilePicture:'',
        firstName:'',
        lastName:'',
        emailAddress:'',
        navConfig:[],
        user_type:'',
        permissions:''

    }
}

return resData.user;
}



export const action =()=>{
    
}

export default Staff;