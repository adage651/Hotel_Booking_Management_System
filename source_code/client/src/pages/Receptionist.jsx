import React, { useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Outlet,redirect, Route, Routes, useLoaderData, useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/dashboard/index.jsx";
// import UserPage ,{ loader as userFetchAll } from './userTabel/view/user-view.js';
import UserContext from "../context/userContext.js";
import { ControlOutlined } from "@ant-design/icons";
import socket from "../pages/socket.js";
import { OverlayPanel } from 'primereact/overlaypanel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Receptionist =() =>{
        const userData=useLoaderData()
       const navigate=useNavigate();
        if(userData.user_type!=="receptionist"){
           
            return  navigate('/login');
        }    
        const  [staffRoomData,setStaffRoomData]=useState();
    const toast = useRef(null);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [showOnlineStaffList,setShowOnlineStaffList]=useState(false)
    const op=useRef(null)
    const [onlineStaff,setOnlineStaff]=useState([])

        const accept = (e) => {
            console.log('Confirmed');
                    setShowOnlineStaffList(true)
                   
                    
            //   toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        socket.emit('getOnlineStaff',{userName:userData.userName});
        socket.on('onlineStaff', (data) => {
            setOnlineStaff(data)
            console.log(data)
        });
         op.current.toggle(e)
    }

    const reject = () => {
        // toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
        const showTemplate = (messages) => {
            // console.log(messages)

        confirmDialog({
            header: 'Confirmation',
            message: (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                    <span>{messages} Wants To Leave</span>
                    <br />
                    <span>Do you Want To Send Staff To Room</span>
                </div>
            ),
            accept:() => {
        socket.emit('getOnlineStaff',{userName:userData.userName});
console.log('inside')
//  toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        socket.on('onlineStaff', (data) => {
          
            setOnlineStaff(data)
             console.log('64',data)
        });
        setShowOnlineStaffList(true)
    },
            reject
        })
    };
    const confirm = (position,messages) => {
   
        confirmDialog({
            message:  (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                    <span>{messages.userName} Wants To Leave</span>
                    <br />
                    <span>Do you Want To Send Staff To Room</span>
                </div>
            ),
            header: (<div className="inline-flex align-items-center justify-content-center gap-2">
                    {/* <Avatar
          src={"https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"}
          alt={"https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {userData.firstName.charAt(0).toUpperCase()}
        </Avatar> */}


<IconButton color="primary">
  <SettingsIcon />
</IconButton>
            <span className="font-bold white-space-nowrap">New Message From System</span>
        </div>),
            icon: 'pi pi-warn-circle',
            position,
            accept:accept,
            reject:reject
        });
    };
    const staffSelect = (e) => {
       setShowOnlineStaffList(false)
    
       op.current.hide()

       console.log({staffRoomData})
       socket.emit('staffToManageRoom',{staffRoom:staffRoomData,staffId:e.data.id,staffUserName:e.data.userName})

        // toast.current.show({ severity: 'info', summary: 'Staff Selected', detail:`You have Selected ${e.data.userName}`, life: 3000 }); 
    };
        const imageBody = (rowData) => {
        return <Avatar src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="w-4rem shadow-1" />
    };

socket.emit('userName',[userData.userName,userData.user_type])
socket.on('userWantsToLeave',userRoom => {   
const secondParse=JSON.parse(userRoom)
setStaffRoomData(secondParse)
confirm('top-right',JSON.parse(secondParse));
  })
       socket.on('getOnlineStaff',{userName:userData.userName});
       socket.on('onlineStaff', async (data) => {
        console.log('data',data)
           setOnlineStaff(await data)
            });
            const getNotification =() =>{
                console.log('featching notification')
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
                <Toast ref={toast} />
            <ConfirmDialog
                style={{ width: '50vw' }}
                breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
            />
            <OverlayPanel ref={op} visible={showOnlineStaffList} showCloseIcon closeOnEscape dismissable={false}>
                    <DataTable value={onlineStaff} selectionMode="single" paginator rows={5} selection={selectedStaff} onSelectionChange={(e) => setSelectedStaff(e.value)} onRowClick={staffSelect}>
                        <Column field="id" header="ID" sortable  style={{minWidth: '8rem'}} />
                        <Column field="userName" header="UserName" sortable style={{ minWidth: '12rem' }} />
                        <Column header="profilePicture" body={imageBody} />
                    </DataTable>
            </OverlayPanel>
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

export default Receptionist;