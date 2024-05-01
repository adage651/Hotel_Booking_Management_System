import { useRef } from'react';
import { Outlet, Route, Routes, useLoaderData } from "react-router-dom";
import DashboardLayout from "../layout/dashboard/index.jsx";
// import UserPage ,{ loader as userFetchAll } from './userTabel/view/user-view.js';
import UserContext from "../context/userContext.js";
import { ControlOutlined } from "@ant-design/icons";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import socket from "../pages/socket.js";
import { Toast } from 'primereact/toast';   
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
const Staff =() =>{
    const toast = useRef();
    const userData=useLoaderData()
    console.log('staff user is registered')
  socket.emit('userName',[userData.userName,userData.user_type])
  socket.on('staffManageRoom', (data) => {
    const roomInfo=JSON.parse(data)
  confirmDialog({
            message:  (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                    <span>{roomInfo.userName} Wants To Checkout Please Visit His/Her Room Health</span>
                </div>
            ),
            header: (<div className="inline-flex align-items-center justify-content-center gap-2">
                        <IconButton color="primary">
                        <SettingsIcon />
                        </IconButton>
                        {/* <span className="font-bold white-space-nowrap">New Message From System</span> */}
                    </div>),
            icon: 'pi pi-warn-circle',
            position:"top-left",
            accept: async()=>{
                        },
            reject: () => {}
        });
// toast.current.show({ severity: 'info', summary: 'Guest Checkout', detail:`${roomInfo.userName} Wants To Leave So Please Visit Room Health`, life: 3000 });

})
console.log('id',userData.id)
    return (
<UserContext.Provider value={{
id:userData.id,
profilePicture:userData.profilePicture,
firstName:userData.firstName,
lastName:userData.lastName,
emailAddress:userData.emailAddress,
navConfig:JSON.parse(userData.permissions),
user_type:userData.user_type
}} >
    <Toast ref={toast} />
    <ConfirmDialog />
    <DashboardLayout>
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
        user_type:'',
        permissions:''

    }
}

return resData.user;
}



export const action =()=>{
    
}

export default Staff;