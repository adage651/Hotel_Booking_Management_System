
import React, { useState, useEffect , useRef} from 'react';
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
import {Toast } from 'primereact/toast'
import { Avatar } from '@mui/material';
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
    const [statuses] = useState(['Checked Out', 'Checked In', 'Confirmed', 'Due In' ]);
const toast = useRef(null);
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

        }
    };
    const showWarn = () => {
        toast.current.show({severity:'warn', summary: 'Warning', detail:"You can't Change the Checkout Status Here Procedures Must Be Respected!!!", life: 5000});
    }
    const resData=useLoaderData();
    // let preparedResData;
    // if(!resData.error){
    //     preparedResData=resData.map(data=>{
    //         return {id:data.id,firstName:data.firstName,lastName:data.lastName,identificationCardPic:data.identificationCardPic,checkinDate:data.checkinDate,checkoutDate:data.checkoutDate,roomNumber:data.roomNumber,status:data.reservationStatus,staff:{status:data.managecheckoutStatus,id:staffId,userName,profilePicture}}
    //     })
    // }
    useEffect(() => {
            setTimeout(()=>{
                const filterdData=resData.map(oneRes=>{
                    const guestName=oneRes.firstName+ " " +oneRes.lastName
                    const activity=dayjs(oneRes.checkinDate).format('YYYY-MM-DD')+' -'+' '+dayjs(oneRes.checkoutDate).format('YYYY-MM-DD')                  
                    return {
                        guest:{
                        name:guestName,
                        image:oneRes.identificationCardPic
                    },activity,
                    roomNumber:oneRes.roomNumber,
                    reservationId:oneRes.id,
                    status:oneRes.status,
                    staff:oneRes.staff
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
               
        return <Dropdown value={options.value} options={statuses} onChange={(e) => {
            if(e.target.value==='Checked Out'){showWarn()}
            e.target.value!=='Checked Out'?options.editorCallback(e.target.value):null}} itemTemplate={statusItemTemplate} onKeyDown={(e) => e.stopPropagation()} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />

    };


   const onCellEditComplete = async (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;



                if(rowData.status==='Checked Out'){
return;
                }else{
rowData[field] = newValue;
        const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/rooms/changeRoomStatus`,{
             method:'POST',
  headers:{
  'Content-Type':'application/json'
    },
   body:JSON.stringify(rowData)
        });
                }

       
        }
  




    const guestBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <Avatar alt={rowData.guest.firstName} src={`http://${process.env.REACT_APP_SERVERURL}/public/uploads/${rowData.guest.image}`} className="shadow-2 border-round" style={{ width: '24px' }} />
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

    const handleSubmition=(options)=>{
console.log('176',options)
    }
    return (
        <div className="card">
            <Toast ref={toast} />
            <DataTable value={customers} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                    globalFilterFields={['id', , 'roomNumber','guest.name','activity' ,'status']} header={header} emptyMessage="No customers found.">
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
const response=await fetch(`http://${process.env.REACT_APP_SERVERURL}/reservation/fetchall`)
const resData=await response.json();

return resData;
}

