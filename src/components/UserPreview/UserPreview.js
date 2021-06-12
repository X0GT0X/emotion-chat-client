import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';
import { API_PATH } from '../../utils/constants';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from '../Avatar/ImageAvatar';
import TextAvatar from '../Avatar/TextAvatar';

const UserPreview = (props) => {
  const { classes } = props;

  let avatar;
  if (props.userData.profile_image) {
    avatar = <ImageAvatar
      className={classes.avatar}
      src={API_PATH + props.userData.profile_image}
    />;
  } else {
    avatar = <TextAvatar
      className={classes.avatar}
      name={props.userData.name}
      surname={props.userData.surname}
    />;
  }

  return (<div className={classes.avatarContainer}>
    {avatar}
    <Typography component="h2" variant="h6" className={classes.welcomeText}>
      Welcome, {this.props.userData.name}
    </Typography>
  </div>);
};

UserPreview.propTypes = {
  classes: PropTypes.object,
  userData: PropTypes.object
};

export default withStyles(styles)(UserPreview);
