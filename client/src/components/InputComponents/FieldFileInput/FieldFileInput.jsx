import React from 'react';
import { Field } from 'formik';

const FieldFileInput = ({ name,type ,classes, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  return (
    <Field name={name}>
      {formikProps => {
        const { field } = formikProps;
        const handlerChange=(e)=>{
          const file = e.target.files[0];
          formikProps.field.onChange(file.type);
          formikProps.form.setFieldValue('file',file); 
        }
                
        const getFileName = () => {
          if (field.value) {     
            return field.value.name;
          }
          return '';
        };

        return (
          <div className={fileUploadContainer}>
            <label htmlFor='fileInput' className={labelClass}>
              Choose file
            </label>
            <span id='fileNameContainer' className={fileNameClass}>
              {getFileName()}
            </span>
            <input
              {...field}
              className={fileInput}
              id='fileInput'
              type={type}
              onChange={handlerChange}
              value={''}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default FieldFileInput;
