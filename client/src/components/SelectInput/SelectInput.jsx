import { Field, ErrorMessage } from 'formik';
import Select from './Select';

const SelectInput = ({
  header,
  classes,
  optionsArray,
  valueArray,
  ...rest
}) => (
  <Field {...rest}>
    {fieldProps => (
      <>
        <Select
          {...fieldProps}
          header={header}
          classes={classes}
          optionsArray={optionsArray}
          valueArray={valueArray}
        />
        <ErrorMessage
          name={fieldProps.field.name}
          component='span'
          className={classes.warning}
        />
      </>
    )}
  </Field>
);

export default SelectInput ;
