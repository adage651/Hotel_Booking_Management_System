import './PicturedItemSelectBox.css';
import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';
import {Avatar } from '@mui/material'
interface PictureItemSelectBoxProps {
  value: string;
  label?: string;
  items?: Record<string, string>[];
  onValueChange?: (value) => void;
}

const fieldRender = (data) => {
  return <div
    className='pictured-item-select-field'>
    <Avatar alt={data.name}
      className='pictured-item-image'
src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${data.image}`}
    />
    <TextBox
      hoverStateEnabled={false}
      inputAttr={{ picturedItemEditorInput: '' }}
      readOnly
      value={data.name}
    />
  </div>;
};

const ItemRender = (data) => {
  return <>
    <Avatar alt={data.name}
      className='pictured-item-image'
      height='20px'
      src={`http://${process.env.REACT_APP_SERVERURL}/uploads/${data.image}`}
    />
    {data.name}
  </>;
};

export const PicturedItemSelectBox = ({ value, label = '', items = [], onValueChange }: PictureItemSelectBoxProps) => {
console.log('PicturedItemSelectBox', value);
  return <SelectBox
    className='pictured-item-select-box'
    value={value}
    onValueChange={onValueChange}
    label={label}
    items={items}
    itemRender={ItemRender}
    valueExpr='name'
    stylingMode='filled'
    labelMode='hidden'
    width='100%'
    fieldRender={fieldRender}
    dropDownOptions={{ wrapperAttr: { class: 'pictured-item-select-box-dropdown' } }}
  />;
};