import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField/TextField';
import AccountPreview from '../../components/AccountPreview/AccountPreview';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import CircularProgress
  from '@material-ui/core/CircularProgress/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import Alert from '@material-ui/lab/Alert/Alert';

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
  error: {
    marginTop: '15px'
  },
});

const AddContactDialog = (props) => {

  const handleClose = () => {
    props.setOpen(false);
  };

  const { classes } = props;

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="add-contact-dialog-title"
      aria-describedby="add-contact-dialog-description"
      maxWidth='xs'
      fullWidth={true}
    >
      <DialogTitle id="add-contact-dialog-title">{'Add contact'}</DialogTitle>
      <DialogContent>
        <div>
          {
            props.successMsg ?
              <Alert severity="success" className={classes.error}>
                {props.successMsg}
              </Alert> : null
          }
          {
            props.error ?
              <Alert severity="error" className={classes.error}>
                {props.error}
              </Alert> : null
          }
          <TextField
            margin='dense'
            id='add-contact-login-input'
            label='Enter user login'
            fullWidth
            value={props.login}
            onChange={(e) => props.userTyping(e, 'login')}
            autoComplete="off"
          />
          {
            props.contactList && props.login.length >= 3 ? <div
              className="users-list">
              {
                props.contactList.map((user, index) => <AccountPreview
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
            props.contactList &&
            props.contactList.length === 0 &&
            props.login.length >= 3 ? <ListItem>
              <ListItemText
                secondary={'User with this login does not exist or ' +
                'you already have this user in your contact list.'}
              />
            </ListItem> : null
          }
          {
            props.isFetching ? <div className={classes.progress}>
              <CircularProgress color="primary"/>
            </div> : null
          }
          <TextField
            margin='dense'
            id='add-contact-message-input'
            label='Enter message'
            fullWidth
            value={props.message}
            onChange={(e) => props.userTyping(e, 'message')}
            autoComplete="off"
            maxLength={50}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleSendInvitation} color="primary">
          Send
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(AddContactDialog);
