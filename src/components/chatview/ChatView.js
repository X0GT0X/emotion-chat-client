import React from 'react';
import styles from './styles';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions/chats";
import connect from "react-redux/es/connect/connect";
import {API_PATH} from "../../utils/constants";

function mapStateToProps(state) {
  return {
    userLogin: state.auth.login
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const checkTime = (i) => i < 10 ? ("0" + i) : i;

function getTimeFormat(date) {

  const now = new Date();
  const isToday = new Date(date.getTime()).setHours(0, 0, 0, 0) === new Date(now.getTime()).setHours(0, 0, 0, 0);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  if (isToday) return 'Today';
  else {
    if (date.getUTCFullYear() === now.getUTCFullYear())
      return months[date.getMonth()] + ' ' + date.getDate();
    else return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getUTCFullYear();
  }

}

class ChatView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      anchorMenu: null,
      removeTarget: null,
    };

    this.getMessageClasses = this.getMessageClasses.bind(this);

  }

  componentDidMount() {
    const container = document.getElementById('chatview-container');
    if (container) container.scrollTo(0, container.scrollHeight);
    this.handleCloseMessageMenu();
  }

  componentDidUpdate() {
    const container = document.getElementById('chatview-container');
    if (container) container.scrollTo(0, container.scrollHeight);
  }

  getTime(date) {
    let h = date.getHours();
    let m = date.getMinutes();

    m = checkTime(m);
    return h + ':' + m;
  }

  setDivider(msg, index) {
    if (index !== 0) {
      const currentMessageDate = new Date(parseInt(msg.timestamp)).setHours(0, 0, 0, 0);
      const prevMessageDate = new Date(parseInt(this.props.chat.messages[index - 1].timestamp)).setHours(0, 0, 0, 0);

      let result = null;

      if (currentMessageDate !== prevMessageDate)
        result = getTimeFormat(new Date(parseInt(msg.timestamp)));
      return result;
    }
    else {
      const currentMessageDate = new Date(parseInt(msg.timestamp));
      return getTimeFormat(currentMessageDate);
    }
  }

  setAvatar(msg, index) {
    if (index + 1 < this.props.chat.messages.length) {
      const currentSender = msg.sender.login;
      const nextSender = this.props.chat.messages[index + 1].sender.login;
      return currentSender !== nextSender;
    }
    else return true;
  }

  handleOpenMessageMenu = (e, message) => {
    this.setState({
      anchorMenu: e.currentTarget,
      removeTarget: message.id
    });
  };

  handleCloseMessageMenu = () => {
    this.setState({
      anchorMenu: null,
      removeTarget: null,
    });
  };

  getMessageClasses = (senderLogin, emotion) => {
    let classNames = [];

    const {classes} = this.props;

    if (senderLogin === this.props.userLogin) {
      classNames.push(classes.userSent)
    }
    else {
      classNames.push(classes.friendSent)
    }

    classNames.push(classes[emotion]);

    return classNames.join(' ').toString();
  };

  render() {

    const {classes} = this.props;
    let messages = [...this.props.messages];

    return (
      <div id='chatview-container' className={classes.content}>
        <main>
          {
            messages.filter(_msg => _msg !== null).map((_msg, _index) => <div
              className={this.setDivider(_msg, _index) ? classes.messageContainer : null} key={_index}>
              {this.setDivider(_msg, _index) ? <div className={classes.divider}>
                <Typography component='p' variant='body1' className={classes.dividerDate}>
                  {this.setDivider(_msg, _index)}
                </Typography>
              </div> : null}
              <div
                className={_msg.sender.login === this.props.userLogin ? classes.messageGroupUser : classes.messageGroupFriend}>
                {
                  this.setAvatar(_msg, _index) && _msg.sender.login !== this.props.userLogin ?
                    <div className={classes.avatar}>
                      {
                        _msg.sender.profile_image ? <Avatar
                            src={API_PATH + _msg.sender.profile_image}
                          /> :
                          <Avatar>
                            {_msg.sender.name.charAt(0).toUpperCase() + '' + (_msg.sender.surname ? _msg.sender.surname.charAt(0).toUpperCase() : '')}
                          </Avatar>
                      }
                    </div> : <span className={classes.noAvatar}/>
                }
                <div className={_msg.sender.login === this.props.userLogin ? classes.btnContainer : null}>
                  {
                    _msg.sender.login === this.props.userLogin && !_msg.loading ? <IconButton
                      className={classes.moreBtn}
                      onClick={(e) => this.handleOpenMessageMenu(e, _msg)}
                    >
                      <MoreVertIcon/>
                    </IconButton> : null
                  }
                  {
                    _msg.loading ? <CircularProgress className={classes.loader}/> : null
                  }
                  <div
                    key={_index}
                    className={this.getMessageClasses(_msg.sender.login, _msg.emotion)}
                  >
                    {_msg.message}
                    <span className={classes.time}>{this.getTime(new Date(parseInt(_msg.timestamp)))}</span>
                  </div>
                </div>
              </div>
            </div>)
          }
          <Menu
            open={Boolean(this.state.anchorMenu)}
            anchorEl={this.state.anchorMenu}
            onClose={this.handleCloseMessageMenu}
            className={classes.menu}
          >
            <MenuItem
              onClick={() => {
                this.props.handleRemoveMessage(this.state.removeTarget);
                this.handleCloseMessageMenu();
              }}>Remove</MenuItem>
          </Menu>
        </main>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatView));