import React, { useState,useRef,useContext, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import socket from './socket'
import UserContext from '../context/userContext';
import { Toast } from 'primereact/toast';
import EmojiPicker from 'emoji-picker-react';
import { Avatar } from '@mui/material';

import { OverlayPanel } from 'primereact/overlaypanel';
import { ScrollPanel } from 'primereact/scrollpanel';
import { useLoaderData } from 'react-router-dom';
import { set } from 'date-fns';
import { InputTextarea } from 'primereact/inputtextarea';

        

const Contact = ({user_Type}) => {

    const [visible, setVisible] = useState(false);
    const toastBC = useRef(null);
        const op = useRef(null);
const toast = useRef(null);

const ctx=useContext(UserContext);
const [newUser,setedUserAdd]=useState(null)
const [onlineUsers,setOnlineUsers]=useState([])
const resData=useLoaderData();
// setOnlineUsers(resData)
console.log('25',resData)
const [selected,setSelected]=useState([])
// const [selected,setSelected]=useState([])
let userAdd=false;
// useEffect( async ()=>{
//       socket.emit('userName',[ctx.userName,ctx.user_type])
//       socket.emit('onlineUsersRequest',[ctx.userName,ctx.user_type])
//       console.log('request sent and error happens')

// let reason;
// socket.on('newUserAdd',(user)=>{
//     console.log('new user')
//     setedUserAdd(user)
// userAdd=true;
// })
// socket.on('userLeft',(user)=>{
//     console.log('user left')
//     setedUserAdd(prevValue=>{
//         return prevValue.userName!=user.userName
//     })
//     userAdd=false;
// })
// socket.on('onlineUsers', (queryResult) => {
//  const onlineUserData=JSON.parse(queryResult);
//  console.log(onlineUserData)
// setOnlineUsers(fetchContactInfo(
//     {chatUserData:onlineUserData,
//         owner:{userName:ctx.userName,userType:ctx.user_type}}))
// }); 
// onlineUsers.forEach(user=>{
//     if(reason===user.userName){
//    socket.on('onlineUsers', (queryResult) => {
// const onlineUserData=JSON.parse(queryResult);
// setOnlineUsers(fetchContactInfo(
//     {chatUserData:onlineUserData,
//         owner:{userName:ctx.userName,userType:ctx.user_type}}))


// })

// }
// });    
  
// console.log(onlineUsers)
// },[userAdd])




// const selectUser=(userName)=>{
//     const selectedChat=[onlineUsers.find(user=>user.userName===userName)]
//     setSelected(selectedChat)
// }
  const [showEmojiPicker, setShowEmojiPicker] = useState(true); // State to control the visibility of EmojiPicker
  const [selectedEmoji, setSelectedEmoji] = useState(null); // State to store the selected emoji
  const [inputValue, setInputValue] = useState(''); // State to store the input field value

  const handleEmojiClick = (event, emojiObject) => {
    setSelectedEmoji(emojiObject); // Update the selected emoji state
    setShowEmojiPicker(false); // Hide the EmojiPicker
        setInputValue((prvVal=>{
        return prvVal+emojiObject.emoji;
    }));
  };

  const handleInputChange = (event) => {
    setInputValue((prvVal=>{
        return prvVal+event.target.value
    })); // Update the input field value
  };

  const handleAddWord = () => {
    console.log(`Adding word: ${inputValue}`);
    setInputValue(''); // Clear the input field after adding a word
  };
const [specificMessage,setSpecificMessage]=useState([])
const selctedUser=async(user,userName)=>{

        const response= await fetch(`http://${process.env.REACT_APP_SERVERURL}/contact/getMessages`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({sender:ctx.userName,receiver:userName})
    })
    const contactDetail=await response.json()
    console.log(contactDetail.contactData,user)
   
setSelected(userName);
setSpecificMessage(contactDetail.contactData)

return contactDetail.contactData;    

}

socket.on('newMessage',(senderWeMessage)=>{
const value = JSON.parse(senderWeMessage);
console.log(value)
setSpecificMessage(prevValue=>{
    return [...prevValue,value]
})

})


    const clear = () => {
        toastBC.current.clear();
        setVisible(false);
    };

    const confirm = () => {
        if (!visible) {
            setVisible(true);
            toastBC.current.clear();
            toastBC.current.show({
                severity: 'success',
                summary: 'Can you send me the report?',
                sticky: true,
                content: (props) => (
                    <div className="flex flex-column align-items-left" style={{ flex: '1' }}>
                        <div className="flex align-items-center gap-2">
                            <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
                            <span className="font-bold text-900">Amy Elsner</span>
                        </div>
                        <div className="font-medium text-lg my-3 text-900">{props.message.summary}</div>
                        <Button className="p-button-sm flex" label="Reply" severity="success" onClick={clear}></Button>
                    </div>
                )
            });
        }
    };


    const fetchUser =  (userName) => {
        let value;
         fetch(`http://${process.env.REACT_APP_SERVERURL}/users/getUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName: userName })
        }).then(response=>response.json()).then(data=>{
value=data
        })
      return value 
    }


 const sendMessage=async(e)=>{
    console.log('message sent')
    setSpecificMessage(prevValue=>{
        return [...prevValue,{sender:ctx.userName,receiver:selected,message:inputValue,message_type:'sent'}]
    })
    const response= await fetch(`http://${process.env.REACT_APP_SERVERURL}/contact/sendMessage`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({sender:ctx.userName,receiver:selected,message:inputValue})
    })
    socket.emit('message',JSON.stringify({sender:ctx.userName,receiver:selected,message:inputValue}))
    }
 

