import React from 'react';
import AccountPreview from "./AccountPreview";
import GroupPreview from "./GroupPreview";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from "@material-ui/core/styles/withStyles";
import DeleteChatDialog from '../dialogs/DeleteChatDialog';
import DeleteContactDialog from "../dialogs/DeleteContactDialog";

const styles = theme => ({
  chatPreview: {
    backgroundColor: 'white',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.6)',
    zIndex: 10,
    minHeight: 72,
    [theme.breakpoints.down('md')]: {
      minHeight: 64,
    },
    display: 'flex',
    alignItems: 'center'
  },
  accountContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  menu: {
    '& ul': {
      padding: 0,
    },
  },
});


class ChatInfoBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      deleteChatDialogOpen: false,
      deleteContactDialogOpen: false,
    };

    this.handleSetOpenDialog = this.handleSetOpenDialog.bind(this);
  }

  componentDidMount() {
    this.props.handleCloseMenu();
  }

  handleSetOpenDialog = (type, open) => {
    switch (type) {
      case 'chat':
        this.setState({deleteChatDialogOpen: open});
        break;
      case 'contact':
        this.setState({deleteContactDialogOpen: open});
        break;
      default:
        break;
    }
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.chatPreview}>
        {
          this.props.getSelectedChatUserList(this.props.chatList).length === 1 &&
          this.props.chatList.find(_chat => _chat.chat_id === this.props.selectedChat).type === 'chat' ?
            <div className={classes.accountContainer}>
              <AccountPreview
                user={this.props.getSelectedChatUserList(this.props.chatList)[0]}
              />
              <IconButton onClick={this.props.handleOpenMenu}>
                <MoreVertIcon/>
              </IconButton>
              <Menu
                id="account-menu"
                open={Boolean(this.props.anchorMenu)}
                anchorEl={this.props.anchorMenu}
                onClose={this.props.handleCloseMenu}
                // className={classes.menu}
              >
                <MenuItem
                  className={classes.menuItem}
                  onClick={() => this.handleSetOpenDialog('chat', true)}
                >Remove chat</MenuItem>
                <MenuItem
                  onClick={() => this.handleSetOpenDialog('contact', true)}
                >Remove contact</MenuItem>
              </Menu>
            </div> : <GroupPreview
              users={this.props.getSelectedChatUserList(this.props.chatList)}
              chatTitle={this.props.chatList.filter(_chat => _chat.chat_id === this.props.selectedChat)[0].title}
              handleChatInfoOpen={this.props.handleChatInfoOpen}
              groupPhoto={this.props.chatList.find(_chat => _chat.chat_id === this.props.selectedChat).photo}
            />
        }
        <DeleteChatDialog
          open={this.state.deleteChatDialogOpen}
          setOpen={this.handleSetOpenDialog}
          handleRemoveChat={() => {
            this.props.handleRemoveChat();
            this.handleSetOpenDialog('chat', false);
          }}
        />
        <DeleteContactDialog
          open={this.state.deleteContactDialogOpen}
          setOpen={this.handleSetOpenDialog}
          handleRemoveContact={() => {
            this.props.handleRemoveContact();
            this.handleSetOpenDialog('contact', false);
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ChatInfoBar);