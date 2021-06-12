import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const LeaveGroupDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      maxWidth='xs'
      onClose={() => props.setOpen('leave', false)}
      aria-labelledby="leave-group-dialog-title"
      aria-describedby="leave-group-dialog-description"
    >
      <DialogTitle id="leave-group-dialog-title">{'Leave group'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="leave-group-dialog-description">
          Are you sure you want to leave this group?
          {
            props.isOwner ? ' Someone from group members will be a group owner.' : null
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleLeaveGroup} color="primary">
          Yes
        </Button>
        <Button onClick={() => props.setOpen('leave', false)} color="primary"
                autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeaveGroupDialog;
