
import React, { useState, useEffect, useContext, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterService } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox, TriStateCheckboxChangeEvent} from 'primereact/tristatecheckbox';
import { InputNumber } from 'primereact/inputnumber';
import {Calendar} from 'primereact/calendar'
import dayjs from 'dayjs';
import { useLoaderData } from 'react-router-dom';
import UserContext from '../context/userContext';
import { ConfirmDialog ,confirmDialog} from 'primereact/confirmdialog';
import {Toast} from 'primereact/toast'
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
// The rule argument should be a string in the format "custom_[field]".
FilterService.register('custom_activity', (value, filters) => {
    //console.log('filter is '+filters,'value is '+value)

  const [start, end] = filters ?? [null, null];
const from =dayjs(start).format('YYYY-MM-DD');
const to =dayjs(end).format('YYYY-MM-DD');
if(from=='Invalid Date'||to=='Invalid Date')

  if (from === 'Invalid Date' && to === 'Invalid Date') return true;
  if (from !== 'Invalid Date' && to === 'Invalid Date') return from <= value;
  if (from === 'Invalid Date' && to !== 'Invalid Date') return value <= to;
console.log((from+' -'+' '+to))
  return (from+' -'+' '+to)===value
  //return from <= value && value <= to;
});

export default function ReservationDetail() {


 const ctx=useContext(UserContext);

    const [customers, setCustomers] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'reservationId': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'guest.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'roomNumber': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        activity: { value: null, matchMode: FilterMatchMode.CUSTOM },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },

    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');  
    const [statuses] = useState(['QUALIFIED', 'UNQUALIFIED']);
    const toast = useRef(null);
    const getSeverity = (status) => {
        switch (status) {
            case 'QUALIFIED':
                return 'success';

            case 'UNQUALIFIED':
                return 'danger';
        }
    };

    //const resData=useLoaderData();
    // if(customers.length==0){
    // setCustomers(resData)
    // }
        const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
    const confirm = (position,messages) => {
   
        confirmDialog({
            message:  (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                    <span>{messages.error?'Error in Changing The Status':messages.message}</span>
                </div>
            ),
            header: (<div className="inline-flex align-items-center justify-content-center gap-2">
                        <IconButton color="primary">
                        <SettingsIcon />
                        </IconButton>
                        <span className="font-bold white-space-nowrap">New Message From System</span>
                    </div>),
            icon: 'pi pi-warn-circle',
            position,
            accept:()=>{
                console.log('Request Sent To Receptionist')
            },
            reject
        });
    };
    useEffect( () => {
console.log(ctx.userName)
let resData
fetch(`http://${process.env.REACT_APP_SERVERURL}/reservation/checkoutStaffTable`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({id:ctx.id})
        
}).then(res=>res.json()).then(data=>{console.log(data);resData=data }).catch(err=>console.log(err))



            setTimeout(()=>{
                const filterdData=resData.map(oneRes=>{
                    const guestName=oneRes.firstName+ " " +oneRes.lastName
                    const activity=dayjs(oneRes.checkinDate).format('YYYY-MM-DD')+' -'+' '+dayjs(oneRes.checkoutDate).format('YYYY-MM-DD')                  
                    return {guest:{
                        name:guestName,
                        image:oneRes.identificationCardPic
                    },activity,
                    roomNumber:oneRes.roomNumber,
                    reservationId:oneRes.id,
                    status:oneRes.status,

                }
                })

          setCustomers(filterdData);


            setLoading(false);
            },3000)
    }, []); 

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const cellEditor = (options) => {
        return textEditor(options);
    }
        const textEditor = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.editorCallback(e.target.value)} itemTemplate={statusItemTemplate} onKeyDown={(e) => e.stopPropagation()} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
        // <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} onKeyDown={(e) => e.stopPropagation()} />;
    };


   const onCellEditComplete = async (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        confirmDialog({
            message:  (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                    <span>Do You Want To Change The Status</span>
                </div>
            ),
            header: (<div className="inline-flex align-items-center justify-content-center gap-2">
                        <IconButton color="primary">
                        <SettingsIcon />
                        </IconButton>
                        <span className="font-bold white-space-nowrap">New Message From System</span>
                    </div>),
            icon: 'pi pi-warn-circle',
            position:"top-left",
            accept: async()=>{
                
                      rowData[field] = newValue;
            setCustomers([...customers]);
            const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/reservation/staffStatusChange`,{
                method:'PATCH',
                headers:{
                        'Content-Type':'application/json'
                             },
                body:JSON.stringify({rowData,staffId:ctx.id})
            })
            const responseData=await response.json()
            if(!responseData.error){
                toast.current.show({ severity:'success', summary: 'Success', detail: 'Status Changed Successfully', life: 3000 });
            // confirm('bottom-right',responseData)
            }


            },
            reject
        });
           
       
        }
  




    const guestBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="flag" src={`http://${process.env.REACT_APP_SERVERURL}/public/uploads/${rowData.guest.image}`} className="shadow-2 border-round" style={{ width: '24px' }} />
                <span>{rowData.guest.name}</span>
            </div>
        );
    };
    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const statusItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
        );
    };
const [date,setDate]=useState()
    const activityRowFilterTemplate = (options) => {
        const [from, to] = options.value ?? [null, null];

        return (
            <div className="flex gap-1">

                <Calendar value={from} onChange={(e) => options.filterApplyCallback([e.value, to])} className="w-full" placeholder="from"  dateFormat="yy/mm/dd" />
                <Calendar value={to} onChange={(e) => options.filterApplyCallback([from, e.value])} className="w-full" placeholder="to" dateFormat="yy/mm/dd" />
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="card">
            <ConfirmDialog
                style={{ width: '50vw' }}
                breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
            />
              <Toast ref={toast} />
            <DataTable value={customers} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                    globalFilterFields={['id', , 'roomNumber','guest.name','activity' ,'status']} header={header} emptyMessage="No Reservation found.">
                <Column field="reservationId" filterField='reservationId' header="Booking" filter filterPlaceholder="Search by Book Number" style={{ minWidth: '12rem' }} />
                <Column field="roomNumber" filterField='roomNumber' header="Room" filter filterPlaceholder="Search by Book Number" style={{ minWidth: '12rem' }} />
                <Column header="Guest" filterField="guest.name" style={{ minWidth: '12rem' }} body={guestBodyTemplate} filter filterPlaceholder="Search by Guest Name" />
                <Column header="Checkin Date" field='activity' showFilterMenu={false}   dataType="date" style={{ minWidth: '16rem' }}  filter filterElement={activityRowFilterTemplate} />    
                <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}  />
            </DataTable>
        </div>
    );
}
        


export const loader = async()=>{

const resData='0';
return resData;
}

