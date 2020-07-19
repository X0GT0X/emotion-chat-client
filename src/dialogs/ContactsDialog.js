import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import connect from "react-redux/es/connect/connect";
import withStyles from "@material-ui/core/styles/withStyles";
import ContactList from '../components/ContactList';
import {fetchContactList, fetchInvitationList} from '../actions/contacts';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from "@material-ui/core/IconButton/IconButton";
import InvitationList from "../components/InvitationList";
import Badge from "@material-ui/core/Badge/Badge";
import AddContactDialog from "./AddContactDialog";
import {cleanUsersData, fetchUsersData} from "../actions/data";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {addChat, fetchUserChats} from "../actions/chats";

const styles = theme => ({
  addBtn: {
    float: 'right',
  },
  badge: {
    '& span': {
      right: '-12px'
    }
  },
});

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    contacts: state.contacts.contacts,
    invitations: state.contacts.invitations,
    isContactsFetching: state.contacts.isFetching,
    usersList: state.data.usersList,
    isDataFetching: state.data.isFetching,
    userLogin: state.auth.login,
    chats: state.chats.chats,
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchContactList: (token) => dispatch(fetchContactList(token)),
  fetchInvitationList: (token) => dispatch(fetchInvitationList(token)),
  fetchUsersData: (token, login) => dispatch(fetchUsersData(token, login)),
  cleanUsersData: () => dispatch(cleanUsersData()),
  addChat: (userLogin, openModal, selectChat) => dispatch(addChat(userLogin, openModal, selectChat)),
  getChats: (token) => dispatch(fetchUserChats(token)),
});


class ContactsDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
      contactDialogOpen: false,
      login: '',
      inviteMessage: '',
      error: '',
      success: '',
      snackbar: {
        type: '',
        message: '',
        open: false,
      },
    };

    this.userTyping = this.userTyping.bind(this);
    this.chooseUser = this.chooseUser.bind(this);
    this.handleAddContactModalOpen = this.handleAddContactModalOpen.bind(this);
    this.handleSendInvitation = this.handleSendInvitation.bind(this);
    this.handleAcceptInvitation = this.handleAcceptInvitation.bind(this);
    this.handleDeclineInvitation = this.handleDeclineInvitation.bind(this);
    this.setSocketListeners = this.setSocketListeners.bind(this);

  }

  componentDidMount() {

    this.props.fetchContactList(this.props.token);
    this.props.fetchInvitationList(this.props.token);
    this.setSocketListeners();

  }

  setSocketListeners() {
    this.props.socket.on('invitation_sent', data => {
      if (this.props.userLogin === data.sender) {
        this.setState({
          success: data.message,
          error: '',
          login: '',
          inviteMessage: '',
        });
        this.handleAddContactModalOpen(false);
        this.handleShowSnackbar('success', data.message);
      }
      else if (this.props.userLogin === data.receiver) {
        this.props.fetchInvitationList(this.props.token);
      }
    });
    this.props.socket.on('invitation_error', data => {
      if (this.props.userLogin === data.sender) {
        this.setState({
          error: data.error,
          success: ''
        });
      }
    });
    this.props.socket.on('invitation_accepted', data => {
      this.props.fetchContactList(this.props.token);
      this.props.fetchInvitationList(this.props.token);
      if (this.props.userLogin === data.receiver) {
        this.handleShowSnackbar('success', data.message);
      }
    });
    this.props.socket.on('invitation_declined', data => {
      if (this.props.userLogin === data.receiver) {
        this.props.fetchInvitationList(this.props.token);
        this.handleShowSnackbar('info', data.message);
      }
    });
  }

  handleSendInvitation() {
    const invitation = {
      'sender': this.props.userLogin,
      'receiver': this.state.login,
      'message': this.state.inviteMessage
    };

    this.props.socket.emit('send_invitation', invitation);
  }

  handleAcceptInvitation(sender) {
    const data = {
      'sender': sender,
      'receiver': this.props.userLogin
    };

    this.props.socket.emit('accept_invitation', data);
  }

  handleDeclineInvitation(sender) {
    const data = {
      'sender': sender,
      'receiver': this.props.userLogin
    };

    this.props.socket.emit('decline_invitation', data);
  }

  handleShowSnackbar(type, data) {
    this.setState({
      snackbar: {
        type: type,
        message: data,
        open: true,
      }
    });
  }

  userTyping = (e, type) => {
    switch (type) {
      case 'login':
        let login = e.target.value;
        if (login.length >= 3) {
          this.props.fetchUsersData(this.props.token, login);
        }
        else {
          this.props.cleanUsersData();
        }
        this.setState({login});
        break;
      case 'message':
        let message = e.target.value;
        if (message.length < 50) {
          this.setState({inviteMessage: message});
        }
        break;
      default:
        break;
    }
  };

  handleSnackbarClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      snackbar: {
        type: '',
        message: '',
        open: false,
      }
    });
  };

  handleClose = () => {
    this.props.setOpen('contacts', false);
  };

  chooseUser(login) {
    this.props.fetchUsersData(this.props.token, login);
    this.setState({login});
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

  handleAddContactModalOpen = (open) =>
    this.setState({
      contactDialogOpen: open,
      success: '',
      error: '',
      login: '',
      inviteMessage: '',
    });


  handleGoToChat = (login) => {
    this.props.handleGoToChat(login);
    this.handleClose();
  };

  handleRemoveContact = (user) => {
    this.props.handleRemoveContact(user);
    this.handleClose();
  };

  render() {

    const {classes} = this.props;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="contacts-dialog-title"
        aria-describedby="contacts-dialog-description"
        maxWidth='sm'
        fullWidth={true}
      >
        <DialogTitle id="contacts-dialog-title">
          {"Contacts"}
          <IconButton
            className={classes.addBtn}
            onClick={() => this.handleAddContactModalOpen(true)}
          >
            <PersonAddIcon/>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Tabs
            value={this.state.currentTab}
            onChange={this.handleChange}
            variant="fullWidth"
          >
            <Tab label="List" {...this.a11yProps(0)} />
            {
              this.props.invitations && this.props.invitations.received.length > 0 ?
                <Tab label={<Badge
                  badgeContent={this.props.invitations.received.length}
                  color="primary"
                  className={classes.badge}
                >Invitations</Badge>} {...this.a11yProps(1)} />
                : <Tab label="Invitations" {...this.a11yProps(1)} />
            }
          </Tabs>
          <ContactList
            value={this.state.currentTab}
            index={0}
            contacts={this.props.contacts}
            handleGoToChat={this.handleGoToChat}
            handleRemoveContact={this.handleRemoveContact}
            isFetching={this.props.isFetching}
          />
          <InvitationList
            value={this.state.currentTab}
            index={1}
            invitations={this.props.invitations}
            isFetching={this.props.isContactsFetching}
            acceptInvitation={this.handleAcceptInvitation}
            declineInvitation={this.handleDeclineInvitation}
          />
          <AddContactDialog
            open={this.state.contactDialogOpen}
            setOpen={this.handleAddContactModalOpen}
            userTyping={this.userTyping}
            login={this.state.login}
            contactList={this.props.usersList}
            chooseUser={this.chooseUser}
            isFetching={this.props.isDataFetching}
            message={this.state.inviteMessage}
            error={this.state.error}
            successMsg={this.state.success}
            handleSendInvitation={this.handleSendInvitation}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>Close</Button>
        </DialogActions>
        <Snackbar
          open={this.state.snackbar.open}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Alert
            onClose={this.handleSnackbarClose}
            severity={this.state.snackbar.type}
          >{this.state.snackbar.message}</Alert>
        </Snackbar>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContactsDialog));