import React from 'react';
import styles from './styles';
import CircularProgress
  from '@material-ui/core/CircularProgress/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import InvitationPreview from '../InvitationPreview/InvitationPreview';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';

const InvitationList = (props) => {
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
      {value === index && <div className={classes.list}>
        {
          props.invitations && props.invitations.received.length > 0 ? <div
            className="users-list">
            {
              props.invitations.received.map((invitation, index) =>
                <InvitationPreview
                  key={index}
                  data={invitation}
                  handleAccept={() => props.acceptInvitation(invitation.sender.login)}
                  handleDecline={() => props.declineInvitation(invitation.sender.login)}
                />)
            }
          </div> : <ListItem>
            <ListItemText
              secondary={'You don\'t have any invitations.'}
            />
          </ListItem>
        }
        {
          props.isFetching ? <div className={classes.progress}>
            <CircularProgress color="primary"/>
          </div> : null
        }
      </div>
      }
    </div>
  );
};

export default withStyles(styles)(InvitationList);
