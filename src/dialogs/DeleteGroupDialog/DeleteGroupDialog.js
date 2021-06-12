import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteGroupDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen('delete', false)}
      aria-labelledby="delete-group-dialog-title"
      aria-describedby="delete-group-dialog-description"
    >
      <DialogTitle id="delete-group-dialog-title">{"Delete group"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delte-group-dialog-description">
          Are you sure you want to delete this group?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleRemoveGroup} color="primary">
          Ok
        </Button>
        <Button onClick={() => props.setOpen('delete', false)} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteGroupDialog;
