import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  backToDialogList,
  changeChatFavorite,
  changeChatBlock,
} from '../../../../store/slices/chatSlice';
import styles from './ChatHeader.module.sass';
import CONSTANTS from '../../../../constants';

const ChatHeader = props => {
  const {
    interlocutor: { avatar, firstName },
    backToDialogList,
    chatData,
    chatPreview,
    userId,
    data,
  } = props;
  const changeFavorite = (data, event) => {
    props.changeChatFavorite(data);
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    props.changeChatBlock(data);
    event.stopPropagation();
  };

  const isFavorite = (data) => {
    const { favorite_list } =data;
    return favorite_list;
  };

  const isBlocked = (chatPreview) => {
    const { blackList } = chatPreview;
    if (data.role === CONSTANTS.CREATOR) {
      return blackList[0];
    } else {
      return blackList[1];
    }
  };

  return (
    <div className={styles.chatHeader}>
      <div
        className={styles.buttonContainer}
        onClick={() => backToDialogList()}
      >
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}arrow-left-thick.png`}
          alt="back"
        />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <img
            src={
              avatar === 'anon.png'
                ? CONSTANTS.ANONYM_IMAGE_PATH
                : `${CONSTANTS.publicURL}${avatar}`
            }
            alt="user"
          />
          <span>{firstName}</span>
        </div>
        {chatData && (
          <div>
            <i
              onClick={event =>
                changeFavorite(
                  {
                    favoriteFlag: !isFavorite(chatPreview),
                    participants:chatPreview.participants,
                    conversation_id:chatPreview.conversation_id,
                    interlocutor:chatPreview.interlocutor,
                    role:data.role,

                  },
                  event
                )
              }
              className={classNames({
                'far fa-heart': !isFavorite(chatPreview, userId),
                'fas fa-heart': isFavorite(chatPreview, userId),
              })}
            />
            <i
              onClick={event =>
                changeBlackList(
                  {
                    blackListFlag: !isBlocked(chatPreview),
                    participants:chatPreview.participants,
                    conversation_id:chatPreview.conversation_id,
                    interlocutor:chatPreview.interlocutor,
                    role:data.role,
                  },
                  event
                )
              }
              className={classNames({
                'fas fa-user-lock': !isBlocked(chatPreview, userId),
                'fas fa-unlock': isBlocked(chatPreview, userId),
              })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { interlocutor, chatData, chatPreview } = state.chatStore;
  const { data } = state.userStore;
  return { interlocutor, chatData, chatPreview, data };
};

const mapDispatchToProps = dispatch => ({
  backToDialogList: () => dispatch(backToDialogList()),
  changeChatFavorite: data => dispatch(changeChatFavorite(data)),
  changeChatBlock: data => dispatch(changeChatBlock(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
