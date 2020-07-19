import React from 'react';
import styles from './styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ContactsIcon from '@material-ui/icons/Contacts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ContactItem from "../ContactItem";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions/chats";
import connect from "react-redux/es/connect/connect";
import AccountPreview from "../AccountPreview";
import Badge from '@material-ui/core/Badge';
import withWidth from "@material-ui/core/withWidth/withWidth";
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

function mapStateToProps(state) {
  return {
    isFetching: state.chats.isFetching,
    loaded: state.chats.loaded,
    chats: state.chats.chats,
    userLogin: state.auth.login,
    invitations: state.contacts.invitations,
    sidebarOpen: state.chats.sidebarOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

class Sidebar extends React.Component {

  render() {
    const {classes} = this.props;

    return (
      <Drawer
        anchor="left"
        open={this.props.sidebarOpen}
        onClose={() => this.props.handleToggleSidebar(false)}
        className={'sidebar ' + classes.drawer}
        variant={this.props.width === 'xs' ? 'temporary' : 'permanent'}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={this.props.width === 'lg' ? classes.toolbar : classes.minifiedToolbar}>
          <IconButton onClick={() => this.props.handleToggleSidebar(false)} className={classes.button}>
            <ChevronLeftIcon/>
          </IconButton>
          <Divider className={classes.divider}/>
        </div>
        <Button
          fullWidth
          color='primary'
          className={classes.addChatBtn}
          onClick={this.props.newChatBtnHandle}
        >Add New Chat</Button>

        <List className={classes.sidebarTop}>
          {
            this.props.chatList ?
              this.props.chatList.sort((chatA, chatB) =>
                parseFloat(chatB.lastUpdate) - parseFloat(chatA.lastUpdate))
                .map((chat, index) => (
                  <ContactItem
                    key={index}
                    type={chat.type}
                    chatTitle={chat.title}
                    lastMessage={chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : {message: ''}}
                    users={chat.users.filter(_user => _user.login !== this.props.userLogin)}
                    selected={this.props.selectedChatIndex === chat.chat_id}
                    onClick={() => {
                      this.props.handleToggleSidebar(false);
                      this.props.selectChatHandle(chat.chat_id, this.props.chatList)
                    }}
                    receiverHasRead={chat.receiverHasRead}
                    receivers={chat.receivers}
                    groupPhoto={chat.type === 'group' ? chat.photo : null}
                  />
                )) : null
          }
        </List>

        <div className='sidebar-down'>
          <Divider/>
          <AccountPreview
            user={this.props.user}
            currentUser={this.props.userLogin}
          />
          <List className={classes.sidebarDown}>
            <ListItem button onClick={this.props.accountHandleClick}>
              <ListItemIcon><AccountCircleIcon/></ListItemIcon>
              <ListItemText primary="My Account"/>
            </ListItem>
            <ListItem button onClick={this.props.contactsHandleClick}>
              <ListItemIcon><ContactsIcon/></ListItemIcon>
              <ListItemText primary="Contacts"/>
              {
                this.props.invitations && this.props.invitations.received.length > 0 ? <Badge
                  badgeContent={this.props.invitations.received.length}
                  color="primary"
                  className={classes.badge}
                /> : null
              }
            </ListItem>
            <ListItem button onClick={this.props.logOutHandleClick}>
              <ListItemIcon><ExitToAppIcon/></ListItemIcon>
              <ListItemText primary="Log Out"/>
            </ListItem>
          </List>
        </div>
      </Drawer>
    );

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(withStyles(styles)(Sidebar)));