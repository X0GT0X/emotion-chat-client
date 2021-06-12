import React from 'react';
import styles from './styles';
import AccountPreview from '../AccountPreview/AccountPreview';
import CircularProgress
  from '@material-ui/core/CircularProgress/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItem from '@material-ui/core/ListItem/ListItem';
import TextField from '@material-ui/core/TextField/TextField';
import UserInfoDialog from '../../dialogs/UserInfoDialog/UserInfoDialog';
import DeleteContactDialog from '../../dialogs/DeleteContactDialog/DeleteContactDialog';

class ContactList extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      searchValue: '',
      selectedUser: null,
      userInfoOpen: false,
      deleteContactDialogOpen: false,
    };

    this.handleSearch = this.handleSearch.bind(this);

  }

  handleSearch = (e) => this.setState({ searchValue: e.target.value });

  setOpen (type, open) {
    if (type === 'user-info') {
      this.setState({ userInfoOpen: open });
    } else if (type === 'contact') {
      this.setState({ deleteContactDialogOpen: open });
    }
  };

  render () {
    const {
      value,
      index
    } = this.props;

    const { classes } = this.props;

    return (
      <div
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && <div>
          <TextField
            fullWidth
            value={this.state.searchValue}
            onChange={this.handleSearch}
            placeholder='Filter by user name'
            className={classes.search}
          />
          {
            this.props.contacts && this.props.contacts.length > 0 ? <div
              className={classes.list}>
              {
                this.props.contacts.sort((contactA, contactB) =>
                  contactA.name < contactB.name ? -1 : 1).filter(contact =>
                  (contact.name + ' ' + contact.surname).toLowerCase()
                    .includes(this.state.searchValue.toLowerCase()))
                  .map((user, index) => <AccountPreview
                    key={index}
                    user={user}
                    className={classes.user}
                    handleClick={() => {
                      this.setState({ selectedUser: user });
                      this.setOpen('user-info', true);
                    }}
                  />)
              }
            </div> : <ListItem>
              <ListItemText
                secondary={'You don\'t have any contacts.'}
              />
            </ListItem>
          }
          {
            this.props.isFetching ? <div className={classes.progress}>
              <CircularProgress color="primary"/>
            </div> : null
          }
          {
            this.state.selectedUser ? <UserInfoDialog
              open={this.state.userInfoOpen}
              setOpen={this.setOpen}
              data={this.state.selectedUser}
              contacts={this.props.contacts}
              handleGoToChat={() => this.props.handleGoToChat(this.state.selectedUser.login)}
              handleRemoveContact={() => this.setOpen('contact', true)}
            /> : null
          }
          <DeleteContactDialog
            open={this.state.deleteContactDialogOpen}
            setOpen={this.setOpen}
            handleRemoveContact={() => {
              this.props.handleRemoveContact(this.state.selectedUser);
              this.setOpen('contact', false);
            }}
          />
        </div>
        }
      </div>
    );
  }
}

export default withStyles(styles)(ContactList);
