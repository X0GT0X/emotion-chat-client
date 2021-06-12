import React from 'react';
import PropTypes from 'prop-types';
import AccountDialog from '../../dialogs/AccountDialog/AccountDialog';
import AddChatDialog from '../../dialogs/AddChatDialog/AddChatDialog';
import ContactsDialog from '../../dialogs/ContactsDialog/ContactsDialog';
import LogOutDialog from '../../dialogs/LogOutDialog/LogOutDialog';
import ChatInfoBar from '../../components/ChatInfoBar/ChatInfoBar';
import ChatInfoPanel from '../../components/ChatInfoPanel/ChatInfoPanel';
import ChatView from '../../components/Chatview/ChatView';
import MessageBox from '../../components/MessageBox/MessageBox';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './styles';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import io from 'socket.io-client';
import {
  fetchUserChats,
  readChat,
  fetchUserGroups,
  addChat
} from '../../actions/chats';
import { fetchProtectedData } from '../../actions/data';
import { fetchContactList } from '../../actions/contacts';
import connect from 'react-redux/es/connect/connect';
import { API_PATH } from '../../utils/constants';

/**
 * Maps redux store state to component props.
 *
 * @param state Redux store state.
 *
 * @return object Mapped properties.
 */
const mapStateToProps = (state) => ({
  isFetching: state.chats.isFetching,
  loaded: state.chats.loaded,
  chats: state.chats.chats,
  groups: state.chats.groups,
  userLogin: state.auth.login,
  userData: state.data.data,
  token: state.auth.token
});

/**
 * Maps redux dispatcher functions to component props.
 *
 * @param dispatch The `dispatch` function available on your Redux store.
 *
 * @return {object} The object mimicking the original object
 */
const mapDispatchToProps = (dispatch) => ({
  getChats: (token, selectChat, chat, isFetching) => dispatch(fetchUserChats(token, selectChat, chat, isFetching)),
  readChat: (chat, type) => dispatch(readChat(chat, type)),
  fetchContactList: (token) => dispatch(fetchContactList(token)),
  getGroups: (token, isFetching) => dispatch(fetchUserGroups(token, isFetching)),
  getUserData: (token) => dispatch(fetchProtectedData(token)),
  addChat: (userLogin, openModal, selectChat) => dispatch(addChat(userLogin, openModal, selectChat))
});

export const socket = io(API_PATH);

/**
 * Class representing Dashboard page.
 */
class Dashboard extends React.Component {
  /**
   * Dashboard constructor.
   * @param props
   * @constructor
   */
  constructor (props) {
    super(props);

    this.state = {
      selectedChat: null,
      chatInfoOpen: false,
      logOutDialogOpen: false,
      accountDialogOpen: false,
      addChatDialogOpen: false,
      contactsDialogOpen: false,
      anchorMenu: null,
      loadingMessages: []
    };

    this.setModalOpen = this.setModalOpen.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.selectChat = this.selectChat.bind(this);
    this.readMessage = this.readMessage.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.getSelectedChatUserList = this.getSelectedChatUserList.bind(this);
    this.handleRemoveChat = this.handleRemoveChat.bind(this);
    this.handleRemoveContact = this.handleRemoveContact.bind(this);
  }

  componentDidMount () {
    this.props.getChats(this.props.token, null, null, true);
    this.props.getGroups(this.props.token, true);
    this.props.getUserData(this.props.token);
    this.setSocketListeners();

    window.addEventListener('online', () => this.changeUserStatus('online'));
    window.addEventListener('offline', () => this.changeUserStatus('offline'));
    window.addEventListener('beforeunload', () => {
      this.changeUserStatus('offline');
    });
    window.addEventListener('unload', () => {
      this.changeUserStatus('offline');
    });

    this.changeUserStatus('online');
  }

  componentWillUnmount () {
    this.changeUserStatus('offline');
  }

  setSocketListeners () {
    socket.on('message_sent', (data) => {
      if (data.users.includes(this.props.userLogin)) {
        if (data.chat === this.state.selectedChat && data.sender !== this.props.userLogin) {
          if (this.props.chats.find(_chat => _chat.chat_id === data.chat)) {
            this.readMessage(data.chat).then(() => {
              this.props.getChats(this.props.token);
              this.props.getGroups(this.props.token);
            });
          } else {
            this.readMessage(data.chat, 'group').then(() => {
              this.props.getChats(this.props.token);
              this.props.getGroups(this.props.token);
            });
          }
        } else {
          this.props.getChats(this.props.token);
          this.props.getGroups(this.props.token);
        }
      }
    });
    socket.on('chats_loaded', () => {
      this.setState({
        loadingMessages: []
      });
    });
    socket.on('message_removed', (data) => {
      if (data.users.includes(this.props.userLogin)) {
        this.props.getChats(this.props.token);
        this.props.getGroups(this.props.token);
      }
    });
    socket.on('chat_removed', (data) => {
      if (data.users.includes(this.props.userLogin)) {
        this.props.getChats(this.props.token);
        if (this.state.selectedChat === data.chat) {
          this.selectChat(null);
        }
      }
    });
    socket.on('contact_removed', (data) => {
      if (data.users.includes(this.props.userLogin)) {
        this.props.getChats(this.props.token);
        this.props.fetchContactList(this.props.token);
        if (this.state.selectedChat === data.chat) {
          this.selectChat(null);
        }
      }
    });
    socket.on('group_removed', (data) => {
      if (data.users.includes(this.props.userLogin)) {
        this.props.getGroups(this.props.token);
        if (this.state.selectedChat === data.group) {
          this.selectChat(null);
        }
      }
    });
  }

