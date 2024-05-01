import { useState } from 'react';
import { Button } from 'primereact/button'
import { TabMenu } from 'primereact/tabmenu';
import './Profile.css'
import {Card} from 'primereact/card'
import {Avatar} from 'primereact/avatar'

import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import {UserProfile} from './userProfile/userProfile.tsx'

const Profile=()=>{
    const [value,setValue]=useState('')
    const items=[
 {label:'Profile',icon:'pi pi-fw pi-user'
    },
    {label:'Edit Profile', icon:'pi pi-user-edit' },

{
    label:'Gallary',
    icon:'pi pi-fw pi-image'
},

// {
//     label:'RequestCheckIn',
//     icon:'pi pi-fw pi-check'
// },
,{
    label:'RequestCheckOut',
    icon:'pi pi-fw pi-check'
},

{label:'View Booking' ,icon:<i className="pi pi-check"></i>},
{
        label: 'Back to Home',
        icon: 'pi pi-fw pi-home'
    } ,
]
const headerElement = (
        <div style={{  paddingLeft: "25px;", paddingTop: "10px;"}} className="inline-flex align-items-center justify-content-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
            <span className="font-bold white-space-nowrap">Amy Elsner</span>
        </div>
    );

    const footerContent = (
        <div style={{display: 'flex',flexDirection:'row-reverse'}}>

<Button label="Post" severity="secondary" icon='pi pi-send'/>
        </div>
    );
    const [activeIndex, setActiveIndex] = useState(1);
return (       <>



                <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root css-1qjv8e6">
                <div class="MuiBox-root css-1xqfr0f">
                    <div class="MuiStack-root css-db2kgc">
                        <div class="MuiAvatar-root MuiAvatar-circular css-btmpc1"><img alt="Jaydon Frankie"
                                src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg"
                                class="MuiAvatar-img css-1hy9t21" /></div>
                        <div class="MuiListItemText-root MuiListItemText-multiline css-mjofsa"><span
                                class="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-o8vyvo">Jaydon
                                Frankie</span><span
                                class="MuiTypography-root MuiTypography-body2 MuiListItemText-secondary css-ad49p8">Guest Member</span></div>
                    </div>
                </div>
                <div class="MuiTabs-root css-193cqlv">
                    <div class="MuiTabs-scrollableX MuiTabs-hideScrollbar css-oqr85h"
                        style={{width: "99px;", height: "99px;", position: "absolute;" ,top: "-9999px;",
                         overflow: "scroll;"}}></div>
                    <div class="MuiTabs-scroller MuiTabs-hideScrollbar MuiTabs-scrollableX css-1t0s2fz"
                        style={{marginBottom: "0px;"}}>
                        <div class="MuiTabs-flexContainer css-7sga7m" role="tablist">
                    <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                                </div><span class="MuiTabs-indicator css-4ue53l"
                            style={{left: "179.328px;", width: "75.625px;"}}></span>
                    </div>
                </div>
            </div>
            {activeIndex===0&&(
    <div class="layout-content">
        <div class="flex flex-column md:flex-row gap-5">
            <div class="md:w-25rem card p-0">
                <Card title="About" subTitle="Personal Details">

                 <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root css-mq4bdj">
                        <div class="MuiStack-root css-u3gl1n">
                            <div class="MuiBox-root css-zelatz">Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..
                                </div>
                            <div class="MuiStack-root css-lgk7oi">
                                <svg  class="component-iconify MuiBox-root css-9uy14h iconify iconify--mingcute" width="1em" height="1em"
                                    viewBox="0 0 24 24">
                                    <g fill="none">
                                        <path
                                            d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z">
                                        </path>
                                        <path fill="currentColor"
                                            d="M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.441 20.441 0 0 1-2.876 2.416l-.426.29l-.2.133l-.377.24l-.336.205l-.416.242a1.874 1.874 0 0 1-1.854 0l-.416-.242l-.52-.32l-.192-.125l-.41-.273a20.638 20.638 0 0 1-3.093-2.566C4.676 16.589 3 14.074 3 11a9 9 0 0 1 9-9m0 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6">
                                        </path>
                                    </g>
                                </svg>
                                 Live at <a class="MuiTypography-root MuiTypography-subtitle2 MuiLink-root MuiLink-underlineHover css-1utdui4">Andorra</a>
                                
                            </div>
                            <div class="MuiStack-root css-1o30227"><svg xmlns="http://www.w3.org/2000/svg"
                            
                                    class="component-iconify MuiBox-root css-1anrb5w iconify iconify--fluent" width="1em" height="1em"
                                    viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M22 8.608v8.142a3.25 3.25 0 0 1-3.066 3.245L18.75 20H5.25a3.25 3.25 0 0 1-3.245-3.066L2 16.75V8.608l9.652 5.056a.75.75 0 0 0 .696 0zM5.25 4h13.5a3.25 3.25 0 0 1 3.234 2.924L12 12.154l-9.984-5.23a3.25 3.25 0 0 1 3.048-2.919zh13.5z">
                                    </path>
                                    </svg>
                                    ashlynn_ohara62@gmail.com
                                    </div>
                            <div class="MuiStack-root css-lgk7oi"><svg xmlns="http://www.w3.org/2000/svg"
                            
                                    class="component-iconify MuiBox-root css-9uy14h iconify iconify--ic" width="1em" height="1em"
                                    viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M13 16h-2c-.55 0-1-.45-1-1H3.01v4c0 1.1.9 2 2 2H19c1.1 0 2-.9 2-2v-4h-7c0 .55-.45 1-1 1m7-9h-4c0-2.21-1.79-4-4-4S8 4.79 8 7H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-1c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2M10 7c0-1.1.9-2 2-2s2 .9 2 2H9.99z">
                                    </path>
                                </svg>
                                Guest
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <div class="flex-1 card p-0">
        <Card  header={headerElement} footer={footerContent}  >
           <div className="card flex justify-content-center">
                <FloatLabel>
                    <InputTextarea id="description" value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={83} />
                    <label htmlFor="description">Write Your FeedBack Here</label>
                </FloatLabel>
          </div>
            </Card>

            </div>
        </div>
    </div>

            )}
            

            {activeIndex===1&&(
           <div>
            <UserProfile />
           </div>
            )}
            
            </>
)
}
export default Profile