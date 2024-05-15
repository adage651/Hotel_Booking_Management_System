import React,{useState} from 'react';

import './FormPhoto.css';
import FileUploader from 'devextreme-react/file-uploader';


export const FormPhoto = ({ link, size, editable = false }: { link: string, size: number, editable?: boolean }) => {
  const [value, setValue] = useState([]);
    const changeValue = (e) => {
        setValue(e.value);
        link=e.value[0].name;
    }
    const getSelectedFiles = () => {
        return value;
    }
    console.log(value);
  return (
    <div className='form-photo-view'>
      <div
        className={`form-photo ${editable ? 'editable' : ''}`}
        style={{
          width: size,
          height: size,
          maxHeight: size,
          backgroundImage: `url('&quot;http://${process.env.REACT_APP_SERVERURL}/uploads/${link}&quot;)`
        }}
      >
        { <i className='edit-icon dx-icon-photooutline' /> }
      </div>
      { editable &&
        <FileUploader
        
          dialogTrigger='.edit-icon'
          accept='image/*'
          visible={false}
          value={value}
            onValueChanged={changeValue}
        />
      }
    </div>
  );
};