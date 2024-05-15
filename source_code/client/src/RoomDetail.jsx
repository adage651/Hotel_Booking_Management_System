//https://www.youtube.com/watch?v=xTwUQJZEWQ8
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import { ProductService } from './service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Form, useLoaderData } from 'react-router-dom';
import { useSubmit } from 'react-router-dom';
import { Grid, Tooltip } from '@mui/material';
import PictureUpload from './PictureUpload';
import MultiChoose from './MultiChoose';
import { MultiSelect } from 'primereact/multiselect';
import { ProgressBar } from 'primereact/progressbar';
import TemplateDemo from './pages/TemplateDemo';
import { ConsoleSqlOutlined } from '@ant-design/icons';

export default function RoomDatail() {
    let emptyRoom = {
                    id: '',
                    roomNumber: '',
                    roomName: '',
                    roomType: [],
                    description: '',
                    roomImage: [],
                    price: 0,
                    features: 0,
                    floor: 0,
                    rating:0,
                    adult:0,
                    children:0,
                    area:0
                };

                const resData=useLoaderData()
                
               const data= resData.map((room)=>{
               const imageslice=JSON.parse(room.roomImage)
              // const roomImages=imageslice.split(',')
            //    console.log(imageslice)
                  return  {...room ,roomImage:imageslice[0]}
                })
        
    const [rooms, setRooms] = useState(data);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [room, setRoom] = useState(emptyRoom);

    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedValue,setSelectedValue]=useState();
    const [floor,setFloor]=useState();
   const [value3, setValue3] = useState(25);
    const toast = useRef(null);
    const dt = useRef(null);
    const submit =useSubmit();
    const [adult,setAdult]=useState(0);
    const [children, setChildren]=useState(0)
    const [area,setArea]=useState(0)

    useEffect(() => {
    //    ProductService.getProducts().then((data) => setRooms(data)); 
    setRooms(data)
    
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    
    const openNew = () => {
         setRoom(emptyRoom);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {

        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const editProduct = (room) => {
        setRoom({ ...room });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (room) => {
        setRoom(room);
        setDeleteProductDialog(true);
    };

    const deleteProduct = async() => {
        let _rooms = rooms.filter((val) => val.id !== room.id);
        console.log(room.id)
        const response=await fetch(`http://${process.env.REACT_APP_SERVERURL}/rooms/deleteroom:${[room.id]}`,{
            method:'DELETE'
        })
        const resValue=await response.json();

        setRooms(_rooms);
        setDeleteProductDialog(false);
        setRoom(emptyRoom);
     //   fetch
        toast.current.show({ severity: 'success', summary: 'Successful', detail: resValue.message, life: 3000 });
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = async() => {
        let _rooms = rooms.filter((val) => !selectedProducts.includes(val));

        const id=selectedProducts.map(room=>{
            return room.id
        })
        
        const response=await fetch(`http://${process.env.REACT_APP_SERVERURL}/rooms/deleteroom:${[id]}`,{
            method:'DELETE'
        })
        const resValue=await response.json();

        setRooms(_rooms);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: resValue.message, life: 3000 });
    };


  const onInputChange = (event, fieldName) => {
    const { value } = event.target;
    setRoom((prevRoom) => ({ ...prevRoom, [fieldName]: value }));
  };

  const onInputNumberChange = (event, fieldName) => {
    const { value } = event;
    setRoom((prevRoom) => ({ ...prevRoom, [fieldName]: value }));
  };

//   const onTemplateUpload = (event) => {
//             let _totalSize = 0;

//         event.files.forEach((file) => {
//             _totalSize += file.size || 0;
//         });
//         setTotalSize(_totalSize);
        
//           setRoom((prevRoom) => ({ ...prevRoom, roomImage: event.files }));
 
//           toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
//   };


    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={deleteSelectedProducts} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`http://${process.env.REACT_APP_SERVERURL}/public/uploads/${rowData.roomImage}`} alt='first roomimage' className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const getSeverity = (room) => {
        switch (room.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Rooms</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    // const productDialogFooter = (
    //     <React.Fragment>
    //         <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
    //         <Button label="Save" icon="pi pi-check" type='submit' />
    //     </React.Fragment>
    // );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );


const formSubmitHandler= (e)=>{
e.preventDefault();
   console.log('resData')


 const formData = new FormData();
    formData.append('roomNumber',room.roomNumber)
    formData.append('roomName', room.roomName);
    formData.append('roomType', JSON.stringify(room.roomType));
    formData.append('floor', room.floor);
    formData.append('occupacy', room.occupacy);
    formData.append('description', room.description);
    formData.append('price', room.price);
    formData.append('features',JSON.stringify(selectedFeatures));
    formData.append('adult', room.adult);
    formData.append('children', room.children);
    formData.append('area', room.area);
room.roomImage.forEach((roomimg,index)=>{
formData.append(`image${index}`, roomimg);
})

fetch(`http://${process.env.REACT_APP_SERVERURL}/rooms/save`,{
  method:'post',
body:formData
}).then(res=>res.json).then(resData=>{
    
if(resData.error){
toast.current.show({ severity: 'error', summary: 'Unsaved', detail: `${resData.error}`, life: 5000 });
}else{
toast.current.show({ severity: 'info', summary: 'Saved', detail: `${resData.message}`, life: 5000 });  
         setRoom(emptyRoom);
        setSubmitted(true);
        setProductDialog(false);
     
}

}
)
  
//    hideDialog()
  

// setProductDialog(false);
}



const typeOpetion=[
        {name:'Single Room',code:'SR'},
        {name:'Double Room',code:'DR'},
        {name:'Suite',code:'SU'},
        {name:'Family Room',code:'FR'},
        {name:'Group Room',code:'GR'},
        {name:'Accessible Room',code:'AR'},

    ]

    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);
    
    // const onTemplateSelect = (e) => {
    //     let _totalSize = totalSize;
    //     let files = e.files;

    //     Object.keys(files).forEach((key) => {
    //         _totalSize += files[key].size || 0;
    //     });

    //     setTotalSize(_totalSize);
    // };



    // const onTemplateRemove = (file, callback) => {
    //     setTotalSize(totalSize - file.size);
    //     callback();
    // };

    // const onTemplateClear = () => {
    //     setTotalSize(0);
    // };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };
    

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
const uploads=(imageFile)=>{
   setRoom((prevRoom) => ({ ...prevRoom, roomImage: imageFile })); 
   toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
}

       const [selectedFeatures, setSelectedFeatures] = useState(null);
    const features = [
        { name: 'Wi fi'},
        { name: 'Swim Pool'},
        { name: 'Spa'},
        { name: 'Shower'},
        { name: 'Berenda view'},
        { name: 'Television' },
        { name: 'No smoking' },
        { name: 'Child bed' },
        { name: 'Gym' },
        { name: 'etc' }
    ];

    const featureTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        const length = selectedFeatures ? selectedFeatures.length : 0;

        return (
            <div className="py-2 px-3">
                <b>{length}</b> item{length > 1 ? 's' : ''} selected.
            </div>
        );
    };




    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={rooms} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} rooms" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="roomNumber" header="Room Number" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="roomName" header="Room Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="floor" header="Floor"  sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="roomType" header="Room Type" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="description" header="description" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="features" header="features" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="roomImage" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Room Details" modal className="p-fluid" onHide={hideDialog}>
           <form onSubmit={formSubmitHandler} method='post' enctype='multipart/form-data'>
                
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                       Room Name
                    </label>
                    <InputText name='roomName' id="name" value={room.roomName} onChange={(e) => onInputChange(e, 'roomName')} required autoFocus className={classNames({ 'p-invalid': submitted && !room.roomName })} />
                    {submitted && !room.roomName && <small className="p-error">Name is required.</small>}
                </div>

            <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Room Type
                        </label>
                        
                <MultiSelect value={selectedValue} name='roomType' onChange={(e) => {room.roomType=e.value;  setSelectedValue(e.value);onInputChange(e, 'roomType')}} options={typeOpetion} optionLabel="name" 
                filter placeholder="Select Type" maxSelectedLabels={3} className="w-full md:w-20rem" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                        Floor
                        </label>
                <div className="flex-auto">
                    <InputNumber name='floor' inputId="minmax-buttons" value={floor} onValueChange={(e) => {onInputNumberChange(e,'floor');  setFloor(e.value)}} mode="decimal" showButtons min={0} max={6} />
                </div>                   
                 </div>
            </div>  

                <div className="formgrid grid">
                                        <div className="field col">
                        <label htmlFor="occupacy" className="font-bold">
                        Max occupacy
                        </label>
            <div className="flex-auto">
                <InputNumber name='occupacy' inputId="minmax-buttons" value={value3} onValueChange={(e) => {onInputNumberChange(e,'occupacy');setValue3(e.value)}} mode="decimal" showButtons min={0} max={6} />
            </div>
            
                    </div>
                    <div className="field col">
                        <label htmlFor="roomNumber" className="font-bold">
                            Room No
                        </label>
                        <InputNumber name='roomNumber' id="roomNumber" value={room.roomNumber} onValueChange={(e) => onInputNumberChange(e, 'roomNumber')}  />
                    </div>

                </div>  
                  <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="Adult" className="font-bold">
                        Adult
                        </label>
            <div className="flex-auto">
                <InputNumber name='Adult' inputId="minmax-buttons" value={room.adult} onValueChange={(e) => {onInputNumberChange(e,'adult');setAdult(e.value)}} mode="decimal" showButtons min={0} max={6} />
            </div>
            
                    </div>
                    <div className="field col">
                        <label htmlFor="children" className="font-bold">
                            Children
                        </label>
                        <InputNumber name='children' id="children" value={room.children} onValueChange={(e) => onInputNumberChange(e, 'children')}  />
                    </div>

                </div>  
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea name='description' id="description" value={room.description} onChange={(e) => {onInputChange(e, 'description')}} required rows={3} cols={20} />
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                                    <MultiSelect value={selectedFeatures} options={features} onChange={(e) => setSelectedFeatures(e.value)} optionLabel="name" 
                placeholder="Select Features" itemTemplate={featureTemplate} panelFooterTemplate={panelFooterTemplate} className="w-full md:w-50rem" display="chip" />
                </div>
                </div>
   <div className="formgrid grid">
                <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber name='price' id="price" value={room.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                     <div className="field col">
                        <label htmlFor="roomNum" className="font-bold">
                            area
                        </label>
                        <InputNumber name='roomNumber' id="roomNumber" value={room.area} onValueChange={(e) => onInputNumberChange(e, 'area')}  />
                    </div>
                </div>  
                 <label htmlFor="photo" className="font-bold">
                            Room photo
                        </label>

<TemplateDemo uploads={uploads} message='Drag and Drop Room Picture here!!!' multiple="image/*"/>
         {/* <div>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload ref={fileUploadRef} customUpload uploadHandler={onTemplateUpload}
                        name="roomImage"  multiple accept="image/*" maxFileSize={1000000}
                onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
               
        </div> */}


                <Grid container  rowSpacing={2} marginTop={'1rem'}> 
                   <Grid xs={6}>  
                        <Button style={{marginLeft:'-0.75rem'}} type='reset' label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
                   </Grid> 
                    <Grid xs={6}>
                        <Button label="Save" icon="pi pi-check" type='submit'  />
                    </Grid>
            
              </Grid>      
                           
             </form>  
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {room && (
                        <span>
                            Are you sure you want to delete <b>{room.roomName}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {room && <span>Are you sure you want to delete the selected rooms?</span>}
                </div>
            </Dialog>
        </div>
    );
}
 
 export const action=async({request,params})=>{
const data= await request.formData()

return data;
}
export const loader =async ()=>{
    const response = await fetch(`http://${process.env.REACT_APP_SERVERURL}/rooms/fetchall`)
    const resData=await response.json()
    return resData
}