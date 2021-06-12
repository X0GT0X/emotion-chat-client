import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { API_PATH } from '../../utils/constants';
import styles from './styles';

const InvitationPreview = (props) => {

  const user = props.data.sender;
  const { classes } = props;

  if (user) {
    return (
      <ListItem
        className={classes.listItem}
      >
        <ListItemAvatar>
          {
            user.profile_image ? <Avatar
                src={API_PATH + user.profile_image}
                className={classes.avatar}
              /> :
              <Avatar className={classes.avatar}>
                {user.name.charAt(0).toUpperCase() + '' + (user.surname ? user.surname.charAt(0).toUpperCase() : '')}
              </Avatar>
          }
        </ListItemAvatar>
        <ListItemText
          primary={
            <b>{user.name + ' ' + (user.surname ? user.surname : '')}</b>}
          secondary={
            <React.Fragment>
              {props.data.message}
            </React.Fragment>
          }
        />
        <IconButton className={classes.button} onClick={props.handleAccept}>
          <DoneIcon color="primary"/>
        </IconButton>
        <IconButton className={classes.button} onClick={props.handleDecline}>
          <CloseIcon/>
        </IconButton>
      </ListItem>
    );
  } else {
    return null;
  }
};

export default withStyles(styles)(InvitationPreview);
