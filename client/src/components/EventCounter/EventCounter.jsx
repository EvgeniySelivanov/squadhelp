import React from 'react';
import { nanoid } from 'nanoid';
import FormEventCounter from './FormEventCounter/FormEventCounter';
import SingleCounter from './SingleCounter/SingleCounter';
import styles from './EventCounter.module.scss';
const EventCounter = (props) => {

  const restartComponent = () => {
   document.location.reload();
  }
  const deleteTimer=(keyLocalStorage)=>{
    localStorage.removeItem(keyLocalStorage);
    restartComponent();
  }
  const sortArray = (arr) => {
    arr.sort((a, b) => {

      if (Date.parse(a.eventValue.eventTime) > Date.parse(b.eventValue.eventTime)) {
        return 1
      }
      if (Date.parse(a.eventValue.eventTime) < Date.parse(b.eventValue.eventTime)) {
        return -1
      }
      return 0;
    })
  }

  const addTimers = () => {
    const storageArr = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key !== 'accessToken') {
        storageArr.push({value:localStorage.getItem(key),key:key});
      }
    }

    const eventArr = storageArr.map((event) => {
      
      return {
        eventValue:JSON.parse(event.value),
        eventKey:event.key,
      }
    })
    sortArray(eventArr);
    return eventArr.map((event) => {
      return <SingleCounter key={nanoid()} event={event.eventValue} keyLocalStorage={event.eventKey} deleteTimer={deleteTimer}/>
    })
  }

  return (
    <div>
      <h1>EventCounter</h1>
      <div className={styles.main}>
        <div>
          <FormEventCounter restartComponent={restartComponent} />
        </div>
        <div className={styles.scroll}>
          <div className={styles.counters}>{addTimers()}</div>
        </div>
      </div>
    </div>



  );
}

export default EventCounter;
