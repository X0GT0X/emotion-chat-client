import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import Chip from '@material-ui/core/Chip';
import {API_PATH} from "../utils/constants";

const styles = theme => ({
  avatar: {
    width: 100,
    height: 100,
    fontSize: '2.25rem',
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    cursor: 'pointer',
    position: 'relative',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    paddingLeft: 15
  },
  chip: {
    marginTop: 5
  },
  actions: {
    '& button': {
      marginLeft: '0 !important',
    }
  },
});

function UserInfoDialog(props) {

  const handleClose = () => {
    props.setOpen('user-info', false);
  };

  const {classes} = props;

  let contacts_login = [];
  for (let i = 0; i < props.contacts.length; i++) {
    contacts_login.push(props.contacts[i].login);
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="user-info-dialog-title"
      aria-describedby="user-info-dialog-description"
    >
      <DialogContent>
        <div className={classes.userInfo}>
          {
            props.data.profile_image ? <Avatar
                className={classes.avatar}
                src={API_PATH + props.data.profile_image}
              /> :
              <Avatar className={classes.avatar}>
                {
                  (props.data.name ? props.data.name.charAt(0).toUpperCase() : '') + '' +
                  (props.data.surname ? props.data.surname.charAt(0).toUpperCase() : '')
                }
              </Avatar>
          }
          <div className={classes.info}>
            <Typography component='h5' variant='h5'>{props.data.name + ' ' + props.data.surname}</Typography>
            <Typography variant='body1'>Login: {props.data.login}</Typography>
            {
              contacts_login.includes(props.data.login) ? <Chip
                variant="outlined"
                color="primary"
                size="small"
                label="Your contact"
                className={classes.chip}
              /> : null
            }
          </div>
        </div>
      </DialogContent>
      <DialogActions className={classes.actions}>
        {
          contacts_login.includes(props.data.login) ? <div>
            <Button onClick={() => {
              props.handleGoToChat();
              handleClose();
            }} color="primary">
              Go to chat
            </Button>
            <Button onClick={props.handleRemoveContact} color="secondary">
              Delete
            </Button>
          </div> : <Button onClick={props.handleAddContact} color="primary">
            Add contact
          </Button>
        }
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(UserInfoDialog);