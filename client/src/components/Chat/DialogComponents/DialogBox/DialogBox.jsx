import React,{useEffect} from 'react';
import classNames from 'classnames';
import styles from './DialogBox.module.sass';
import { connect } from 'react-redux';
import { getPreviewChat } from '../../../../store/slices/chatSlice';
import CONSTANTS from '../../../../constants';


const DialogBox = props => {
  const {
    chatPreview,
    getTimeStr,
    changeFavorite,
    changeBlackList,
    catalogOperation,
    goToExpandedDialog,
    chatMode,
    userStore,
  } = props;
  useEffect(() => {
    getPreviewChat()
  }, []);

  const { conversation_id, createdAt, text ,favorite_list, blackList,interlocutor,user_id,} = chatPreview;
const participants=[user_id,interlocutor.id];
const id=conversation_id;

  const isFavorite = favorite_list;
  let isBlocked ;
  if(userStore.data.role===CONSTANTS.CREATOR){
    blackList ? isBlocked = blackList[0]:isBlocked=false;

  }else{
    blackList ? isBlocked = blackList[1]:isBlocked=false;
    isBlocked = blackList[1];}
  
  return (
    <div
      className={styles.previewChatBox}
      onClick={() =>
        goToExpandedDialog({
          interlocutor,
          chatPreview,
          conversationData: {
            participants,
            id,
            blackList,
            favorite_list,
          },
        })
      }
    >
      <img
        src={
          interlocutor.avatar === 'anon.png'
            ? CONSTANTS.ANONYM_IMAGE_PATH
            : `${CONSTANTS.publicURL}${interlocutor.avatar}`
        }
        alt="user"
      />
      <div className={styles.infoContainer}>
        <div className={styles.interlocutorInfo}>
          <span className={styles.interlocutorName}>
            {interlocutor.firstName}
          </span>
          <span className={styles.interlocutorMessage}>{text}</span>
        </div>
        <div className={styles.buttonsContainer}>
          <span className={styles.time}>{getTimeStr(createdAt)}</span>
          <i
            onClick={event =>
              changeFavorite(
                {
                  conversation_id,
                  favoriteFlag: !isFavorite,
                  participants:participants,
                  interlocutor,
                  role:userStore.data.role,
                },
                event
              )
            }
            className={classNames({
              'far fa-heart': !isFavorite,
              'fas fa-heart': isFavorite,
            })}
          />
          <i
            onClick={event =>
              changeBlackList(
                { participants:participants,
                  conversation_id,
                  blackListFlag: !isBlocked,
                  interlocutor,
                  role:userStore.data.role,
                },
                event
              )
            }
            className={classNames({
              'fas fa-user-lock': !isBlocked,
              'fas fa-unlock': isBlocked,
            })}
          />
          <i
            onClick={event => catalogOperation(event, id)}
            className={classNames({
              'far fa-plus-square':
                chatMode !== CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
              'fas fa-minus-circle':
                chatMode === CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
            })}
          />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
 const{chatStore,userStore}= state;
 return { chatStore, userStore };
}

const mapDispatchToProps = (dispatch) => ({
  getChatPreview: () => dispatch(getPreviewChat()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogBox);
