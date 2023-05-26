import React from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { changeEventsDate } from '../../../store/slices/eventsSlice';
import { Form, Formik } from 'formik';
import Schems from '../../../utils/validators/validationSchems';

import FormInput from '../../FormInput/FormInput';
import styles from './FormEventCounter.module.scss';

const FormEventCounter = (props) => {

const{addTimers,storageArr}=props;
  const initialValues = {
    createdAt: new Date(),
  };
  const onSubmit = (values, formikBag) => {
    localStorage.setItem(nanoid(), JSON.stringify(values));
    formikBag.resetForm();
  }
  const addTimer=(storageArr)=>{
   addTimers(storageArr);
   console.log('hello');
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
                  label="eventTime" />
                <label htmlFor="eventTime">Reminder date</label>
                <FormInput
                  classes={formInputClasses}
                  name="reminderDate"
                  type="datetime-local"
                  label="Reminder date" />
                <input  className={styles.inputContainer} type='submit' value='Create timer' onClick={addTimer(storageArr)}/>
              </Form>)
          }}
        </Formik>
    </div>
    </>
  );
}
const mapDispatchToProps = dispatch => ({
  changeEventsDate: (data) => dispatch(changeEventsDate(data))
});

export default connect(mapDispatchToProps)(FormEventCounter);
