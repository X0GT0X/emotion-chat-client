import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import { API_PATH } from '../../utils/constants';
import styles from './styles';

const GroupPreview = (props) => {

  const users = props.users;
  const { classes } = props;

  if (users.length > 0) {
    return (
      <ListItem className={classes.listItem}>
        <AvatarGroup max={2}>
          {
            props.groupPhoto ? <Avatar
                src={API_PATH + props.groupPhoto}
              /> :
              users.slice(0, 3).map((_usr, _idx) => <Avatar
                key={_idx}
                src={_usr.profile_image ? (API_PATH + _usr.profile_image) : null}
                className={classes.group3}
              >
                {!_usr.profile_image ?
                  _usr.name.charAt(0).toUpperCase() + '' +
                  (_usr.surname ? _usr.surname.charAt(0).toUpperCase() : '') : null
                }
              </Avatar>)
          }
        </AvatarGroup>
        <ListItemText
          primary={<b className={classes.title}>{props.chatTitle}</b>}
        />
        <IconButton color="primary" aria-label="info"
                    onClick={props.handleChatInfoOpen}>
          <InfoOutlinedIcon/>
        </IconButton>
      </ListItem>
    );
  } else {
    return null;
  }
};

export default withStyles(styles)(GroupPreview);