  changeUserStatus (status) {
    socket.emit('change_user_status', {
      user: this.props.userLogin,
      status
    });
  }

  selectChat (chatId, chatList) {
    const chat = chatList.find(_chat => _chat.chat_id === chatId);

    if (chat.type === 'chat') {
      if (!chat.receiverHasRead && chat.messages.length > 0 && chat.messages[chat.messages.length - 1].sender.login !== this.props.userLogin) {
        this.readMessage(chatId, 'chat')
          .then(() => this.setState({
            selectedChat: chatId,
            chatInfoOpen: false
          }));
      } else {
        this.setState({
          selectedChat: chatId,
          chatInfoOpen: false
        });
      }
    } else {
      const receiverHasRead = chat.receivers.find(_usr => _usr.login === this.props.userLogin);
      if (receiverHasRead && chat.messages[chat.messages.length - 1].sender.login !== this.props.userLogin) {
        this.readMessage(chatId, 'group')
          .then(() => this.setState({
            selectedChat: chatId,
            chatInfoOpen: false
          }));
      } else {
        this.setState({
          selectedChat: chatId,
          chatInfoOpen: false
        });
      }
    }
  }

  newChatBtnClicked () {
    this.setModalOpen('add-chat', true);
  }

  chatInfoToggle (state) {
    this.setState({
      chatInfoOpen: state
    });
  }

  async readMessage (chatId, type) {
    await this.props.readChat(chatId, type);
  }

  sendMessage (msg, type) {
    const message = {
      type: type,
      sender: this.props.userLogin,
      chat: this.state.selectedChat,
      message: msg
    };

    this.setState({
      loadingMessages: [...this.state.loadingMessages, {
        ...message,
        sender: this.props.userData,
        timestamp: (+new Date()).toString(),
        loading: true
      }]
    });

    socket.emit('send_message', message);
  }

  removeMessage (msg) {
    const chatList = [...this.props.groups, ...this.props.chats];
    const chat = chatList.find(_chat => _chat.chat_id === this.state.selectedChat);

    socket.emit('remove_message', {
      message: msg,
      chat: chat.chat_id,
      type: chat.type
    });
  }

  handleRemoveChat () {
    socket.emit('remove_chat', {
      chat_id: this.state.selectedChat
    });
  }

  handleRemoveContact (user) {
    if (user) {
      const chat = this.props.chats.find(_chat => _chat.users.find(_usr => _usr.login === user.login));
      let data;
      if (chat) {
        data = {
          chat: chat.chat_id,
          contact: user.login,
          user: this.props.userLogin
        };
      } else {
        data = {
          chat: null,
          contact: user.login,
          user: this.props.userLogin
        };
      }
      socket.emit('remove_contact', data);
    } else {
      const chat = this.props.chats.find(_chat => _chat.chat_id === this.state.selectedChat);
      const contact = chat.users.find(_usr => _usr.login !== this.props.userLogin).login;

      const data = {
        chat: this.state.selectedChat,
        contact: contact,
        user: this.props.userLogin
      };

      socket.emit('remove_contact', data);
    }
  }

  handleRemoveGroup (id) {
    socket.emit('remove_group', {
      chat_id: id
    });
  }

  setModalOpen (modal, state) {
    switch (modal) {
      case 'logout':
        this.setState({ logOutDialogOpen: state });
        break;
      case 'account':
        this.setState({ accountDialogOpen: state });
        break;
      case 'add-chat':
        this.setState({ addChatDialogOpen: state });
        break;
      case 'contacts':
        this.setState({ contactsDialogOpen: state });
        break;
      default:
    }
  }

  getSelectedChatUserList (chatList) {
    const selectedChat = chatList.filter(_chat => _chat.chat_id === this.state.selectedChat)[0];
    if (selectedChat) {
      return selectedChat.users.filter(_user => _user.login !== this.props.userLogin);
    }
    return [];
  }

