import React, { useState, useEffect, useRef } from 'react';

import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
// import { Button } from 'primereact/button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
// import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';
import { useLoaderData} from 'react-router-dom'
import { useSubmit } from 'react-router-dom';
import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';


import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
//import DropDownCountry from '../../../components/DropDownCountry';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
// ----------------------------------------------------------------------
import AnimateButton from '../../../components/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../utils/password-strength';
import {Form, Formik, Field, ErrorMessage, useFormik } from 'formik';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
//import {Form} from 'react-router-dom'
//import { users } from '../../../_mock/user';
export default function UserPage() {
   const userData=useLoaderData(loader);
  //  let users;

//  const [users,setUsers] =useState(userData)
const [users,setUsers]=useState(userData)


  console.log(users)
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

   const [submitted, setSubmitted] = useState(false);

   const [userDialog, setUserDialog] = useState(false);

   const submit = useSubmit();


  const toast = useRef(null);  

   let emptyUser = {
        firstName: '',
        lastName:'',
        emailAddress: null,
        profilePicture: '',
        nationionality: null,
        navConfig: [],
        status: 'INSTOCK',
        userType:''
    };

  const [user, setUser] = useState(users);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  })




   const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    };
 const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
        
          values.firstName= ''
          values.lastName= ''
          values.emailAddress= ''
          values.userName=''
          values.userType=''
          values.nationality=''
          values.password= ''
          values.status=status

          values.submit= null
        

    };

 const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < user.length; i++) {
            if (user[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };
  const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };




const notFound = !dataFiltered.length && !!filterName;
const [status,setStatus]=useState('')




const statusChoose = [
        { name: 'Active', code: 'AC' },
        { name: 'Banned', code: 'BD' },
        { name: 'Disable', code: 'LDN' },
        { name: 'Sabbatical', code: 'SB' },
        { name: 'Maternity Leave', code: 'MTL' }
    ];

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };




 const [selectedCountry, setSelectedCountry] = useState(null);
    const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                    <div>{option.name}</div>
                </div>
            );
        }
               return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };



 const {values,handleChange,handleBlur,handleSubmit,touched,errors } =useFormik({
        initialValues:{
          firstName: '',
          lastName: '',
          emailAddress: '',
          userName:'',
          userType:'',
          nationality:selectedCountry,
          password: '',
          status:status,

          submit: null
        },
      validationSchema: Yup.object().shape({
    firstName: Yup.string().max(255).required('First Name is required'),
    lastName: Yup.string().max(255).required('Last Name is required'),
    emailAddress: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    password: Yup.string().max(255).required('Password is required'),
  }),
        onSubmit:async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log('its submitted')
        },
        
      
});
//  console.log(values)

const formSubmitHandler=async (e)=>{
e.preventDefault()
const formData={
  ...values,
  nationality:values.nationality.name,
  status:values.status.name
}
const response=await fetch('http://localhost:8000/users/save',{
  method:'post',
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(formData)
})


const resData=await response.json()
if(resData.error){
toast.current.show({ severity: 'error', summary: 'Unsaved', detail: `${resData.error}`, life: 5000 });
}else{
toast.current.show({ severity: 'info', summary: 'Saved', detail: `${resData.message}`, life: 5000 });
setUsers((prevState)=>{
return [...prevState,formData]
})
}
setSubmitted(true);
hideDialog();
console.log(resData)
}




    const accept = async(message) => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have deleted the user sucessfully', life: 3000 });
        // const response=await fetch(`http://localhost:8000/users/deleteuser/${}`);
      }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    

