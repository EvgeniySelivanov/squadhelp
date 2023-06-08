import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendEmail } from '../../api/rest/restController';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CONSTANTS from '../../constants';
import { setOfferStatus } from '../../store/slices/contestByIdSlice';
import { getOffers, getAllOffersMore } from '../../store/slices/contestsSlice';
import OfferBoxModerator from '../../components/OfferBoxModerator/OfferBoxModerator';
import styles from './ModeratorPage.module.scss';
import AmountBtns from '../../components/AmountBtns/index';


const ModeratorPage = (props) => {
  const [amount, setAmount] = useState(CONSTANTS.MIN_LIMIT);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    props.getOffers({
      limit: amount,
      offset: offset
    });
    setOffset(offset + amount);

  }, [amount]);

  const { offers } = props.contestsList;
  const { role } = props.userStore.data;

  const handlerBtn = () => {
    props.getAllOffersMore({ offset: offset, limit: amount });
    setOffset(offset + amount);
  };
  const startBtn = () => {
    props.getAllOffersMore({ offset: 0, limit: 5 });
    setAmount(CONSTANTS.MIN_LIMIT)
    setOffset(0);
  };
  const setOfferList = () => {
    const array = [];
    for (let i = 0; i < offers.length; i++) {
      array.push(
        <OfferBoxModerator
          key={nanoid()}
          offers={offers[i]}
          setOfferStatus={setOfferStatus}
        />
      );
    }
    return array.length !== 0 ? (
      array
    ) : (
      <div className={styles.warningMessage}>
        There is no suggestion at this moment
      </div>
    );
  };

  const setOfferStatus = (creatorId, offerId, command, Contest, offers) => {
    const { id, orderId, priority } = Contest;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    props.setOfferStatus(obj);
    props.getOffers({
      limit: 2,
      offset: 0
    });
    sendEmail(offers);
  };

  if (role === CONSTANTS.MODERATOR) {
    return (
      <>
        <Header />
        <div className={styles.btn}>
          <AmountBtns setAmount={setAmount} />
        </div>
        <div>{setOfferList()}</div>
        <div className={styles.btn}>
          <button onClick={startBtn}>start over</button>
          <button onClick={handlerBtn}>load more...</button>
        </div>
        <Footer />
      </>

    );
  } else return (
    <>
      <Header />
      <div className={styles.warningMessage}>You are not a moderator!</div>
      <Footer />
    </>
  )
}

const mapStateToProps = state => {
  const { userStore, chatStore, contestsList } = state;
  return { contestsList, userStore, chatStore };
};
const mapDispatchToProps = (dispatch) => ({
  getAllOffersMore: (data) => dispatch(getAllOffersMore({ requestData: data, role: CONSTANTS.MODERATOR })),
  getOffers: (data) => dispatch(getOffers({ requestData: data, role: CONSTANTS.MODERATOR })),
  setOfferStatus: (data) => dispatch(setOfferStatus(data)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModeratorPage));
