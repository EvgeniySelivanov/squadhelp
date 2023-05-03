import React from 'react';
import classNames from 'classnames';
import { useField } from 'formik';

const ImageUpload = props => {
  const [field] = useField(props.name);
  const { uploadContainer, inputContainer, imgStyle } = props.classes;
  const onChange = e => {
    const node = window.document.getElementById('imagePreview');
    const file = e.target.files[0];
    const imageType = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|JPG|JPEG|PNG)$/)
    if (!imageType.test(file.type)) {
      console.log('only images!!!');
      e.target.value = '';
    } else {
      console.log('it work!');
      field.onChange(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          {...field}
          id='fileInput'
          type='file'
          accept='.jpg, .png, .jpeg'
          onChange={onChange}
        />
        <label htmlFor='fileInput'>Chose file</label>
      </div>
      <img
        id='imagePreview'
        className={classNames({ [imgStyle]: !!field.value })}
        alt='user'
      />
    </div>
  );
};

export default ImageUpload;
