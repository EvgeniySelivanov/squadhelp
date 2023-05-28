import React, { useState, useEffect } from 'react';
import styles from './SingleCounter.module.scss';
const SingleCounter = (props) => {
  const initialState = {
    time: null
  }
  const initialStatePass = {
    timePass: null
  }
  const [time, setTime] = useState(initialState);
  const [timePass, setPassTime] = useState(initialStatePass);
  const { event: { eventName, eventTime, createdAt,reminderDate } } = props;
  useEffect(() => {
    myClock(eventTime);
    myClockPassed(eventTime, createdAt);
  }, [])
  /**Время которое осталось */
  const getTimeRemaining = (eventTime) => {
    /**Время которое осталось  remainingTime*/
    const remainingTime = Date.parse(eventTime) - Date.parse(new Date());
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    return {
      'total': remainingTime,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  const myClock = (eventTime) => {
    let timeintervalDown = setInterval(() => {
      let t = getTimeRemaining(eventTime);
      if (t.total <= 0) {
        setTime({ ...initialState });
        stopTimer(timeintervalDown);
      } else { setTime(t) }
      ;
    }, 1000);
  }
  /**Время которое прошло */
  const getTimedPassed = (eventTime, createdAt) => {
    let remainingTime = Date.parse(eventTime) - Date.parse(new Date());/**Время которое осталось */
    let eventTimeFull = Date.parse(eventTime) - Date.parse(createdAt);//диапазон времени от создания события до дедлайна
    let eventTimePass = eventTimeFull - remainingTime;     //время которое прошло
    return {
      'eventTimeFull': eventTimeFull,
      'total': eventTimePass,
    };
  }
  const myClockPassed = (eventTime, createdAt) => {
    let timeintervalUp = setInterval(() => {
      let timePassed = getTimedPassed(eventTime, createdAt);
      if (timePassed.total >= timePassed.eventTimeFull) {
        setPassTime({...initialStatePass});
        stopTimer(timeintervalUp);
      } else {
        setPassTime(timePassed);
      }
    }, 1000);
  }
  const stopTimer = (timeinterval) => {
    clearInterval(timeinterval);
  }
  const convertTimeZone = (time) => {
    return new Date(time).toLocaleString("en-US", { timeZone: "Europe/Kiev" })
  }


  let widthMeaning = (100 * timePass.total) / timePass.eventTimeFull;
  let colorScale = 'white';
  if (widthMeaning >= 75 && widthMeaning <= 96) {
    colorScale = 'yellow';
  } else {
    if (widthMeaning > 96 && widthMeaning <= 100) {
      colorScale = 'red';
    } else {
      colorScale = 'green';
    }
  }
  const scaleLineStyleBackGround = {
    backgroundColor: "gray",
    minWidth:"300px",
    maxWidth: "600px",
    height: "60px"
  }
  const scaleLineStyleTop = {
    backgroundColor: `${colorScale}`,
    width: `${widthMeaning}%`,
    maxWidth: "600px",
    height: "60px"
  }
  return (
    <>
      <div className={styles.main}>
        <div style={scaleLineStyleBackGround} className={styles.scale}>
          <div style={scaleLineStyleTop} className={styles.scale} id="clock">
          </div>
        </div>
        <div className={styles.eventContent}>
          <div>
            <p>Event name: {eventName}</p>
            <p>Create date: {convertTimeZone(createdAt)}</p>
            <p>Deadline: {convertTimeZone(eventTime)}</p>
            <p>Days left: {time.days}</p>
            <p>Hours left: {time.hours}</p>
            <p>Minutes left: {time.minutes}</p>
            <p>Seconds left: {time.seconds}</p>
          </div>
          <div>
            {Date.parse(reminderDate)<=Date.parse(new Date())?<div><img src="/staticImages/warning.webp" alt="" /><p>Reminder!</p></div>:<></>}
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleCounter;
