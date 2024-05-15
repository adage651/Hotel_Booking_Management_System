import { useRef ,useState,useEffect} from 'react'; 
import { Panel } from 'primereact/panel';
import  Avatar from '@mui/material/Avatar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';


const FeedBack = () => {
  const [data,setData]=useState([])
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


    return (
      <div>
                <div>
                    <div    className="flex flex-wrap align-items-center justify-content-between gap-2">
      {data.feedback&&data.feedback.map(feedbacks=>{
        return(
                <Panel  headerTemplate={(options)=>{
                     const className = `${options.className} justify-content-space-between`;
   
        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                                      <Avatar src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${feedbacks.profilePicture}`} alt={feedbacks.firstName} size="large" shape="circle" />
                    <span className="font-bold">{feedbacks.firstName} {feedbacks.lastName}</span>
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
                  
                }} 
                    footerTemplate={(options)=>{
                        
const currentDate = new Date();
const retrievedDate = new Date(feedbacks.timestamp);
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

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Button icon="pi pi-user" rounded text></Button>
                    <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button>
                </div>
                <span className="p-text-secondary">{updateString}</span>
            </div>
        );
                        
                        
                        }} toggleable>
            <p className="m-0">
              {feedbacks.feedback}
            </p>
        </Panel>
        )
      })}
       </div>
       </div>
       </div>
    )

};
export default FeedBack;
