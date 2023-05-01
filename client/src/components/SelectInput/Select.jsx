import React, { useEffect } from 'react';

const Select = ({
  header,
  classes,
  optionsArray,
  valueArray,
  ...props
}) => {
  const {
    form: { setFieldValue },
    meta: { initialValue },
    field,
  } = props;

  const getOptionsArray = () => {
    const array = [];
    for (let i = 0; optionsArray && i < optionsArray.length; i++) {
      let option;
      if (valueArray) {
        option = (
          <option key={i} value={valueArray[i]}>
            {optionsArray[i]}
          </option>
        );
      } else {
        option = <option key={i}>{optionsArray[i]}</option>;
      }
      array.push(option);
    }
    return array;
  };

  useEffect(() => {
    if (!initialValue && optionsArray) {
      setFieldValue(field.name, valueArray ? valueArray[0] : optionsArray[0]);
    }
  }, [field.name,initialValue,valueArray,optionsArray,setFieldValue]);

  return (
    <div className={classes.inputContainer}>
      <span className={classes.inputHeader}>{header}</span>
      <select {...field} className={classes.selectInput}>
        {getOptionsArray()}
      </select>
    </div>
  );
};
export default Select;