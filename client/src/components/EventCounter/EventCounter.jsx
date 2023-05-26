import React from 'react';
import { nanoid } from 'nanoid';
import FormEventCounter from './FormEventCounter/FormEventCounter';
import SingleCounter from './SingleCounter/SingleCounter';
import styles from './EventCounter.module.scss';
const EventCounter = () => {
  const storageArr=[];
 for(let i=0; i<localStorage.length; i++) 
 {
   let key = localStorage.key(i);
if(key!=='accessToken'){
  storageArr.push(localStorage.getItem(key));
}
 }
 const addTimers=(storageArr)=>{
 return storageArr.map((event)=>{
    let obj=JSON.parse(event)
   return <SingleCounter key={nanoid()} event={obj} />
    })
 }

  return (
    <div>
      <h1>EventCounter</h1>
      <div className={styles.main}>
        <FormEventCounter addTimers={addTimers} storageArr={storageArr} />
        <div className={styles.counters}>{addTimers(storageArr)}</div>
      </div>
    </div>
      

    
  );
}

export default EventCounter;
