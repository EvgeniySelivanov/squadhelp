import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'formik';
import CONSTANTS from '../../../constants';

const ImageUpload = ({ name, label, classes, data, ...rest }) => (
  <Field name={name}>
    {(formikProps) => {
      const { field } = formikProps;
      const { uploadContainer, inputContainer, imgStyle } = classes;
      const { avatar } = data;
      console.log(avatar);
      const handlerChange = e => {
        const imagePreview = window.document.getElementById('imagePreview');
        const file = e.target.files[0];
        const imageType = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|JPG|JPEG|PNG)$/)
        if (!imageType.test(file.type)) {
          console.log('only images!!!');
          e.target.value = '';
        }
        else {
          formikProps.field.onChange(file.type);
          formikProps.form.setFieldValue('file', file);
          const reader = new FileReader();
          reader.onload = () => { imagePreview.src = reader.result };
          reader.readAsDataURL(file);
                  }
      };
      return (
        <div className={uploadContainer}>
          <div className={inputContainer}>
            <span>Support only images (*.png, *.gif, *.jpeg)</span>
            <input
              type='file'
              {...field}
              id='fileInput'
              accept='.jpg, .png, .jpeg'
              onChange={handlerChange}
              {...rest}
              value={''}
            />
            <label htmlFor='fileInput'>Chose file</label>
          </div>
          <img
          src={
            avatar === 'anon.png'
              ? CONSTANTS.ANONYM_IMAGE_PATH
              : `${CONSTANTS.publicURL}${avatar}`
          }
            id='imagePreview'
            className={imgStyle}
            alt='user'
          />
        </div>
      );
    }}
  </Field>
);
const mapStateToProps = (state) => {
  const { data } = state.userStore;
  return { data };
};
export default connect(mapStateToProps)(ImageUpload);
