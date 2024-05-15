import React, { useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Card } from 'primereact/card'
import { useLoaderData } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material'


export default function BasicDemo({handleBought}) {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState('grid');

  const footer = ( food )=>{
    return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <Button label="Bought Now" icon="pi pi-sign-in" style={{ margin: '0.5em' }} onClick={()=>{
        handleBought(food)
      }}/>
    </div>
    );
  };

  useEffect( () => {
  fetch(`http://${process.env.REACT_APP_SERVERURL}/foods/availableFood`)
    .then(response => response.json())
    .then(resData => {
      const products = resData.foods.map(food => ({
        id: food.id,
        name: food.foodName,
        description: food.description,
        image: JSON.parse(food.foodImage)[0],
        price: food.price,
        inventoryStatus: food.amout>7 ? "INSTOCK":food.amount<7 && food.amount>0 ?"Few Amount":"Finished",
        available: food.amount,
        rating: food.rating
      }));
      setProducts(products);
    });
// console.log(resData)
//        const products = resData.foods.map(food => ({
//         id: food.id,
//         name: food.foodName,
//         description: food.description,
//         image: JSON.parse(food.foodImage)[0],
//         price: food.price,
//         inventoryStatus: food.amount>7 ? "INSTOCK":food.amount<7 && food.amount>0 ?"Few Amount":"Finished",
//         available: food.amount,
//         rating: food.rating
//       }));
// setProducts(products)

  }, []);

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'Few Amount':
        return 'warning';
      case 'Finished':
        return 'danger';

      default:
        return null;
    }
  };

  const listItem = (product, index) => {
    return (
      <div className="col-12" key={product.id}>
        <div
          className={classNames(
            'flex flex-column xl:flex-row xl:align-items-start p-4 gap-4',
            { 'border-top-1 surface-border': index !== 0 }
          )}
        >
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${product.image}`}
            alt={product.name}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.name}</div>
              <Rating value={product.rating} readOnly cancel={false}></Rating>
              <div className="flex align-items-center gap-3">
                {/* <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{product.category}</span>
                </span> */}
                <Tag
              value={product.inventoryStatus}
              severity={getSeverity(product)}
            ></Tag>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${product.price}</span>
              <Button
                icon="pi pi-sign-in"
                className="p-button-rounded"
                disabled={product.inventoryStatus === 'Finished'}
                onClick={()=>{
              handleBought(product)   
                }}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

const gridItem = (product) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="card flex justify-content-center">
            <Card
              title={product.name}
              subTitle={<div>
              <Rating value={product.rating} readOnly cancel={false}></Rating>
               <div style={{padding:'20px 0px 0px 0px' ,fontSize:'1.5rem' }}>
                Description
              </div>

              </div>}
              footer={()=>{
                return footer(product)
              }}
              header={    <img
      alt="Card"
      src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${product.image}`}
    />}
              className="md:w-25rem"
            >
              <p className="m-0">
                <Tag
              value={product.inventoryStatus}
              severity={getSeverity(product)}
            ></Tag>
   {` ${product.description}`}
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout, index) => {
    if (!product) {
      return;
    }

    if (layout === 'list') return listItem(product, index);
    else if (layout === 'grid') return gridItem(product);
  };

  const listTemplate = (products, layout) => {
    return (
      <div className="grid grid-nogutter">
        {products.map((product, index) => itemTemplate(product, layout, index))}
      </div>
    );
  };

  const header = () => {
    return (
      <div className="flex justify-content-end">
        <DataViewLayoutOptions
          layout={layout}
          onChange={(e) => setLayout(e.value)}
        />
      </div>
    );
  };

  return (
        <Container id="rooms" sx={{ py: { xs: 8, sm: 16 } ,paddingTop:'0px' ,marginTop:'0px' }}>
             <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          marginTop:'0px',
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography sx={{textAlign:'center',display:'block', margin:'10px'}} component="h2" variant="h4" color="text.primary">
          Our Foods
        </Typography>
        </Box>
    <div className="card">
      <DataView
        value={products}
        listTemplate={listTemplate}
        layout={layout}
        paginator
        rows={5}
        header={header()}
      />
    </div>
    </Container>
  );
}
export const loader=async()=>{
    const response= await fetch(`http://${process.env.REACT_APP_SERVERURL}/foods/availableFood`)

    const resData= await response.json();
    return resData;
}