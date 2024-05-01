
import React, { useState, useEffect, useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ProductService } from './service/ProductService';

export default function DataTableDemo() {
    const [staff, setStaff] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const op = useRef(null);
    const toast = useRef(null);
    const isMounted = useRef(false);

    const staffSelect = (e) => {
        op.current.hide();
        toast.current.show({ severity: 'info', summary: 'Staff Selected', detail:e.data.userName, life: 3000 }); 
    };

    useEffect(() => {
fetch(`http://${process.env.REACT_APP_SERVERURL}/api/v1/staff`)
    }, []);




    const imageBody = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="w-4rem shadow-1" />
    };

    return (
        <div className="card flex flex-column align-items-center gap-3">
            <OverlayPanel ref={op} showCloseIcon closeOnEscape dismissable={false}>
                    <DataTable value={staffMembers} selectionMode="single" paginator rows={5} selection={selectedStaff} onSelectionChange={(e) => setSelectedStaff(e.value)} onRowClick={staffSelect}>
                        <Column field="id" header="ID" sortable  style={{minWidth: '8rem'}} />
                        <Column field="userName" header="UserName" sortable style={{ minWidth: '12rem' }} />
                        <Column header="Image" body={imageBody} />
                    </DataTable>
            </OverlayPanel>
        </div>
    );
}
        