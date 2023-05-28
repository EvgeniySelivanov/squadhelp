import React from 'react';
import { nanoid } from 'nanoid';
import { Form, Formik } from 'formik';
import Schems from '../../../utils/validators/validationSchems';
import FormInput from '../../FormInput/FormInput';
import styles from './FormEventCounter.module.scss';



const FormEventCounter = (props) => {
  const updateTime = (k) => {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
  }
  const getMinDate=()=>{
    /** could not install date-fns dependency problems, so I did it manually*/
    const currentYear = new Date().getFullYear();
    const currentDay = updateTime(new Date().getDate());
    const currentHours = updateTime(new Date().getHours()-1);
    const currentMonth = updateTime(new Date().getMonth()+1);
    const minDate = currentYear + '-' + (currentMonth) + '-' + currentDay + 'T' + (currentHours) + ':00';
    return minDate;
  }
  

  const { restartComponent } = props;
  const initialValues = {
    createdAt: new Date(),
  };
  const onSubmit = (values, formikBag) => {

    localStorage.setItem(nanoid(), JSON.stringify(values));

    formikBag.resetForm();
    restartComponent();
  }

  const formInputClasses = {
    container: styles.inputContainer,
  }
  return (
    <>
      <div className={styles.formWrapper}>
        <h3>Create your event</h3>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={Schems.FormEventCounterSchems}>
          {(formikProps) => {
            return (
              <Form>
                <label htmlFor="eventName">Event name</label>
                <FormInput
                  classes={formInputClasses}
                  name="eventName"
                  type="text"
                  label="Event name" />
                <label htmlFor="eventTime">Event date</label>
                <FormInput
                  classes={formInputClasses}
                  name="eventTime"
                  type="datetime-local"
                  label="eventTime"
                min={getMinDate()}
                />
                <label htmlFor="eventTime">Reminder date</label>
                <FormInput
                  classes={formInputClasses}
                  name="reminderDate"
                  type="datetime-local"
                  label="Reminder date" 
                  min={getMinDate()}/>
                <input className={styles.inputContainer} type='submit' value='Create timer' />
              </Form>)
          }}
        </Formik>
      </div>
    </>
  );
}


export default FormEventCounter;