  handleChatInfoToggle () {
    this.setState({ chatInfoOpen: !this.state.chatInfoOpen });
  }

  handleOpenAccountMenu (e) {
    this.setState({ anchorMenu: e.currentTarget });
  };

  handleCloseAccountMenu () {
    this.setState({ anchorMenu: null });
  };

  handleGoToChat (login, chatList) {
    const chat = this.props.chats.find(_chat => _chat.users.find(_usr => _usr.login !== this.props.userLogin).login === login);
    if (chat) {
      this.selectChat(chat.chat_id, chatList);
    } else {
      this.props.addChat(login, null, this.selectChat);
    }
  };

  render () {
    const { classes } = this.props;

    let chatList = [];
    if (this.props.chats && this.props.groups) {
      chatList = [...this.props.groups, ...this.props.chats];
    }

    return (
      <div className={'dashboard ' + classes.dashboard}>
        <Sidebar
          history={this.props.history}
          newChatBtnHandle={this.newChatBtnClicked}
          selectChatHandle={this.selectChat}
          selectedChatIndex={this.state.selectedChat}
          logOutHandleClick={() => this.setModalOpen('logout', true)}
          accountHandleClick={() => this.setModalOpen('account', true)}
          contactsHandleClick={() => this.setModalOpen('contacts', true)}
          chatList={chatList}
          user={this.props.userData}
        />

        {
          this.state.selectedChat !== null
            ? <div
              className={this.state.chatInfoOpen ? classes.contentShift : classes.content}>
              <div className={classes.chatViewContainer}>
                <ChatInfoBar
                  getSelectedChatUserList={this.getSelectedChatUserList}
                  chatList={chatList}
                  selectedChat={this.state.selectedChat}
                  handleChatInfoOpen={this.handleChatInfoToggle}
                  handleOpenMenu={this.handleOpenAccountMenu}
                  handleCloseMenu={this.handleCloseAccountMenu}
                  handleRemoveChat={this.handleRemoveChat}
                  handleRemoveContact={this.handleRemoveContact}
                  anchorMenu={this.state.anchorMenu}
                />
                <ChatView
                  chat={chatList.filter(_chat => _chat.chat_id === this.state.selectedChat)[0]}
                  messages={[...chatList.filter(_chat => _chat.chat_id === this.state.selectedChat)[0].messages, ...this.state.loadingMessages]}
                  handleRemoveMessage={this.removeMessage}
                />
                {
                  chatList.find(_chat => _chat.chat_id === this.state.selectedChat)
                    ? <MessageBox
                      selectedChat={this.state.selectedChat}
                      selectedChatType={chatList.filter(_chat => _chat.chat_id === this.state.selectedChat)[0].type}
                      sendMessageHandle={this.sendMessage}
                    />
                    : null
                }
              </div>
            </div>
            : <div className={classes.defaultComponent}>
              <div className="container">
                <QuestionAnswerIcon className={classes.bigIcon}/>
                <Typography element="p" className={classes.text}>Choose a chat
                  to start conversation.</Typography>
              </div>
            </div>
        }

        <ChatInfoPanel
          open={this.state.chatInfoOpen}
          handleToggle={this.chatInfoToggle}
          selectedChat={chatList.filter(_chat => _chat.chat_id === this.state.selectedChat)[0]}
          userLogin={this.props.userLogin}
          handleSelectChat={this.selectChat}
          handleRemoveGroup={this.handleRemoveGroup}
          handleGoToChat={(login) => this.handleGoToChat(login, chatList)}
          handleRemoveContact={this.handleRemoveContact}
          socket={socket}
          selectChat={this.selectChat}
        />
        <LogOutDialog open={this.state.logOutDialogOpen}
                      setOpen={this.setModalOpen}/>
        {this.props.userData
          ? <AccountDialog
            open={this.state.accountDialogOpen}
            setOpen={this.setModalOpen}
          />
          : null}
        <AddChatDialog
          open={this.state.addChatDialogOpen}
          setOpen={this.setModalOpen}
        />
        <ContactsDialog
          open={this.state.contactsDialogOpen}
          setOpen={this.setModalOpen}
          socket={socket}
          handleSelectChat={this.selectChat}
          handleGoToChat={(login) => this.handleGoToChat(login, chatList)}
          handleRemoveContact={this.handleRemoveContact}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  isFetching: PropTypes.bool,
  loaded: PropTypes.bool,
  chats: PropTypes.array,
  groups: PropTypes.array,
  userLogin: PropTypes.string,
  userData: PropTypes.object,
  token: PropTypes.string,
  getChats: PropTypes.func,
  readChat: PropTypes.func,
  fetchContactList: PropTypes.func,
  getGroups: PropTypes.func,
  getUserData: PropTypes.func,
  addChat: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));
