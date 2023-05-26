import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
import styles from './SingleCounter.module.scss';
const SingleCounter = (props) => {
  const [time, setTime] = useState([]);
  const [timePass, setPassTime] = useState([]);
  const { event: { eventName, eventTime, createdAt } } = props;

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
    const timeinterval = setInterval(() => {
      let t = getTimeRemaining(eventTime);
      setTime(t);
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }, 1000);
  }
  /**Время которое прошло */
  const getTimedPassed = (eventTime, createdAt) => {
    const remainingTime = Date.parse(eventTime) - Date.parse(new Date());/**Время которое осталось */
    const eventTimeFull = Date.parse(eventTime) - Date.parse(createdAt);//диапазон времени от создания события до дедлайна
    let eventTimePass = eventTimeFull - remainingTime;     //время которое прошло
    const seconds = Math.floor((eventTimePass / 1000) % 60);
    const minutes = Math.floor((eventTimePass / 1000 / 60) % 60);
    const hours = Math.floor((eventTimePass / (1000 * 60 * 60)) % 24);
    const days = Math.floor(eventTimePass / (1000 * 60 * 60 * 24));
    return {
      'eventTimeFull': eventTimeFull,
      'total': eventTimePass,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  const myClockPassed = (eventTime, createdAt) => {
    const timeinterval = setInterval(() => {
      let timePassed = getTimedPassed(eventTime, createdAt);
      setPassTime(timePassed);
      if (timePassed.eventTimePass === timePassed.eventTimeFull) {
        clearInterval(timeinterval);
      }
    }, 1000);
  }



  let widthMeaning = (100 * timePass.total) / timePass.eventTimeFull;
  const mystyle1 = {
    backgroundColor: "gray",
    width: "100%",
    maxWidth: "600px",
    height: "60px"
  }
  const mystyle2 = {
    backgroundColor: "green",
    width: `${widthMeaning}%`,
    maxWidth: "600px",
    height: "60px"
  }

  return (

    <>
      <div className={styles.main}>
        <div style={mystyle1} className={styles.scale}>
          <div style={mystyle2} className={styles.scale} id="clock">
          </div>
        </div>
        <p>Event name: {eventName}</p>
        <p>Create date: {new Date(createdAt).toLocaleString("en-US", {timeZone: "Europe/Kiev"})}</p>
        <p>Deadline: {new Date(eventTime).toLocaleString("en-US", {timeZone: "Europe/Kiev"})}</p>
        <p>Days left: {time.days}</p>
        <p>Hours left: {time.hours}</p>
        <p>Minutes left: {time.minutes}</p>
        <p>Seconds left: {time.seconds}</p>
      </div>


    </>
  );
}
// const mapStateToProps = (state) => {
//   const { data } = state.eventsStore;
//   return { data };
// };
// export default connect(mapStateToProps)(SingleCounter);
export default SingleCounter;
