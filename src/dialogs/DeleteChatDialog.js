import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function DeleteChatDialog(props) {

  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen('chat', false)}
      aria-labelledby="delete-chat-dialog-title"
      aria-describedby="delete-chat-dialog-description"
    >
      <DialogTitle id="delete-chat-dialog-title">{"Delete chat"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-chat-dialog-description">
          Are you sure you want to delete this chat?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleRemoveChat} color="primary">
          Ok
        </Button>
        <Button onClick={() => props.setOpen('chat', false)} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteChatDialog;