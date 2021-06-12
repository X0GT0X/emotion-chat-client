import React from 'react';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import withStyles from '@material-ui/core/styles/withStyles';
import { checkUserStatus } from '../../actions/data';
import { socket } from '../../pages/Dashboard/Dashboard';
import {
  fetchUserChats,
  fetchUserGroups
} from '../../actions/chats';
import connect from 'react-redux/es/connect/connect';
import { API_PATH } from '../../utils/constants';
import PropTypes from 'prop-types';

let checked = false;

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: -1,
      left: -1,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))(Badge);

const mapStateToProps = (state) => ({
  token: state.auth.token,
  currentUser: state.auth.login
});

const mapDispatchToProps = (dispatch) => ({
  getChats: (token) => dispatch(fetchUserChats(token)),
  getGroups: (token) => dispatch(fetchUserGroups(token))
});

class AccountPreview extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      online: false
    };
  }

  componentDidMount () {
    if (this.props.user) {
      checkUserStatus(this.props.user.login, this.setStatus);
    }
    socket.on('user_status_changed', (data) => {
      if (this.props.user && data.user === this.props.user.login) {
        checkUserStatus(this.props.user.login, this.setStatus);
        this.props.getChats(this.props.token);
        this.props.getGroups(this.props.token);
      }
    });
  }

  componentWillUnmount () {
    socket.removeAllListeners('user_status_changed');
  }

  setStatus (status) {
    this.setState({ online: status });
  }

  checkTime (i) {
    return i < 10 ? ('0' + i) : i;
  }

  getTime (date) {
    const h = date.getHours();
    let m = date.getMinutes();

    m = this.checkTime(m);
    return h + ':' + m;
  }

  getTimeFormat (timestamp) {
    const date = new Date(parseInt(timestamp));
    const now = new Date();

    const isToday = new Date(date.getTime()).setHours(0, 0, 0, 0) === new Date(now.getTime()).setHours(0, 0, 0, 0);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (isToday) {
      return this.getTime(date);
    } else {
      if (date.getUTCFullYear() === now.getUTCFullYear()) {
        return months[date.getMonth()] + ' ' + date.getDate() + ', ' + this.getTime(date);
      } else {
        return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getUTCFullYear();
      }
    }
  }

  render () {
    const { classes } = this.props;

    const user = this.props.user;

    if (user) {
      if (!checked && this.props.currentUser === user.login) {
        checkUserStatus(user.login, this.setStatus);
        checked = true;
      }

      return (
        <ListItem
          className={this.props.handleClick ? classes.pointedListItem : classes.listItem}
          onClick={this.props.handleClick ? () => this.props.handleClick(user.login) : null}
          button={!!this.props.handleClick}
          selected={this.props.selected}
        >
          <ListItemAvatar>
            {
              this.state.online
                ? <div className={classes.avatarContainer}>
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    variant="dot"
                  >
                    {
                      user.profile_image
                        ? <Avatar
                          src={API_PATH + user.profile_image}
                          className={classes.avatar}
                        />
                        : <Avatar className={classes.avatar}>
                          {user.name.charAt(0).toUpperCase() + '' + (user.surname ? user.surname.charAt(0).toUpperCase() : '')}
                        </Avatar>
                    }
                  </StyledBadge>
                </div>
                : <div className={classes.avatarContainer}>
                  {
                    user.profile_image
                      ? <Avatar
                        src={API_PATH + user.profile_image}
                        className={classes.avatar}
                      />
                      : <Avatar className={classes.avatar}>
                        {user.name.charAt(0).toUpperCase() + '' + (user.surname ? user.surname.charAt(0).toUpperCase() : '')}
                      </Avatar>
                  }
                </div>
            }
          </ListItemAvatar>
          <ListItemText
            primary={
              <b>{user.name + ' ' + (user.surname ? user.surname : '')}</b>}
            secondary={
              <React.Fragment>
                {this.state.online ? user.login : ('Last seen: ' + this.getTimeFormat(user.last_seen))}
              </React.Fragment>
            }
          />
          {
            this.props.groupOwner && this.props.groupOwner === user.login
              ? <Badge
                color="primary"
                badgeContent="Owner"
                className={classes.owner}
              />
              : null
          }
        </ListItem>
      );
    } else {
      return null;
    }
  }
}

AccountPreview.propTypes = {
  classes: PropTypes.object,
  user: PropTypes.object,
  currentUser: PropTypes.object,
  groupOwner: PropTypes.func,
  token: PropTypes.string,
  getChats: PropTypes.func,
  getGroups: PropTypes.func,
  handleClick: PropTypes.func,
  selected: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountPreview));
