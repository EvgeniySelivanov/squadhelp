import React ,{useEffect}from 'react';
import { nanoid } from 'nanoid';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CONSTANTS from '../../constants';
import {
  setOfferStatus,
  clearSetOfferStatusError,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';
import {
  getOffers, clearContestsList,
  setNewCreatorFilter,
} from '../../store/slices/contestsSlice';
import OfferBoxModerator from '../../components/OfferBoxModerator/OfferBoxModerator';


const ModeratorPage = (props) => {
  // console.log(props);
  useEffect(() => {
    props.getOffers({
      limit: 8,
      offset: 0
    });
  }, []);
 
  const { offers } = props.contestsList;
  const { role } = props.userStore.data;
  console.log(offers);


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
      <div >
        There is no suggestion at this moment
      </div>
    );
  };


  // const needButtons = (offerStatus) => {
  //   // const contestCreatorId = offers.User.id;
  //   // const userId = offers.Contest.userId;
  //   const contestStatus = offers.Contest.status;
  //   return (
  //     // contestCreatorId === userId &&
  //     contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
  //     offerStatus === CONSTANTS.OFFER_STATUS_APPROVED
  //   );
  // };


  const setOfferStatus = (creatorId, offerId, command,Contest) => {
    props.clearSetOfferStatusError();
    const { id, orderId, priority } =Contest;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    props.setOfferStatus(obj);
  };


  changeEditContest(false)

  if (role === CONSTANTS.MODERATOR) {
    return (
      <>
        <Header />
        <div>{setOfferList()}</div>
        <Footer />
      </>

    );
  } else return (
    <><Header />
      <div>You are not a moderator</div>
      <Footer /></>

  )
}



const mapStateToProps = state => {
  const {  userStore, chatStore, contestsList } = state;
  return {contestsList,  userStore, chatStore };
};
const mapDispatchToProps = (dispatch) => ({
  getOffers: (data) =>
    dispatch(getOffers({ requestData: data, role: CONSTANTS.MODERATOR })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCreatorFilter(filter)),
  setOfferStatus: (data) => dispatch(setOfferStatus(data)),
  clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  changeContestViewMode: (data) => dispatch(changeContestViewMode(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModeratorPage));
