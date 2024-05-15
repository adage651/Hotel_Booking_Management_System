
import React, { useState, useEffect } from 'react';
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

// The rule argument should be a string in the format "custom_[field]".
FilterService.register('custom_date', (value, filters) => {
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
        'orderId': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'food.foodName': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'foodId': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
       'guestName': { value: null, matchMode: FilterMatchMode.CONTAINS },
        date: { value: null, matchMode: FilterMatchMode.EQUALS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },

    });
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');  
    const [statuses] = useState(['NotDeliverd', 'Delivered', 'Processing', 'Confirmed']);

    const getSeverity = (status) => {
        switch (status) {
            case 'NotDeliverd':
                return 'danger';

            case 'Delivered':
                return 'success';

            case 'Processing':
                return 'info';

            case 'Confirmed':
                return 'warning';
        }
    };



    
    const showWarn = () => {
        toast.current.show({severity:'warn', summary: 'Warning', detail:"You can't Change the Checkout Status Here Procedures Must Be Respected!!!", life: 5000});
    }
    const resData=useLoaderData();
    useEffect(() => {
            setTimeout(()=>{
                console.log(resData)
                const filterdData=resData.food.map(oneRes=>{
                    const guestName=oneRes.firstName+ " " +oneRes.lastName
                    const date=dayjs(oneRes.date).format('YYYY-MM-DD')
                    return {
                   food:{
                        foodName:oneRes.foodName,
                        image:oneRes.identificationCardPic
                    },
                    date,
                    orderId:oneRes.orderId,
                    guestName,
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
        const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/foods/changeFoodStatus`,{
             method:'POST',
  headers:{
  'Content-Type':'application/json'
    },
   body:JSON.stringify(rowData)
        });
                }

       
        }



    const guestBodyTemplate = (rowData) => {
        console.log(rowData.food)
        return (
            <div className="flex align-items-center gap-2">
                <img alt="flag" src={`http://${process.env.REACT_APP_SERVERURL}/public/uploads/${rowData.food.image}`} className="shadow-2 border-round" style={{ width: '24px' }} />
                <span>{rowData.food.foodName}</span>
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
    const dateRowFilterTemplate = (options) => {
        const [from] = options.value ?? [null];

        return (
            <div className="flex gap-1">

                <Calendar value={from} onChange={(e) => options.filterApplyCallback([e.value])} className="w-full" placeholder="from"  dateFormat="yy/mm/dd" />
            </div>
        );
    };

    const header = renderHeader();
//editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}
    return (
        <div className="card">
            <DataTable value={customers} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                    globalFilterFields={['orderId', 'roomNumber','food.foodName','date' ,'status']} header={header} emptyMessage="No customers found.">
                <Column field="orderId" filterField='orderId' header="Order Id" filter filterPlaceholder="Search by Order Number" style={{ minWidth: '12rem' }} />
                <Column field="guestName" filterField='guestName' header="Guest Name" filter filterPlaceholder="Search by Guest Name" style={{ minWidth: '12rem' }} />
                <Column header="Food" filterField="food.foodName" style={{ minWidth: '12rem' }} body={guestBodyTemplate} filter filterPlaceholder="Search by Food Name" />
                <Column header="Date" field='date' showFilterMenu={false}   dataType="date" style={{ minWidth: '16rem' }}  filter filterElement={dateRowFilterTemplate} />    
                <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}  />
            </DataTable>

        </div>
    );
}
        


export const loader = async()=>{
const response=await fetch(`http://${process.env.REACT_APP_SERVERURL}/foods/fetchOrders`)
const resData=await response.json();

return resData;
}

