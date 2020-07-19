import React from "react";
import Alert from "@material-ui/lab/Alert/Alert";
import TextField from "@material-ui/core/TextField/TextField";
import AccountPreview from "./AccountPreview";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import {API_PATH} from "../utils/constants";

const styles = theme => ({
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15px',
  },
  user: {
    cursor: 'pointer',
  },
  list: {
    maxHeight: '216px',
    overflowY: 'auto',
  },
  label: {
    fontSize: '16px',
    marginTop: '10px',
  },
  chip: {
    marginRight: '3px',
  },
  error: {
    marginTop: 15
  },
});

function AddGroup(props) {
  const {value, index} = props;

  const {classes} = props;

  return (
    <div
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <div>
        {
          props.error ?
            <Alert severity="error" className={classes.error}>
              {props.error}
            </Alert> : null
        }
        {
          props.validation ?
            <Alert severity="error" className={classes.error}>
              {props.validation}
            </Alert> : null
        }
        <div>
          <TextField
            margin='dense'
            id='add-group-title-input'
            label='Title'
            fullWidth
            value={props.chatTitle}
            onChange={(e) => props.userTyping(e, 'title')}
            autoComplete="off"
          />
          {
            props.groupUserList.length > 0 ? <div>
              <Typography className={classes.label} component='h6' variant='h6'>User list:</Typography>
              {
                props.groupUserList.map((user, index) => <Chip
                  key={index}
                  className={classes.chip}
                  avatar={
                    user.profile_image ? <Avatar
                      src={API_PATH + user.profile_image}
                    /> : <Avatar>
                      {
                        (user.name ? user.name.charAt(0).toUpperCase() : '') + '' +
                        (user.surname ? user.surname.charAt(0).toUpperCase() : '')
                      }
                    </Avatar>
                  }
                  label={user.name + ' ' + user.surname}
                  variant="outlined"
                  onDelete={() => props.removeUserFromList(user.login)}
                />)
              }
            </div> : null
          }
          <TextField
            margin='dense'
            id='add-group-login-input'
            label='Filter by user name'
            fullWidth
            value={props.login}
            onChange={(e) => props.userTyping(e, 'add-group-login')}
            autoComplete="off"
          />
          {
            props.contactList ? <div className={classes.list}>
              {
                props.contactList.sort((contactA, contactB) =>
                  contactA.name < contactB.name ? -1 : 1)
                  .filter(contact => (contact.name + ' ' + contact.surname).toLowerCase()
                    .includes(props.login.toLowerCase()))
                  .filter(contact => !props.userInList(contact))
                  .map((user, index) => <AccountPreview
                    key={index}
                    user={user}
                    className={classes.user}
                    handleClick={() => props.addUserToList(user)}
                    selected={false}
                  />)
              }
            </div> : null
          }
          {
            props.contactList &&
            props.contactList.length === 0 ? <ListItem>
              <ListItemText
                secondary={'User with this login does not exist or ' +
                'you already have a chat with this user.'}
              />
            </ListItem> : null
          }
          {
            props.isFetching ? <div className={classes.progress}>
              <CircularProgress color="primary"/>
            </div> : null
          }
        </div>
      </div>
      }
    </div>
  );
}

export default withStyles(styles)(AddGroup);