import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './Notification.module.sass';

const Notification = props => (
  <div>
    <br />
    <span>{props.message}</span>
    <br />
    {props.contestId && (

      <Link to="/dashboard">
        <span
          onClick={() => props.history.push(`/contest/${props.contestId}`)}
          className={styles.goToContest}
        >
          Go to contest
        </span>
      </Link>

    )}
  </div>
);

export default withRouter(Notification);
