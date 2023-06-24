import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import className from 'classnames';
import { nanoid } from 'nanoid';
import {
  getDialogMessages,
  clearMessageList,
} from '../../../../store/slices/chatSlice';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import styles from './Dialog.module.sass';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';

class Dialog extends React.Component {
   
  messagesEnd = React.createRef();
  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  
  componentDidMount() {;
    this.props.getDialog({ interlocutorId: this.props.interlocutor.id});
    this.scrollToBottom();
  }

  renderMainDialog = () => {
    const messagesArray = [];
    const { messages, userId } = this.props;
    messages.forEach((message) => {
      messagesArray.push(
        <div
          key={nanoid()}
          className={className(
            userId === message.sender ? styles.ownMessage : styles.message
          )}
        >
          <span>{message.body}</span>
          <span className={styles.messageTime}>
            {moment(message.createdAt).format('HH:mm')}
          </span>
          <div ref={this.messagesEnd} />
        </div>
      );
    });
    return <div className={styles.messageList}>{messagesArray}</div>;
  };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.interlocutor.id !== this.props.interlocutor.id){ 
    this.props.getDialog({ interlocutorId: nextProps.interlocutor.id });
  }
  }
  componentDidUpdate(prevProps,prevState,snapshot) {
    if (this.messagesEnd.current) this.scrollToBottom();
    if(prevProps.messages.length!==this.props.messages.length){
      this.props.getDialog({ interlocutorId: this.props.interlocutor.id });
    }
  }
  componentWillUnmount() {
    this.props.clearMessageList();
  }
  
  render() {
    const {  userId ,chatPreview} = this.props;
    if(chatPreview
      &&chatPreview.blackList[0]===true ){
      return (<>
       <ChatHeader userId={userId} />
        {this.renderMainDialog()}
      <div ref={this.messagesEnd} />
      <span className={styles.messageBlock}>{'Creator blocked chat'}</span></>)
    }
    else if(chatPreview&&
      chatPreview.blackList[1]===true){
      return (<>
       <ChatHeader userId={userId} />
        {this.renderMainDialog()}
      <div ref={this.messagesEnd} />
      <span className={styles.messageBlock}>{'Buyer blocked chat'}</span></>)
    }
   
    else{ return (
      <>
        <ChatHeader userId={userId} />
        {this.renderMainDialog()}
        <div ref={this.messagesEnd} />
        <ChatInput />
      </>
    );}
   
  }
}

const mapStateToProps = (state) => state.chatStore;
const mapDispatchToProps = (dispatch) => ({
  getDialog: (data) => dispatch(getDialogMessages(data)),
  clearMessageList: () => dispatch(clearMessageList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