return (
    <div>
      
            
    <div class="layout-content">

        <div class="flex flex-column md:flex-row gap-5" style={{miHeight:"81vh"}}>
            <div class="md:w-25rem card p-0">
                <div class="flex flex-column align-items-center border-bottom-1 surface-border p-6">
                  <Toast ref={toastBC} position="bottom-center" onRemove={clear} />
                    <Avatar
                       src={ctx.profilePicture} class="w-6rem h-6rem border-circle shadow-4"
                        alt={ctx.firstName} /><span class="text-900 text-xl font-semibold mt-4">{ctx.firstName+" "+ctx.lastName}</span>
                </div>
                <ScrollPanel style={{ width: '100%', height: '540px' }} class="w-full flex row-gap-4 flex-column surface-border p-4">
                    <span
                        class="p-input-icon-left w-full"><i class="pi pi-search"></i><input
                            class="p-inputtext p-component w-full w-full" id="search" placeholder="Search"
                            data-pc-name="inputtext" data-pc-section="root" type="text" value="" />
                   </span>
                    <div class="flex flex-row gap-4 md:flex-column overflow-auto">
                        
                        
                        {Object.keys(resData.users).map((userName)=>{
                           let user=resData.users[userName]
                        if (user.firstName===null||user.firstName===undefined){
                            user={
                            firstName:userName,
                            lastName:userName,
                            profilePicture:userName,
                            
                        }
                    }
                        return    user.firstName===null||user.firstName===undefined?
                       
                        // user= fetchUser(userName)
                            (<div onClick={()=>{selctedUser(user,userName)}} class="flex flex-nowrap justify-content-between align-items-center border-1 surface-border border-round p-3 cursor-pointer select-none hover:surface-hover transition-colors transition-duration-150"
                            tabindex="0">


                            <div class="flex align-items-center">
                                <div class="relative md:mr-3"><Avatar src={`http://${process.env.REACT_APP_SERVERURL}/public/uploads/${user.profilePicture}`}
                                        alt={user.firstName} class="w-3rem h-3rem border-circle shadow-4" /><span
                                        class="w-1rem h-1rem border-circle border-2 surface-border absolute bg-green-400 bg-yellow-400"
                                        style={{bottom:"2px", right:"2px"}}></span></div>
                                <div class="flex-column hidden md:flex"><span class="text-900 font-semibold block">
                                        {user.firstName+' '+user.lastName}</span><span
                                        class="block text-600 text-overflow-ellipsis overflow-hidden white-space-nowrap w-10rem text-sm">Sed
                                        do eiusmod tempor incididunt ut labore et dolore magna aliqua</span></div>
                            </div>
                            <span class="text-700 font-semibold ml-auto hidden md:inline">2d</span>
                        </div>)
                            :(
 <div onClick={()=>{selctedUser(user,userName)}} class="flex flex-nowrap justify-content-between align-items-center border-1 surface-border border-round p-3 cursor-pointer select-none hover:surface-hover transition-colors transition-duration-150"
                            tabindex="0">


                            <div class="flex align-items-center">
                                <div class="relative md:mr-3"><Avatar src={`http://${process.env.REACT_APP_SERVERURL}/public/uploads/${user.profilePicture}`}
                                        alt={user.firstName} class="w-3rem h-3rem border-circle shadow-4" /><span
                                        class="w-1rem h-1rem border-circle border-2 surface-border absolute bg-green-400 bg-yellow-400"
                                        style={{bottom:"2px", right:"2px"}}></span></div>
                                <div class="flex-column hidden md:flex"><span class="text-900 font-semibold block">
                                        {user.firstName+' '+user.lastName}</span><span
                                        class="block text-600 text-overflow-ellipsis overflow-hidden white-space-nowrap w-10rem text-sm">Sed
                                        do eiusmod tempor incididunt ut labore et dolore magna aliqua</span></div>
                            </div>
                            <span class="text-700 font-semibold ml-auto hidden md:inline">2d</span>
                        </div>
                        )
                         })
                        
                         } 
                       
                        

                    </div>
                </ScrollPanel>
            </div>




    <div class="flex-1 card p-0">
                <div class="flex flex-column h-full">
                    <div class="flex align-items-center border-bottom-1 surface-border p-3 lg:p-6">
                        <div class="relative flex align-items-center mr-3">
                            <Avatar
                                src={`http://${process.env.REACT_APP_SERVERURL}/public/uploads/${selected.profilePicture}`} alt={selected.firstName}
                                class="w-4rem h-4rem border-circle shadow-4" /><span
                                class="w-1rem h-1rem border-circle border-2 surface-border absolute bottom-0 right-0 bg-green-400"></span>
                        </div>
                        <div class="mr-2"><span class="text-900 font-semibold block">{selected.firstName+" "+selected.lastName}</span><span
                                class="text-700">Last active 1 hour ago</span></div>
                        <div class="flex align-items-center ml-auto">
                            <button
                                class="mr-3 p-button p-component p-button-icon-only p-button-outlined p-button-rounded p-button-secondary"
                                type="button" data-pc-name="button" data-pc-section="root"><span
                                    class="p-button-icon p-c pi pi-phone" data-pc-section="icon"></span><span
                                    class="p-button-label p-c" data-pc-section="label">&nbsp;</span><span
                                    role="presentation" aria-hidden="true" class="p-ink" data-pc-name="ripple"
                                    data-pc-section="root" style={{height:"42px", width:"42px"}}></span></button><button
                                class="p-button p-component p-button-icon-only p-button-outlined p-button-rounded p-button-secondary"
                                type="button" data-pc-name="button" data-pc-section="root"><span
                                    class="p-button-icon p-c pi pi-ellipsis-v" data-pc-section="icon"></span><span
                                    class="p-button-label p-c" data-pc-section="label">&nbsp;</span><span
                                    role="presentation" aria-hidden="true" class="p-ink" data-pc-name="ripple"
                                    data-pc-section="root" style={{height:"42px", width:"42px"}}></span></button>
                            </div>
                    </div>

                    <ScrollPanel class="p-3 md:px-4 lg:px-6 lg:py-4 mt-2 overflow-y-auto" style={{ width: '100%', height: '550px' ,overflowX:'clip'}}>
                 {  specificMessage.map(message=>{  
                    return  message.message_type!=="sent"?
                        (
                        <div>
                            <div class="grid grid-nogutter mb-4">
                                <div class="mr-3 mt-1"><Avatar src={`http://${process.env.REACT_APP_SERVERURL}/public/uploads/${selected.profilePicture}`} alt={selected.firstName}
                                        class="w-3rem h-3rem border-circle shadow-4" /></div>
                                <div class="col mt-3">
                                    <p class="text-900 font-semibold mb-3">{selected.firstName+" "+selected.lastName}</p><span
                                        class="text-700 inline-block font-medium border-1 surface-border p-3 white-space-normal border-round"
                                        style={{wordBreak:"breakWord" ,maxWidth:"80%"}}>
                                            {message.message}
                                        </span>
                                    <p class="text-700 mt-3">23:25<i class="pi pi-check ml-2 text-green-400"></i></p>
                                </div>
                            </div>
                        </div>
                        ):
                        (
                        <div>
                            <div class="grid grid-nogutter mb-4">
                                <div class="col mt-3 text-right">
                                    <span
                                        class="inline-block text-left font-medium border-1 surface-border bg-primary-100 text-primary-900 p-3 white-space-normal border-round"
                                        style={{wordBreak:"breakWord;", maxWidth:"80%"}}>{message.message}</span>
                                    <p class="text-700 mt-3">23:26 <i class="pi pi-check ml-2 text-green-400"></i></p>
                                </div>
                            </div>
                        </div>
                        )





                         }
)}                   

                    </ScrollPanel>
                    <div
                        class="p-3 md:p-4 lg:p-6 flex flex-column sm:flex-row align-items-center mt-auto border-top-1 surface-border gap-3">
                        <InputText value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                            class="p-inputtext p-component flex-1 w-full sm:w-auto border-round flex-1 w-full sm:w-auto border-round"
                            id="message" placeholder="Type a message" data-pc-name="inputtext" data-pc-section="root"
                            type="text"  />
    <div class="flex w-full sm:w-auto gap-3">
        <button onClick={(e) => {op.current.toggle(e); setShowEmojiPicker(true)}}
            class="w-full sm:w-auto justify-content-center text-xl p-button p-component p-button-secondary"
            data-pc-name="button" data-pc-section="root">😀<span role="presentation" aria-hidden="true" class="p-ink"
                data-pc-name="ripple" data-pc-section="root"
                style={{height: "58.8281px;", width: "58.8281px;"}}></span></button>
                <button aria-label="Send" onClick={()=>{
                    sendMessage()
                }} 
            class="w-full sm:w-auto p-button p-component" data-pc-name="button" data-pc-section="root">
            <span
                class="p-button-icon p-c p-button-icon-left pi pi-send" data-pc-section="icon"></span><span
                class="p-button-label p-c" data-pc-section="label">Send</span>
            <span role="presentation"
                aria-hidden="true" class="p-ink" data-pc-name="ripple" data-pc-section="root"
                style={{height: "93.6719px;", width: "93.6719px;"}}></span></button></div>
                     <OverlayPanel ref={op}> 
      {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
      </OverlayPanel>
                    </div>

                </div>
            </div>
            






        </div>
    </div>
    </div>
  )};
export default Contact;
    // <div className="p-grid p-justify-center">
    //   <div className="p-col-6">
    //     <Toast ref={toast} />

    //     <Card title="Guest Check-In" className="p-fluid">
    //       <div className="p-field">
    //         <label htmlFor="reservationId">Reservation ID:</label>
    //         <div className="p-inputgroup">
    //           <InputText id="reservationId" value={reservationId} onChange={(e) => setReservationId(e.target.value)} />
    //           <Button icon="pi pi-search" className="p-button-rounded p-button-success" onClick={handleReservationSearch} />
    //         </div>
    //       </div>

    //       <div className="p-field">
    //         <label htmlFor="qrCode">QR Code:</label>
    //         <div className="p-inputgroup">
    //           <InputText id="qrCode" value={qrCode} onChange={(e) => setQrCode(e.target.value)} />
    //           <Button icon="pi pi-camera" className="p-button-rounded p-button-success" onClick={handleQrCodeScan} />
    //         </div>
    //       </div>
    //     </Card>
    //   </div>
    // </div>



export const loader=async()=>{
       const response= await fetch(`http://${process.env.REACT_APP_SERVERURL}/users/userdata` ,{
  method: 'GET',
  credentials: 'include',
});
let resData= await response.json(); 

socket.emit('userName',[resData.user.userName,resData.user.user_type])
      socket.emit('onlineUsersRequest',[resData.user.userName,resData.user.user_type])
      console.log('request sent and error happens')
       let finalResult;
  let resolveFunction;
  
  const promise = new Promise((resolve, reject) => {
    resolveFunction = resolve;

const fetchContactInfo= async(contactInfo)=>{
    const response= await fetch(`http://${process.env.REACT_APP_SERVERURL}/contact/contactData`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(contactInfo)
    })
    const contactDetail=await response.json()
    
    return contactDetail
}
socket.on('onlineUsers', async (queryResult) => {

 const onlineUserData=JSON.parse(queryResult);
 
    const returnValue = await fetchContactInfo({chatUserData:onlineUserData,
         owner:{userName:resData.user.userName,userType:resData.user.user_type}});
    resolveFunction(returnValue);
});  
  })
  promise.resolve = resolveFunction;

  return finalResult !== undefined ? finalResult : promise;
 
    }