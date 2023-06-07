import React from 'react';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';
import styles from '../ModeratorPage/ModeratorPage.module.scss';

const Dashboard = props => {
  const { role, history } = props;
  if (role && role != CONSTANTS.MODERATOR) {
    return (
      <div>
        <Header />
        {role === CONSTANTS.CUSTOMER ? (
          <CustomerDashboard history={history} match={props.match} />
        ) : (
          <CreatorDashboard history={history} match={props.match} />
        )}
      </div>)
  }
  if (role === CONSTANTS.MODERATOR) {
    return ( 
  <>
  <Header />
  <p className={styles.warningMessage}>Access for moderators denied</p>
  </> 
  )
  }
  else {
    history.push('/login');
    window.document.location.reload();
  }

};

const mapStateToProps = state => state.userStore.data;

export default connect(mapStateToProps)(Dashboard);
