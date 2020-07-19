import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import connect from "react-redux/es/connect/connect";
import withStyles from "@material-ui/core/styles/withStyles";
import withWidth from '@material-ui/core/withWidth';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import {fetchUserChats, fetchUserGroups} from "../actions/chats";
import {API_PATH} from "../utils/constants";

const styles = theme => ({
  listItem: {
    position: 'relative',
    '&.Mui-selected': {
      backgroundColor: 'rgba(8, 116, 255, 0.2) !important'
    }
  },
  time: {
    fontSize: '12px',
    fontFamily: "'Roboto', sans-serif",
    position: 'absolute',
    right: '16px',
    top: '14px',
    color: theme.palette.text.secondary
  },
  avatarGroup: {
    marginLeft: '-35px',
    '&:first-child': {
      marginLeft: '-5px'
    }
  },
  avatarGroup3: {
    marginLeft: '-35px',
    '&:first-child': {
      marginLeft: '-8px'
    }
  },
  textGroup: {
    marginLeft: '8px',
  },
  textGroup3: {
    marginLeft: '6px',
  },
  notification: {
    position: 'absolute',
    right: '19px',
    top: '30px',
  },
  groupWithPhoto: {
    marginLeft: -3
  },
  listItemAvatar: {
    minWidth: 0
  }
});

function mapStateToProps(state) {
  return {
    isFetching: state.data.isFetching,
    token: state.auth.token,
    data: state.data.data,
  };
}

const mapDispatchToProps = (dispatch) => ({
  getChats: (token) => dispatch(fetchUserChats(token)),
  getGroups: (token) => dispatch(fetchUserGroups(token)),
});

class ContactItem extends React.Component {

  checkTime = (i) => i < 10 ? ("0" + i) : i;

  getTime(date) {
    let h = date.getHours();
    let m = date.getMinutes();

    m = this.checkTime(m);
    return h + ':' + m;
  }

  getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));

    let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    let weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

    return [d.getUTCFullYear(), weekNo];
  }

  getTimeFormat(date) {

    const now = new Date();
    const isToday = new Date(date.getTime()).setHours(0, 0, 0, 0) === new Date(now.getTime()).setHours(0, 0, 0, 0);
    const isThisWeek = this.getWeekNumber(date)[0] === this.getWeekNumber(now)[0] &&
      this.getWeekNumber(date)[1] === this.getWeekNumber(now)[1];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (isToday) return this.getTime(date);
    else if (isThisWeek) return days[date.getDay()];
    else {
      if (date.getUTCFullYear() === now.getUTCFullYear())
        return months[date.getMonth()] + ' ' + date.getDate();
      else return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getUTCFullYear();
    }

  }

  userIsSender = () => {
    try {
      if (this.props.data) {
        return this.props.data.login === this.props.lastMessage.sender.login;
      }
    }
    catch (e) {
      return false;
    }
    return false;
  };

  render() {
    const users = this.props.users;
    const {classes} = this.props;
    const messageSymbols = this.props.width === 'lg' ? 50 : 25;

    if (this.props.data && users)
      return (
        <ListItem className={classes.listItem} button selected={this.props.selected} onClick={this.props.onClick}>
          {
            this.props.type === 'chat' ? <ListItemAvatar className={classes.listItemAvatar}>
              <div className={classes.avatarContainer}>
                {
                  users[0].profile_image ? <Avatar
                      src={API_PATH + users[0].profile_image}
                    /> :
                    <Avatar className={classes.avatar}>
                      {users[0].name.charAt(0).toUpperCase() + '' + (users[0].surname ? users[0].surname.charAt(0).toUpperCase() : '')}
                    </Avatar>
                }
              </div>
            </ListItemAvatar> : <AvatarGroup max={2}>
              {
                this.props.groupPhoto ? <Avatar
                    src={API_PATH + this.props.groupPhoto}
                    className={classes.groupWithPhoto}
                  /> :
                  users.slice(0, 3).map((_usr, _idx) => <Avatar
                    key={_idx}
                    src={_usr.profile_image ? (API_PATH + _usr.profile_image) : null}
                    className={users.length < 3 ? classes.avatarGroup : classes.avatarGroup3}
                  >
                    {!_usr.profile_image ?
                      _usr.name.charAt(0).toUpperCase() + '' +
                      (_usr.surname ? _usr.surname.charAt(0).toUpperCase() : '') : null
                    }
                  </Avatar>)
              }
            </AvatarGroup>

          }
          <ListItemText
            primary={this.props.type === 'chat' ?
              <b>{users[0].name + ' ' + (users[0].surname ? users[0].surname : '')}</b> :
              <b>{this.props.chatTitle}</b>}
            secondary={
              <React.Fragment>
                {
                  this.props.lastMessage.message.substr(0, messageSymbols) + (this.props.lastMessage.message.length > messageSymbols ? '...' : '')
                }
              </React.Fragment>
            }
            className={users.length < 3 && users.length > 1 ? classes.textGroup : classes.textGroup3}
          />

          <span className={classes.time}>
                        {
                          this.props.lastMessage.timestamp ?
                            this.getTimeFormat(new Date(parseInt(this.props.lastMessage.timestamp)))
                            : null
                        }
                    </span>
          {
            this.props.type === 'chat' && !this.props.receiverHasRead && !this.userIsSender() && this.props.lastMessage.message.length > 0 ?
              <NotificationImportantIcon color="primary" className={classes.notification}/> : null
          }
          {
            this.props.type === 'group' && !this.userIsSender() &&
            this.props.receivers.find(_usr => _usr.login === this.props.data.login) ?
              <NotificationImportantIcon
                color="primary"
                className={classes.notification}
              /> : null
          }
        </ListItem>
      );
    else return null;
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(withStyles(styles)(ContactItem)));