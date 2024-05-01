
import React, { useState, useEffect ,useRef } from 'react';
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
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog ,confirmDialog} from 'primereact/confirmdialog';
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
    const [customers, setCustomers] = useState(null);
    const toast = useRef(null);
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
    const [statusesStaff] = useState(['Qualified', 'Unqualified']);
    

    const getSeverityStaff = (status) => {
        switch (status) {
            case 'Qualified':
                return 'success';

            case 'Unqualified':
                return 'danger';
        }
    };
        const [statuses] = useState(['Checked Out', 'Checked In', 'Confirmed', 'Due In', 'renewal']);

    const getSeverity = (status) => {
        switch (status) {
            case 'Checked Out':
                return 'danger';

            case 'Checked In':
                return 'success';

            case 'Confirmed':
                return 'info';

            case 'Due In':
                return 'warning';

            case 'renewal':
                return null;
        }
    }
    const resData=useLoaderData();
        let preparedResData=[];
    if(!resData.error){
        preparedResData=resData.data.map((data,index)=>{
            return {reservationId:data.id,id:String(index),firstName:data.firstName,lastName:data.lastName,
                identificationCardPic:data.identificationCardPic,checkinDate:data.checkinDate,
                checkoutDate:data.checkoutDate,roomNumber:data.roomNumber,status:data.reservationStatus,
                staff:{id:String(index).concat('-0'),status:data.managecheckoutStatus,staffId:data.staffId,userName:data.userName,profilePicture:data.profilePicture}}
        })
    }
    useEffect(() => {
            setTimeout(()=>{
                console.log(preparedResData)    
                const filterdData=preparedResData.map(oneRes=>{
                    const guestName=oneRes.firstName+ " " +oneRes.lastName
                    const activity=dayjs(oneRes.checkinDate).format('YYYY-MM-DD')+' -'+' '+dayjs(oneRes.checkoutDate).format('YYYY-MM-DD')                  
                    return {guest:{
                        name:guestName,
                        image:oneRes.identificationCardPic
                    },activity,
                    roomNumber:oneRes.roomNumber,
                    reservationId:oneRes.reservationId,
                    id:oneRes.id,
                    status:oneRes.status,
                    staff:[oneRes.staff]

                }
                })
          setCustomers(filterdData);
            setLoading(false);
            },3000)
    }, []); 
const allowExpansion = (rowData) => {
        return rowData.staff.length > 0;
    };
        const imageBodyTemplate = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} width="64px" className="shadow-4" />;
    };
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
                     <div className="flex flex-wrap justify-content-end gap-2">
            <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
            <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
        </div>
            </div>
        );
    };
    // const handleChange=

    const cellEditor = (options) => {
        return textEditor(options);
    }
        const textEditor = (options) => {

console.log(options)
        return <Dropdown value={options.value} options={statuses} onChange={(e) => {
        if(options.rowData.staff[0].status==="UNQUALIFIED"){
            options.editorCallback(options.value)
        }
        else{
            options.editorCallback(e.target.value)
        }
    } } itemTemplate={statusItemTemplate} onKeyDown={(e) => e.stopPropagation()} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
       
    };
        //                 confirmDialog({
        //     message:  (
        //         <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
        //             <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
        //             <span>you cant </span>
        //         </div>
        //     ),
        //     header: (<div className="inline-flex align-items-center justify-content-center gap-2">
        //                 <IconButton color="primary">
        //                 <SettingsIcon />
        //                 </IconButton>
        //                 <span className="font-bold white-space-nowrap">New Message From System</span>
        //             </div>),
        //     icon: 'pi pi-warn-circle',
        //     position,
        //     accept:()=>{
        //         console.log('Request Sent To Receptionist')
        //     },
        //     reject:()=>{
        //         console.log('Request Rejected')
        //     }
        // });

   const onCellEditComplete = async(e) => {
 
     let { rowData, newValue, field, originalEvent: event } = e;
            if(rowData.staff[0].status!=="UNQUALIFIED"){
  
                  
                    const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/reservation/changeStatus`,{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id:rowData.reservationId,
                            status:newValue
                        })
                    })
                    const res = await response.json();
                    if(!res.error){
            rowData[field] = newValue;
            toast.current.show({ severity:'success', summary: 'Operation Successful', detail: "Status Changed Successfully", life: 3000 });
                    }
                return;
            }else {
            
                   toast.current.show({ severity:'error', summary: 'Operation Rejected', detail: "You Can't Change The Status !!!  Must Qualified By Staff Firstq", life: 3000 });
                    return;
                }
       
        }
  

    const [expandedRows, setExpandedRows] = useState(null);


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
        const statusBodyTemplateStaff = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverityStaff(rowData.status)} />;
    };

    const statusItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };
        const statusItemTemplateStaff = (option) => {
        return <Tag value={option} severity={getSeverityStaff(option)} />;
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
    const searchBodyTemplate = () => {
        return <Button icon="pi pi-search" />;
    };
    const rowExpansionTemplate = (data) => {
        console.log(data)
        return (
            <div className="p-3">
                <h5>Staff Qualify {data.staff.staffName}</h5>
                <DataTable value={data.staff}>
                    <Column field="id" header="Id" sortable></Column>
                    <Column field="staffId" header="Staff Id" sortable></Column>                   
                    <Column field="userName" header="Staff Name" sortable></Column>
                    <Column header="profilePicture" body={imageBodyTemplate} />
                    <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplateStaff} />
                
                </DataTable>
            </div>
        );
    };
    const onRowExpand = (event) => {
        // toast.current.show({ severity: 'info', summary: 'Product Expanded', detail: 'event.data.name', life: 3000 });
    };

    const onRowCollapse = (event) => {
        // toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: 'event.data.name', life: 3000 });
    };

    const expandAll = () => {
        let _expandedRows = {};

        customers.forEach((p) => (_expandedRows[`${p.id}`] = true));

        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const header = renderHeader();

    return (
        <div className="card">
                    <ConfirmDialog
                style={{ width: '50vw' }}
                breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
            />
              <Toast ref={toast} />
            <DataTable value={customers} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate}
                     paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                    globalFilterFields={['id', 'roomNumber','guest.name','activity' ,'status']} 
                   header={header} emptyMessage="No Reservation found."
                    >
                 <Column expander={allowExpansion} style={{ width: '5rem' }} />
                {/* <Column field="id" filterField='id' header="ID" filter filterPlaceholder="Search by Book Number" style={{ minWidth: '12rem' }} /> */}
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
const response=await fetch(`http://${process.env.REACT_APP_SERVERURL}/reservation/fetchAllForCheckout`)
const resData=await response.json();

return resData;
}

