import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Drawer from "@material-ui/core/Drawer/Drawer";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import AccountPreview from "./AccountPreview";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ContactsIcon from '@material-ui/icons/Contacts';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import connect from "react-redux/es/connect/connect";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  fetchUserGroups,
  updateGroupTitle,
  updateGroupPhoto,
  updateGroupMembers
} from "../actions/chats";
import Button from '@material-ui/core/Button';
import DeleteGroupDialog from "../dialogs/DeleteGroupDialog";
import UserInfoDialog from "../dialogs/UserInfoDialog";
import DeleteContactDialog from "../dialogs/DeleteContactDialog";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import LeaveGroupDialog from "../dialogs/LeaveGroupDialog";
import EditPhotoDialog from "../dialogs/EditPhotoDialog";
import ManageMembersDialog from "../dialogs/ManageMembersDialog";
import withWidth from "@material-ui/core/withWidth/withWidth";
import {API_PATH} from "../utils/constants";

const drawerWidth = 350;
const styles = theme => ({
  drawer: {
    width: drawerWidth,
    [theme.breakpoints.down('md')]: {
      width: drawerWidth - 50,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 64,
    [theme.breakpoints.down('md')]: {
      marginTop: 48,
      width: drawerWidth - 50,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.text.disabled
  },
  chatInfo: {},
  avatar: {
    width: 150,
    height: 150,
    fontSize: '3rem',
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    cursor: 'pointer',
    position: 'relative',
    backgroundColor: theme.palette.secondary,
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0',
  },
  title: {
    textAlign: 'center',
    margin: '0 auto 20px',
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16,
    display: 'inline',
    '&:hover button': {
      display: 'block',
    },
  },
  userList: {
    padding: 0,
    maxHeight: 360,
    overflowY: 'auto',
  },
  listLabel: {
    fontWeight: 400,
    paddingLeft: 15,
    position: 'relative',
    paddingRight: 16,
    display: 'inline',
    marginRight: 'auto',
    '&:hover button': {
      display: 'block',
    },
  },
  editBtn: {
    color: theme.palette.text.disabled,
    position: 'absolute',
    right: -10,
    top: '50%',
    transform: 'translateY(-50%)',
    padding: 0,
    display: 'none',
    '&:hover': {
      display: 'block',
      backgroundColor: 'transparent',
    },
  },
  titleEditField: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px',
  },
  iconBtn: {
    padding: 0,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  deleteBtn: {
    color: 'red',
  },
});

const mapStateToProps = (state) => ({
  currentUser: state.auth.login,
  contacts: state.contacts.contacts,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  updateGroupTitle: (id, title) => dispatch(updateGroupTitle(id, title)),
  getGroups: (token) => dispatch(fetchUserGroups(token)),
  updateGroupPhoto: (token, data, chat) => dispatch(updateGroupPhoto(token, data, chat)),
  updateGroupMembers: (chat, users) => dispatch(updateGroupMembers(chat, users)),
});

class ChatInfoPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
      title: '',
      deleteGroupDialogOpen: false,
      selectedUser: null,
      userInfoOpen: false,
      deleteContactDialogOpen: false,
      leaveGroupDialogOpen: false,
      editPhotoDialogOpen: false,
      manageMembersDialogOpen: false,
      snackbar: {
        type: '',
        message: '',
        open: false,
      },
    };

    this.hanldeToggleEditTitle = this.hanldeToggleEditTitle.bind(this);
    this.handleUpdateTitle = this.handleUpdateTitle.bind(this);
    this.handleRemoveGroup = this.handleRemoveGroup.bind(this);
    this.handleLeaveGroup = this.handleLeaveGroup.bind(this);
    this.handleShowSnackbar = this.handleShowSnackbar.bind(this);

  }

  componentDidMount() {
    this.setSocketListeners();
  }

  setSocketListeners() {
    this.props.socket.on('invitation_sent', data => {
      if (this.props.currentUser === data.sender) {
        this.handleShowSnackbar('success', data.message);
        this.setOpen('user-info', false);
      }
    });
    this.props.socket.on('invitation_error', data => {
      if (this.props.currentUser === data.sender) {
        this.handleShowSnackbar('error', data.error);
        this.setOpen('user-info', false);
      }
    });
    this.props.socket.on('group_left', data => {
      if (this.props.currentUser === data.user) {
        this.handleShowSnackbar('success', data.message);
        this.setOpen('leave', false);
        this.props.selectChat(null);
      }
      if (data.users.includes(this.props.currentUser)) {
        this.props.getGroups(this.props.token);
      }
    });
    this.props.socket.on('leave_group_error', data => {
      if (this.props.currentUser === data.user) {
        this.handleShowSnackbar('error', data.error);
        this.setOpen('leave', false);
      }
    });
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

  hanldeToggleEditTitle = () => this.setState({
    title: this.props.selectedChat.title,
    isEditMode: !this.state.isEditMode
  });

  handleUpdateTitle() {
    this.props.updateGroupTitle(this.props.selectedChat.chat_id, this.state.title);
    this.hanldeToggleEditTitle();
  }

  handleRemoveGroup = () => {
    this.props.handleRemoveGroup(this.props.selectedChat.chat_id);
    this.setOpen('delete', false);
  };

  handleLeaveGroup = () => {
    const data = {
      'chat_id': this.props.selectedChat.chat_id,
      'user': this.props.currentUser,
    };
    this.props.socket.emit('leave_group', data);
  };

  handleSendInvitation(receiver) {
    const invitation = {
      'sender': this.props.currentUser,
      'receiver': receiver,
      'message': ''
    };

    this.props.socket.emit('send_invitation', invitation);
  }

  setOpen = (type, open) => {
    switch (type) {
      case 'delete':
        this.setState({deleteGroupDialogOpen: open});
        break;
      case 'leave':
        this.setState({leaveGroupDialogOpen: open});
        break;
      case 'photo':
        this.setState({editPhotoDialogOpen: open});
        break;
      case 'user-info':
        this.setState({userInfoOpen: open});
        break;
      case 'contact':
        this.setState({deleteContactDialogOpen: open});
        break;
      case 'manage-members':
        this.setState({manageMembersDialogOpen: open});
        break;
      default:
        break;
    }
  };

  handleUpdatePhoto = (data) => {
    this.props.updateGroupPhoto(this.props.token, data, this.props.selectedChat.chat_id);
  };

  handleSaveGroupMembers = (users) => {

    let users_login = [];

    for (let i = 0; i < users.length; i++) {
      users_login.push(users[i].login);
    }
    this.props.updateGroupMembers(this.props.selectedChat.chat_id, {users: users_login});
    this.setOpen('manage-members', false);

  };

  render() {
    const {classes} = this.props;

    if (this.props.selectedChat) {
      let users = [...this.props.selectedChat.users];

      return (
        <Drawer
          variant={this.props.width !== 'lg' ? 'temporary' : 'persistent'}
          anchor="right"
          open={this.props.open}
          onClose={() => this.props.handleToggle(false)}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.chatInfo}>
            {
              this.props.selectedChat.type === 'group' ? <div className={classes.container}>
                <div className={classes.avatarContainer}>
                  <Tooltip title="Click to add new photo">
                    {
                      this.props.selectedChat.photo ? <Avatar
                          className={classes.avatar}
                          src={API_PATH + this.props.selectedChat.photo}
                          onClick={() => this.setOpen('photo', true)}
                        /> :
                        <Avatar className={classes.avatar} onClick={() => this.setOpen('photo', true)}>
                          {this.props.selectedChat.title.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                  </Tooltip>
                </div>
                {
                  !this.state.isEditMode ? <Typography variant="h5" component="h3" className={classes.title}>
                    {this.props.selectedChat.title}
                    <IconButton className={classes.editBtn}
                                onClick={this.hanldeToggleEditTitle}><EditIcon/></IconButton>
                  </Typography> : <div className={classes.titleEditField}>
                    <TextField
                      value={this.state.title}
                      onChange={(e) => this.setState({title: e.target.value})}
                      margin='dense'
                      id='group-title-input'
                      label='Title'
                      fullWidth
                      autoComplete="off"
                    />
                    <IconButton
                      onClick={this.handleUpdateTitle}
                      color="primary"
                      className={classes.iconBtn}
                    >
                      <DoneIcon/>
                    </IconButton>
                    <IconButton
                      onClick={this.hanldeToggleEditTitle}
                      className={classes.iconBtn}
                    >
                      <CloseIcon/>
                    </IconButton>
                  </div>
                }

                <Typography variant="h6" component="h6" className={classes.listLabel}>
                  Members:
                  <IconButton onClick={() => this.setOpen('manage-members', true)}
                              className={classes.editBtn}><ContactsIcon/></IconButton>
                </Typography>
                <List className={classes.userList}>
                  {
                    users.sort((userA, userB) =>
                      userA.name < userB.name ? -1 : 1).map((user, index) => <AccountPreview
                      key={index}
                      user={user}
                      handleClick={() => {
                        if (user.login !== this.props.currentUser) {
                          this.setState({selectedUser: user});
                          this.setOpen('user-info', true);
                        }
                      }}
                      groupOwner={this.props.selectedChat.owner}
                    />)
                  }
                </List>
                <Divider/>
                {
                  users.length > 1 ? <Button
                    className={classes.deleteBtn}
                    onClick={() => this.setOpen('leave', true)}
                  >
                    Leave Group
                  </Button> : null
                }
                {
                  this.props.currentUser === this.props.selectedChat.owner ? <Button
                    className={classes.deleteBtn}
                    onClick={() => this.setOpen('delete', true)}
                  >
                    Delete Group
                  </Button> : null
                }
                {
                  this.state.selectedUser ? <UserInfoDialog
                    open={this.state.userInfoOpen}
                    setOpen={this.setOpen}
                    data={this.state.selectedUser}
                    contacts={this.props.contacts}
                    handleGoToChat={() => this.props.handleGoToChat(this.state.selectedUser.login)}
                    handleRemoveContact={() => this.setOpen('contact', true)}
                    handleAddContact={() => this.handleSendInvitation(this.state.selectedUser.login)}
                  /> : null
                }
                <DeleteContactDialog
                  open={this.state.deleteContactDialogOpen}
                  setOpen={this.setOpen}
                  handleRemoveContact={() => {
                    this.props.handleRemoveContact(this.state.selectedUser);
                    this.setOpen('contact', false);
                    this.setOpen('user-info', false);
                  }}
                />
              </div> : null
            }
          </div>
          <DeleteGroupDialog
            open={this.state.deleteGroupDialogOpen}
            setOpen={this.setOpen}
            handleRemoveGroup={this.handleRemoveGroup}
          />
          <LeaveGroupDialog
            open={this.state.leaveGroupDialogOpen}
            setOpen={this.setOpen}
            handleLeaveGroup={this.handleLeaveGroup}
            isOwner={this.props.currentUser === this.props.selectedChat.owner}
          />
          <EditPhotoDialog
            open={this.state.editPhotoDialogOpen}
            setOpen={(open) => this.setOpen('photo', open)}
            handleUpdatePhoto={this.handleUpdatePhoto}
          />
          <ManageMembersDialog
            open={this.state.manageMembersDialogOpen}
            setOpen={this.setOpen}
            userList={users}
            owner={this.props.selectedChat.owner}
            currentUser={this.props.currentUser}
            contactList={this.props.contacts}
            handleSaveGroupMembers={this.handleSaveGroupMembers}
          />
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
        </Drawer>
      );
    }
    else {
      return null;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(withStyles(styles)(ChatInfoPanel)));