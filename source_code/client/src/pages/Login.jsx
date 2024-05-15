import React, { useContext, useEffect, useState,useRef } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
//import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
//import { classNames } from 'primereact/utils';
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import { OverlayPanel } from 'primereact/overlaypanel';
import {Redirect, Route, useLoaderData, useNavigate,useLocation} from 'react-router-dom'
import { Form, redirect, useSubmit } from "react-router-dom"
import AuthWrapper from './AuthWrapper';
import emailjs from "emailjs-com";
import socket from './socket';
const Login = () => {
      
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
const [resetEmail,setRestEmail]=useState('');
 const handleForgot=async ()=>{
const response=await fetch(`http://${process.env.REACT_APP_SERVERURL}/users/forgot`,{
    method: 'POST',
    headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            emailAddress:resetEmail
        })
    });

   const data=await response.json();
   if(!data.error){
    
    sendEmail(resetEmail,data)
   }
 }
    // useEffect(()=>{
 const sendEmail = (data,userData) => {
    emailjs
      .send(
        "service_kmh9iad",
        "template_5z2zxrc",
        {
        //    to_name: data.name,
          to_email: data,
          from_name: "Yejoka Hotel",
          from_email: "addisuagerie544@gmail.com",
          reply_to: "addisuagerie544@gmail.com",
        },
        "ZD22_SHsZzzBOaH6v"
      )
      .then((response) => {
        console.log("Email sent successfully!", response.text);
        op.current.hide();
   localStorage.setItem('user',JSON.stringify(userData))
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };
  
   const op = useRef(null);
    return (        
        <Form method='post'>
    
        <div className='surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden'>
            <div className="flex flex-column align-items-center justify-content-center">
                {/* <img src='https://sakai.primereact.org/layout/images/logo-dark.svg' alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" /> */}
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src="/assets/icons/profile.png" alt="Image" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Welcome, User!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                UserName
                            </label>
                            <InputText required name='userName' id="email1" type="text" placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password required name='password' inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div>
                                <a onClick={(e)=>{op.current.toggle(e)}} className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a>
            <OverlayPanel ref={op}>
                       <div className="card flex justify-content-center" style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <div className="flex flex-column gap-2">
                <label htmlFor="username">Email Address</label>
                <InputText value={resetEmail} onChange={(e)=>{ setRestEmail(e.target.value)}} id="username" aria-describedby="username-help" />
                <small id="username-help">
                    Enter your email to reset your password.
                </small>
            </div>
            <Button label="Send" severity="help" onClick={handleForgot} text raised />
        </div>

            </OverlayPanel>
                                
                            </div>
                            <Button type='submit' label="Sign In" className="w-full p-3 text-xl" ></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                
        </Form>
    );
};

export default Login;
export const action = async({request,parms}) => {
    const data=await request.formData()
   const loginData ={
    userName:data.get('userName'),
    password:data.get('password')
    }
    const response =await fetch(`http://${process.env.REACT_APP_SERVERURL}/auth`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
    },
    body:JSON.stringify(loginData),
    credentials: 'include'
    })
    const resData=await response.json();
    if(resData.isLogin){
    if(resData.user.user_type==='guest'){
     return redirect('/')
    }else if(resData.user.user_type==='receptionist'){
     return redirect('/receptionist')
    }else if(resData.user.user_type==='staff'){
     return redirect('/staff_member')
    }else if(resData.user.user_type==='manager'){
     return redirect('/manager')
    }else if(resData.user.user_type==='maintenance'){
     return redirect('/maintenance_team')
    }
} else{
    return redirect('/loginError')
}

return resData
    
}

export const loader = async( )=>{
const response=await fetch(`http://${process.env.REACT_APP_SERVERURL}/auth/legal`,{method:'GET',   credentials: 'include'})

const resData=await response.json();

 if(resData.valid){
    
    if(resData.user.user_type==='manager'){
        return redirect('/manager')
    }else if(resData.user.user_type==='guest'){
        return redirect('/guest')
    }else if(resData.user.user_type==='receptionist'){
        return redirect('/receptionist')
    }else if(resData.user.user_type==='staff'){
        return redirect('/staff_member')
    }else if(resData.user.user_type==='maintenance'){
        return redirect('/maintenance_team')
    }
 }
return null
}