const deleteConfirm=(id)=>{
  confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept:async()=>{
              
            const response=await fetch(`http://localhost:8000/users/deleteuser${id}`,{
               method: 'DELETE',
                headers: {
                 'Content-Type': 'application/json',
                      },
            });
      const resData=await response.json();
      console.log(resData)
      if(resData.error){
        toast.current.show({ severity: 'error', summary: 'Failure', detail: `${resData.error}}`, life: 3000 });
        setSubmitted(true);
      }else{
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: `You have deleted the user sucessfully`, life: 3000 });
        setUsers((prevState)=>{
  const  newUser=prevState.filter((user)=>{
return user.account_id!==id;
    })
  return newUser      
  
  });
      }
            },
            reject
        });

}


  return (
    
       
    <Container>
      
       <Toast ref={toast} />
       <ConfirmDialog />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
  <Button label="New" icon="pi pi-plus"  raised size='normal' severity="success" onClick={openNew} />
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'firstName', label: 'Name' },
                  { id: 'emailAddress', label: 'Email Address' },
                  { id: 'usertype', label: 'Role' },
                  { id: 'nationality', label: 'Nationality' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.account_id}
                      avatarUrl={row.profilePicture}
                      name={row.firstName+' '+row.lastName}
                      emailAddress={row.emailAddress}
                      role={row.user_type}
                      id={row.account_id}
                      nationality={row.nationality}
                      status={row.status}
                      deleteConfirm={deleteConfirm}
                      selected={selected.indexOf(row.firstName) !== -1}
                      handleClick={(event) => handleClick(event, row.firstName)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

         <Dialog visible={userDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Users Details" modal className="p-fluid"  onHide={hideDialog}>
                {user.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${user.image}`} alt={user.image} className="product-image block m-auto pb-3" />}

          <form onSubmit={formSubmitHandler} method='post'>
                <div className="field">
                    <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                 <label htmlFor="name" className="font-bold">
                       First Name*
                    </label>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                     value={values.firstName}
                    name="firstName"
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth

                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <label htmlFor="name" className="font-bold">
                     Last Name*
                    </label>
                  <OutlinedInput
                    fullWidth
                    id="lastname-signup"
                    type="lastname"
                      value={values.lastName}
                    name="lastName"
                    placeholder="Doe"
                    inputProps={{}}
                    onChange={handleChange}
                  />

                </Stack>
              </Grid>

                            <Grid item xs={12}>
                <Stack spacing={1}>
                  <label htmlFor="name" className="font-bold">
                       User Name
                    </label>
                  <OutlinedInput
                    fullWidth
                    id="userName"
                      value={values.userName}
                      onChange={handleChange}
                    name="userName"
                    placeholder="Adage651."
                    inputProps={{}}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <label htmlFor="name" className="font-bold">
                       User Type*
                    </label>
                  <OutlinedInput
                    fullWidth
                    id="userType"
                     value={values.userType}
                     onChange={handleChange}
                    name="userType"
                    placeholder="Adage651."
                    inputProps={{}}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <label htmlFor="name" className="font-bold">
                        Email Address*
                    </label>
                  <OutlinedInput
                    fullWidth
                    id="emailAddress"
                    type="email"
                    onChange={handleChange}
                      value={values.emailAddress}
                    name="emailAddress"
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <label htmlFor="name" className="font-bold">
                        Nationality
                    </label>
                    <Grid item xs={12} md={6}>
                  <div className="card " style={{width:'100%'}}>
                      <Dropdown name='nationality'  value={values.nationality} onChange={handleChange} options={countries} optionLabel="name" placeholder="Select a Country" 
                       filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
                 
                 </div>  
                  </Grid>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <label htmlFor="name" className="font-bold">
                        Status
                    </label>
                    <Grid item xs={12} md={6}>
                  <div className="card">
                    <input type="text" id='status' name="status" value={status} hidden/>
                      <Dropdown name='status' value={values.status} onChange={handleChange} options={statusChoose} optionLabel="name" 
                       placeholder="Select a status" className="w-full md:w-14rem" />
                          
                  </div>
                  </Grid>
                </Stack>
              </Grid>

            </Grid>
             <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                   error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                     value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid container  rowSpacing={2} >
                    
                <Grid xs={6}>  
            <Button style={{marginLeft:'-0.75rem'}} type='reset' label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
         </Grid> 
         <Grid xs={6}>
            <Button label="Save" icon="pi pi-check" type='submit'  />
            </Grid>
            
              </Grid>
                </div>
                </form>                
    
            </Dialog>
    </Container>
  
  
  );
}



export const  loader = async() =>{
const response =await fetch('http://localhost:8000/users/fetchall')
const resData=await response.json()
console.log(resData);
return resData;
}