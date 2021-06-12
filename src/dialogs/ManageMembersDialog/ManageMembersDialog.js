import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography/Typography';
import Chip from '@material-ui/core/Chip';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import TextField from '@material-ui/core/TextField/TextField';
import AccountPreview from '../../components/AccountPreview/AccountPreview';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { API_PATH } from '../../utils/constants';

const styles = theme => ({
  label: {
    fontSize: '16px',
    marginTop: '10px',
  },
  chip: {
    marginRight: 3,
    marginBottom: 3
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  contactList: {
    maxHeight: '216px',
    overflowY: 'auto',
  },
});

class ManageMembersDialog extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      users: [],
      search: '',
    };

    this.handleSave = this.handleSave.bind(this);

  }

  componentDidMount () {
    this.setState({
      users: this.props.userList
    });
  }

  handleClose = () => {
    this.props.setOpen('manage-members', false);
  };

  handleSave = () => {
    this.props.handleSaveGroupMembers(this.state.users);
  };

  handleAddUserToList (user) {
    this.setState({
      users: [...this.state.users, user]
    });
  }

  handleRemoveUserFromList (login) {
    this.setState({
      users: this.state.users.filter(user => user.login !== login)
    });
  }

  isUserInGroupList (user) {
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].login === user.login) {
        return true;
      }
    }

    return false;
  }

  render () {

    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="manage-members-dialog-title"
        aria-describedby="manage-members-dialog-description"
        maxWidth='xs'
        fullWidth
      >
        <DialogTitle
          id="manage-members-dialog-title">{'Manage group members'}</DialogTitle>
        <DialogContent>
          <Typography className={classes.label} component='h6'
                      variant='h6'>Members:</Typography>
          <div className={classes.list}>
            {
              this.state.users.map((user, index) => <Chip
                key={index}
                className={classes.chip}
                color={user.login === this.props.owner ? 'primary' : 'default'}
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
                onDelete={
                  user.login !== this.props.owner &&
                  user.login !== this.props.currentUser ?
                    () => this.handleRemoveUserFromList(user.login) : null
                }
              />)
            }
          </div>
          <TextField
            margin='dense'
            id='manage-members-input'
            label='Filter by user name'
            fullWidth
            value={this.state.search}
            onChange={(e) => this.setState({ search: e.target.value })}
            autoComplete="off"
          />
          {
            this.props.contactList ? <div className={classes.contactList}>
              {
                this.props.contactList.sort((contactA, contactB) =>
                  contactA.name < contactB.name ? -1 : 1)
                  .filter(contact => (contact.name + ' ' + contact.surname).toLowerCase()
                    .includes(this.state.search.toLowerCase()))
                  .filter(contact => !this.isUserInGroupList(contact))
                  .map((user, index) => <AccountPreview
                    key={index}
                    user={user}
                    className={classes.user}
                    handleClick={() => this.handleAddUserToList(user)}
                    selected={false}
                  />)
              }
            </div> : null
          }
          {
            this.props.contactList &&
            this.props.contactList.length === 0 ? <ListItem>
              <ListItemText
                secondary={'This user does not exist or ' +
                'you already have a chat with this user.'}
              />
            </ListItem> : null
          }
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={this.handleSave} color="primary">
            Save
          </Button>
          <Button onClick={this.handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );

  }
}

export default withStyles(styles)(ManageMembersDialog);
