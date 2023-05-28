import React from 'react';
import { nanoid } from 'nanoid';
import FormEventCounter from './FormEventCounter/FormEventCounter';
import SingleCounter from './SingleCounter/SingleCounter';
import styles from './EventCounter.module.scss';
const EventCounter = () => {

  const restartComponent = () => {
   document.location.reload();
  }

  const sortArray = (arr) => {
    arr.sort((a, b) => {

      if (Date.parse(a.eventTime) > Date.parse(b.eventTime)) {
        return 1
      }
      if (Date.parse(a.eventTime) < Date.parse(b.eventTime)) {
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
        storageArr.push(localStorage.getItem(key));
      }
    }
    const eventArr = storageArr.map((event) => {
      return JSON.parse(event)
    })
    sortArray(eventArr);
    return eventArr.map((event) => {
      return <SingleCounter key={nanoid()} event={event} />
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
