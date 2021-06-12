import React from 'react';
import Alert from '@material-ui/lab/Alert/Alert';
import TextField from '@material-ui/core/TextField/TextField';
import AccountPreview from '../AccountPreview/AccountPreview';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import CircularProgress
  from '@material-ui/core/CircularProgress/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const AddChat = (props) => {
  const {
    value,
    index
  } = props;

  const { classes } = props;

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
        <div>
          <TextField
            margin='dense'
            id='add-chat-login-input'
            label='Enter user login'
            fullWidth
            value={props.login}
            onChange={(e) => props.userTyping(e, 'add-chat-login')}
            autoComplete="off"
          />
          {
            props.usersList && props.login.length >= 3 ? <div
              className="users-list">
              {
                props.usersList.map((user, index) => <AccountPreview
                  key={index}
                  user={user}
                  className={classes.user}
                  handleClick={props.chooseUser}
                  selected={props.login === user.login}
                />)
              }
            </div> : null
          }
          {
            props.usersList &&
            props.usersList.length === 0 &&
            props.login.length >= 3 ? <ListItem>
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
};

export default withStyles(styles)(AddChat);
