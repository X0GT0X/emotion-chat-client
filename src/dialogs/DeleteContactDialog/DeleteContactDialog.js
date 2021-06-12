import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const DeleteContactDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen('contact', false)}
      aria-labelledby="delete-contact-dialog-title"
      aria-describedby="delete-contact-dialog-description"
    >
      <DialogTitle id="delete-contact-dialog-title">{"Delete contact"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-contact-dialog-description">
          Are you sure you want to delete this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleRemoveContact} color="primary">
          Ok
        </Button>
        <Button onClick={() => props.setOpen('contact', false)} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteContactDialog;
