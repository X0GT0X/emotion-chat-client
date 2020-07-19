import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from "@material-ui/core";
import {API_PATH} from "../utils/constants";

const useStyles = makeStyles(theme => ({
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
  avatar: {
    // border: '2px solid',
    borderColor: theme.palette.text.disabled,
  },
  button: {
    padding: 0
  },
}));


export default function InvitationPreview(props) {

  const user = props.data.sender;
  const styles = useStyles();

  if (user)
    return (
      <ListItem
        className={styles.listItem}
      >
        <ListItemAvatar>
          {
            user.profile_image ? <Avatar
                src={API_PATH + user.profile_image}
                className={styles.avatar}
              /> :
              <Avatar className={styles.avatar}>
                {user.name.charAt(0).toUpperCase() + '' + (user.surname ? user.surname.charAt(0).toUpperCase() : '')}
              </Avatar>
          }
        </ListItemAvatar>
        <ListItemText
          primary={<b>{user.name + ' ' + (user.surname ? user.surname : '')}</b>}
          secondary={
            <React.Fragment>
              {props.data.message}
            </React.Fragment>
          }
        />
        <IconButton className={styles.button} onClick={props.handleAccept}>
          <DoneIcon color="primary"/>
        </IconButton>
        <IconButton className={styles.button} onClick={props.handleDecline}>
          <CloseIcon/>
        </IconButton>
      </ListItem>
    );
  else return null;
}