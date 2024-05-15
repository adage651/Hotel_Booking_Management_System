
import { Password } from 'primereact/password';
 import { FloatLabel } from 'primereact/floatlabel';       
import { useRef ,useState,useEffect} from 'react'; 
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
const navigate = useNavigate();
 const [newPassword, setNewPassword] = useState('');
 const [confirm, setConfirm] = useState('');
 const [userToReset , setUserToReset] = useState('');
 
 useEffect(()=>{
const userValue= localStorage.getItem('user')
localStorage.removeItem('user')

 let userToResetId;
 if(userValue!==null&& userValue!=='undefined'){
    userToResetId=JSON.parse(userValue)
    setUserToReset(userToResetId)
   }
 },[])
 
   const handleSubmit =async()=>{
    const data= {newPassword,userToReset}
    const response= await fetch(`http://${process.env.REACT_APP_SERVERURL}/users/resetPassword`,{
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        });
        const result= await response.json();
    alert(result.message)
   }
   return  ( <div class="flex align-items-center justify-content-between flex-column h-screen">     
    <div class="flex flex-column align-items-center justify-content-center w-full md:w-4 h-full text-center py-6 px-4">
        <a class="mb-6" style={{cursor: "pointer;"}}><svg height="56" viewBox="0 0 17 20" fill="none">
                <path
                    d="M0 0H6.00019V3.82345L17 1.66667V6.66667L6.00019 8.82345V10.4901L17 8.33333V13.3333L6.00019 15.4901V20H0V0Z"
                    fill="url(#paint0_linear)"></path>
                <defs>
                    <linearGradient id="paint0_linear" x1="3.33335" y1="3.08442e-08" x2="8.49995" y2="20"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--primary-400)"></stop>
                        <stop offset="1" stop-color="var(--primary-700)"></stop>
                    </linearGradient>
                </defs>
            </svg></a>
        <div class="mb-4">
            <div class="text-900 text-xl font-bold mb-2">New Password</div><span class="text-600 font-medium">Enter your
                new password</span>
        </div>
        <div class="flex flex-column"><span class="p-input-icon-left w-full mb-4"><i class="pi pi-lock z-2"></i>
                <div id="password" class="p-password p-component p-inputwrapper p-input-icon-right w-full"
                    data-pc-name="password" data-pc-section="root">
                          <div className="card flex justify-content-center">
            <FloatLabel>
                <Password inputId="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <label htmlFor="password">New Password</label>
            </FloatLabel>
        </div>
        </div>
            </span><span class="p-input-icon-left w-full mb-4"><i class="pi pi-lock z-2"></i>
                <div id="repeatpassword" class="p-password p-component p-inputwrapper p-input-icon-right w-full"
                    data-pc-name="password" data-pc-section="root">
                          <div className="card flex justify-content-center">
            <FloatLabel>
                <Password inputId="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                <label htmlFor="password">Retype Password</label>
            </FloatLabel>
        </div>
                        </div>
            </span>
            <div class="flex flex-wrap gap-2 justify-content-between"><button aria-label="Cancel"
                    class="flex-auto p-button-outlined p-button p-component" data-pc-name="button"
                    data-pc-section="root"><span class="p-button-label p-c"
                        data-pc-section="label">Cancel</span></button><button aria-label="Submit" onClick={handleSubmit}
                    class="flex-auto p-button p-component" data-pc-name="button" data-pc-section="root"><span
                        class="p-button-label p-c" data-pc-section="label">Submit</span></button></div>
        </div>
    </div>
    </div>)

}
export default ForgotPassword
export  const loader =()=>{
return 1;
}