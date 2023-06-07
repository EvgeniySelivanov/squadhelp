import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import CONSTANTS from '../../constants';
import styles from './OfferBox.module.sass';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';

const OfferBoxModerator = (props) => {
console.log(props);

  const approvedOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            props.setOfferStatus(props.offers.User.id, props.offers.id, 'approved',props.offers.Contest),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const rejectOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            props.setOfferStatus(props.offers.User.id, props.offers.id, 'reject',props.offers.Contest),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const { avatar, firstName, lastName, email } = props.offers.User;
  return (
    <div className={styles.offerContainer}>
    
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={
                avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${avatar}`
              }
              alt="user"
            />
            <div className={styles.nameAndEmail}>
              <span>{`${firstName} ${lastName}`}</span>
              <span>{email}</span>
            </div>
          </div>
       
        </div>
       
      </div>
     
        <div className={styles.btnsContainer}>
          <div onClick={approvedOffer} className={styles.resolveBtn}>
            Approved
          </div>
          <div onClick={rejectOffer} className={styles.rejectBtn}>
            Reject
          </div>
        </div>
      
    </div>
  );
};

export default OfferBoxModerator;
