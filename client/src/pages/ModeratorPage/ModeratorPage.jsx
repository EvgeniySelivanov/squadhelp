import React ,{useEffect} from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CONSTANTS from '../../constants';
import OfferBoxModerator from '../../components/OfferBoxModerator/OfferBoxModerator';
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';

const ModeratorPage = (props) => { 
  useEffect(() => {
  getData();
}, []);
  const getData = () => {
    const { params } = props.match;
    props.getData({ contestId: params.id });
  };
 
  // const{userData,}=useState(props.userStore)
  console.log(props.userStore);
  const needButtons = (offerStatus) => {
    const contestCreatorId = props.contestByIdStore.contestData.User.id;
    const userId = props.userStore.data.id;
    const contestStatus = props.contestByIdStore.contestData.status;
    return (
      contestCreatorId === userId &&
      contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
      offerStatus === CONSTANTS.OFFER_STATUS_PENDING
    );
  };
 

 

  const setOffersList = () => {
    const array = [];
    for (let i = 0; i < props.contestByIdStore.offers.length; i++) {
      array.push(
        <OfferBoxModerator
          data={props.contestByIdStore.offers[i]}
          key={props.contestByIdStore.offers[i].id}
          needButtons={needButtons}
          setOfferStatus={setOfferStatus}
          contestType={props.contestByIdStore.contestData.contestType}
          date={new Date()}
        />
      );
    }
    return array.length !== 0 ? (
      array
    ) : (
      <div>
        There is no suggestion at this moment
      </div>
    );
  };


  const setOfferStatus = (creatorId, offerId, command) => {
    props.clearSetOfferStatusError();
    const { id, orderId, priority } = props.contestByIdStore.contestData;
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
  if (props.userStore.data.role === CONSTANTS.MODERATOR) {
    return (
      <>
        <Header />
        <div>{setOffersList()}</div>
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
  const { contestByIdStore, userStore, chatStore } = state;
  return { contestByIdStore, userStore, chatStore };
};
const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getContestById(data)),
  setOfferStatus: (data) => dispatch(setOfferStatus(data)),
  clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  changeContestViewMode: (data) => dispatch(changeContestViewMode(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ModeratorPage);
