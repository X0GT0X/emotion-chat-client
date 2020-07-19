import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {fetchUsersData, cleanUsersData} from "../actions/data";
import {fetchContactList, fetchFilteredContactList, cleanContactList} from '../actions/contacts';
import {addChat, addChatClose, addGroup} from "../actions/chats";
import connect from "react-redux/es/connect/connect";
import withStyles from "@material-ui/core/styles/withStyles";
import AddChat from "../components/AddChat";
import AddGroup from "../components/AddGroup";

const styles = theme => ({});

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    error: state.chats.addChatError,
    isAddingChat: state.chats.isAddingChat,
    usersList: state.contacts.filteredContacts,
    contactList: state.contacts.contacts,
    isFetching: state.contacts.isFetching,
  };
}

const mapDispatchToProps = (dispatch) => ({
  addChat: (userLogin, openModal) => dispatch(addChat(userLogin, openModal)),
  addChatClose: () => dispatch(addChatClose()),
  addGroup: (title, users, openModal) => dispatch(addGroup(title, users, openModal)),
  fetchUsersData: (token, login) => dispatch(fetchUsersData(token, login)),
  cleanUsersData: () => dispatch(cleanUsersData()),
  fetchContactList: token => dispatch(fetchContactList(token)),
  fetchFilteredContactList: (token, login) => dispatch(fetchFilteredContactList(token, login)),
  cleanContactList: () => dispatch(cleanContactList()),
});


class AddChatDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      addChatLogin: '',
      addGroupLogin: '',
      chatTitle: '',
      groupUserList: [],
      currentTab: 0,
      addGroupError: null,

    };

    this.userTyping = this.userTyping.bind(this);
    this.chooseUser = this.chooseUser.bind(this);
    this.handleAddUserToList = this.handleAddUserToList.bind(this);
    this.handleRemoveUserFromList = this.handleRemoveUserFromList.bind(this);
    this.isUserInGroupList = this.isUserInGroupList.bind(this);

  }

  componentDidMount() {
    this.props.fetchContactList(this.props.token);
  }

  userTyping = (e, type) => {
    switch (type) {
      case 'add-chat-login':
        let login = e.target.value;
        if (login.length >= 3) {
          this.props.fetchFilteredContactList(this.props.token, login);
        }
        else {
          this.props.cleanContactList();
        }
        this.setState({addChatLogin: login});
        break;
      case 'add-group-login':
        this.setState({addGroupLogin: e.target.value});
        break;
      case 'title':
        let title = e.target.value;
        this.setState({chatTitle: title});
        break;
      default:
        break;
    }
  };

  handleClose = () => {
    this.props.setOpen('add-chat', false);
    this.setState({
      addChatLogin: '',
      addGroupLogin: '',
      chatTitle: '',
      groupUserList: [],
      currentTab: 0
    });
    this.props.addChatClose();
    this.props.cleanUsersData();
  };

  handleAddChat = () => {
    if (this.state.currentTab === 0) {
      this.props.addChat(this.state.addChatLogin, this.props.setOpen);
    }
    else {
      let users = [];
      let title = this.state.chatTitle;

      for (let i = 0; i < this.state.groupUserList.length; i++) {
        users.push(this.state.groupUserList[i].login);
      }

      if (title.length < 3) {
        this.setState({
          addGroupError: 'Title should have minimum 3 symbols.'
        });
      }
      else if (users.length < 2) {
        this.setState({
          addGroupError: 'Please choose minimum 2 users.'
        });
      }
      else {
        this.props.addGroup(title, users, this.props.setOpen);
        this.setState({
          addGroupError: null,
        });
      }
    }
    this.setState({
      addChatLogin: '',
      addGroupLogin: '',
      chatTitle: '',
      groupUserList: [],
    });
  };

  chooseUser(login) {
    this.props.fetchFilteredContactList(this.props.token, login);
    this.setState({addChatLogin: login});
  }

  handleAddUserToList(user) {
    this.setState({
      groupUserList: [...this.state.groupUserList, user]
    });
  }

  handleRemoveUserFromList(login) {
    this.setState({
      groupUserList: this.state.groupUserList.filter(user => user.login !== login)
    });
  }

  isUserInGroupList(user) {
    for (let i = 0; i < this.state.groupUserList.length; i++) {
      if (this.state.groupUserList[i].login === user.login) {
        return true;
      }
    }

    return false;
  }

  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  handleChange = (e, tab) => {
    this.setState({currentTab: tab});
  };

  render() {

    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="add-chat-dialog-title"
        aria-describedby="add-chat-dialog-description"
        maxWidth='sm'
        fullWidth={true}
      >
        <DialogTitle id="add-chat-dialog-title">{"Add new chat"}</DialogTitle>
        <DialogContent>
          <Tabs
            value={this.state.currentTab}
            onChange={this.handleChange}
            variant="fullWidth"
          >
            <Tab label="New chat" {...this.a11yProps(0)} />
            <Tab label="New group" {...this.a11yProps(1)} />
          </Tabs>
          <AddChat
            value={this.state.currentTab}
            index={0}
            error={this.props.error}
            login={this.state.addChatLogin}
            userTyping={this.userTyping}
            usersList={this.props.usersList}
            chooseUser={this.chooseUser}
            isFetching={this.props.isFetching}
          />
          <AddGroup
            value={this.state.currentTab}
            index={1}
            error={this.props.addGroupError}
            login={this.state.addGroupLogin}
            chatTitle={this.state.chatTitle}
            userTyping={this.userTyping}
            contactList={this.props.contactList}
            addUserToList={this.handleAddUserToList}
            removeUserFromList={this.handleRemoveUserFromList}
            isFetching={this.props.isFetching}
            groupUserList={this.state.groupUserList}
            userInList={this.isUserInGroupList}
            validation={this.state.addGroupError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleAddChat} color="primary">Add</Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddChatDialog));