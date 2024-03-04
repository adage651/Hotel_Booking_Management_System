import { useState } from 'react';
import {useActionData, useLoaderData, useNavigate} from 'react-router-dom'
const Home = () =>{
    const userData=useLoaderData();
    //const navigate=useNavigate();
   

return <>
<h1>
{/* welcome back {userData.firtName} */}
welcome back ...
</h1>

</>
}
export default Home
export const loader = async() => {
   const response=await fetch('http://localhost:8000/pages/guesthome',{
  method: 'GET',
  credentials: 'include'
})

   const resData=await response.json()
    return resData
}