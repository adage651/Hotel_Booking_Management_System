import { useRef ,useState,useEffect} from 'react'; 
import { Panel } from 'primereact/panel';
import  Avatar from '@mui/material/Avatar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

import { Password } from 'primereact/password';
 import { FloatLabel } from 'primereact/floatlabel';       

const practice = () => {
  const [data,setData]=useState([])
  const [value, setValue] = useState('');

 

useEffect(()=>{

  fetch(`http://${process.env.REACT_APP_SERVERURL}/feedback/getFeedBack`, {
    method: 'GET',
    credentials: 'include',
  }).then(response=> response.json())
    .then(result=>{console.log(result); setData(result)});
  
},[])
    const configMenu = useRef(null);
    const items = [
        {
            label: 'Refresh',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Search',
            icon: 'pi pi-search'
        },
        {
            separator: true
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];
  console.log(data)
    const headerTemplate = (options,{firstName,lastName,profilePicture}) => {
        const className = `${options.className} justify-content-space-between`;
console.log(options,firstName,lastName,profilePicture)   
        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Avatar image={`http://${process.env.REACT_APP_SERVERURL}/uploads/${profilePicture}`} size="large" shape="circle" />
                    <span className="font-bold">{firstName} {lastName}</span>
                </div>
                <div>
                    <Menu model={items} popup ref={configMenu} id="config_menu" />
                    <button className="p-panel-header-icon p-link mr-2" onClick={(e) => configMenu?.current?.toggle(e)}>
                        <span className="pi pi-cog"></span>
                    </button>
                    {options.togglerElement}
                </div>
            </div>
        );
    };

    const footerTemplate = (options,{timestamp}) => {

const currentDate = new Date();
const retrievedDate = new Date(timestamp);
const absoluteDifference = Math.abs(retrievedDate.getTime() - currentDate.getTime());


const hours = Math.floor(absoluteDifference / (60 * 60 * 1000));
const minutes = Math.floor((absoluteDifference % (60 * 60 * 1000)) / (60 * 1000));

let updateString;

if (hours > 0) {
  updateString = `Updated ${hours} hour${hours > 1 ? 's' : ''} ago`;
} else if (minutes > 0) {
  updateString = `Updated ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
} else {
  updateString = 'Just now';
}


        const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;
console.log(timestamp)
        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Button icon="pi pi-user" rounded text></Button>
                    <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button>
                </div>
                <span className="p-text-secondary">{updateString}</span>
            </div>
        );
    };

    return (
   <div>
     {/* <div class="w-full lg:w-4 h-full text-center px-6 py-6 flex flex-column justify-content-between">
        <img
            src="/layout/images/logo-dark.svg" class="h-4rem mt-4" alt="diamond-layout" />
        <div class="flex flex-column align-items-center gap-4">
            <div class="mb-3">
                <h2>Create a new password</h2>
                <p>Lorem ipsum dolor sit amet</p>
            </div>
            <div class="flex flex-column gap-4"><span class="p-input-icon-left w-full"><i class="pi pi-lock z-2"></i>
                    <div id="password"
                        class="p-password p-component p-inputwrapper p-inputwrapper-filled p-input-icon-right w-full"
                        data-pc-name="password" data-pc-section="root">
        <div className="card flex justify-content-center">
            <FloatLabel>
                <Password inputId="password" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="password">New Password</label>
            </FloatLabel>
        </div>
                        </div>
                </span><span class="p-input-icon-left w-full"><i class="pi pi-lock z-2"></i>
                    <div id="password" class="p-password p-component p-inputwrapper p-input-icon-right w-full"
                        data-pc-name="password" data-pc-section="root">
                          <div className="card flex justify-content-center">
            <FloatLabel>
                <Password inputId="password" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="password">Rewrite new password</label>
            </FloatLabel>
        </div>
                            
                            </div>
                </span>
                <div class="flex flex-wrap gap-2 justify-content-between"><button aria-label="Cancel"
                        class="flex-auto justify-content-center p-button p-component p-button-outlined"
                        data-pc-name="button" data-pc-section="root"><span class="p-button-label p-c"
                            data-pc-section="label">Cancel</span><span role="presentation" aria-hidden="true"
                            class="p-ink" data-pc-name="ripple" data-pc-section="root"
                            style={{height: "170.172px;", width: "170.172px;"}}></span></button><button aria-label="Submit"
                        class="flex-auto justify-content-center p-button p-component" data-pc-name="button"
                        data-pc-section="root"><span class="p-button-label p-c"
                            data-pc-section="label">Submit</span><span role="presentation" aria-hidden="true"
                            class="p-ink" data-pc-name="ripple" data-pc-section="root"
                            style={{height: "172.828px;", width: "172.828px;"}} ></span></button></div>
            </div>
        </div>
        <p class="text-color-secondary font-semibold">A problem? <a
                class="text-primary hover:underline cursor-pointer font-medium">Click here</a> and let us help you.</p>
    </div> */}




      <div class="flex align-items-center justify-content-between flex-column h-screen">     
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
                <Password inputId="password" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="password">New Password</label>
            </FloatLabel>
        </div>
        </div>
            </span><span class="p-input-icon-left w-full mb-4"><i class="pi pi-lock z-2"></i>
                <div id="repeatpassword" class="p-password p-component p-inputwrapper p-input-icon-right w-full"
                    data-pc-name="password" data-pc-section="root">
                          <div className="card flex justify-content-center">
            <FloatLabel>
                <Password inputId="password" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="password">Retype Password</label>
            </FloatLabel>
        </div>
                        </div>
            </span>
            <div class="flex flex-wrap gap-2 justify-content-between"><button aria-label="Cancel"
                    class="flex-auto p-button-outlined p-button p-component" data-pc-name="button"
                    data-pc-section="root"><span class="p-button-label p-c"
                        data-pc-section="label">Cancel</span></button><button aria-label="Submit"
                    class="flex-auto p-button p-component" data-pc-name="button" data-pc-section="root"><span
                        class="p-button-label p-c" data-pc-section="label">Submit</span></button></div>
        </div>
    </div>
    </div>
    </div>
  

    )

};
export default practice;
