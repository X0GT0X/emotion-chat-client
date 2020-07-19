import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from "@material-ui/core";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import {API_PATH} from "../utils/constants";

const useStyles = makeStyles(theme => ({
  listItem: {
    position: 'relative',
    '&.Mui-selected': {
      backgroundColor: 'rgba(8, 116, 255, 0.2) !important'
    }
  },
  group3: {
    marginLeft: '-35px',
    '&:first-child': {
      marginLeft: '-8px'
    }
  },
  title: {
    fontSize: '18px',
    marginLeft: '5px',
    fontWeight: 500
  },
}));


export default function GroupPreview(props) {

  const users = props.users;
  const styles = useStyles();

  if (users.length > 0)
    return (
      <ListItem className={styles.listItem}>
        <AvatarGroup max={2}>
          {
            props.groupPhoto ? <Avatar
                src={API_PATH + props.groupPhoto}
              /> :
              users.slice(0, 3).map((_usr, _idx) => <Avatar
                key={_idx}
                src={_usr.profile_image ? (API_PATH + _usr.profile_image) : null}
                className={styles.group3}
              >
                {!_usr.profile_image ?
                  _usr.name.charAt(0).toUpperCase() + '' +
                  (_usr.surname ? _usr.surname.charAt(0).toUpperCase() : '') : null
                }
              </Avatar>)
          }
        </AvatarGroup>
        <ListItemText
          primary={<b className={styles.title}>{props.chatTitle}</b>}
        />
        <IconButton color="primary" aria-label="info" onClick={props.handleChatInfoOpen}>
          <InfoOutlinedIcon/>
        </IconButton>
      </ListItem>
    );
  else return null;
}