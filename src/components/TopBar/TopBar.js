import React from 'react';
import { PropTypes } from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { connect } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from '@material-ui/core/IconButton';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/chats';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

/**
 * Maps redux store state to component props.
 *
 * @param state Redux store state.
 *
 * @return object Mapped properties.
 */
const mapStateToProps = (state) => ({
  isFetching: state.data.isFetching,
  isAuthenticating: state.auth.isAuthenticating,
  isAuthenticated: state.auth.isAuthenticated,
  isRegistering: state.auth.isRegistering,
  isChatsFetching: state.chats.isFetching,
  isAddingChat: state.chats.isAddingChat
});

/**
 * Maps redux dispatcher functions to component props.
 *
 * @param dispatch The `dispatch` function available on your Redux store.
 *
 * @return The object mimicking the original object
 */
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

/**
 * Represents a TopBar component.
 *
 * @param props Component properties.
 *
 * @return {JSX.Element}
 * @constructor
 */
const TopBar = (props) => {
  const { classes } = props;

  /**
   * Checks if some data is loading.
   *
   * @return {boolean}
   */
  const isDataLoading = () => props.isFetching || props.isAuthenticating ||
    props.isRegistering || props.isChatsFetching || props.isAddingChat;

  let toggleButton = null;
  if (props.isAuthenticated) {
    toggleButton = <IconButton
      onClick={() => props.handleToggleSidebar(true)}
      className={classes.button}
    >
      <ChatIcon className={classes.icon}/>
    </IconButton>;
  }

  return (
    <AppBar position="fixed" className={classes.header}>
      <div className={classes.container}>
        <Toolbar className={classes.toolbar}>
          <img src='/static/logo.png' alt='EmotionChat'
               className={classes.logo}/>
          <Typography variant="h6" className={classes.title}>
            EmotionChat
          </Typography>
          {toggleButton}
        </Toolbar>
      </div>
      {
        isDataLoading() ? <LinearProgress color="secondary"/> : null
      }
    </AppBar>
  );
};

TopBar.propTypes = {
  classes: PropTypes.object,
  isFetching: PropTypes.bool,
  isAuthenticating: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  isRegistering: PropTypes.bool,
  isChatsFetching: PropTypes.bool,
  isAddingChat: PropTypes.bool,
  handleToggleSidebar: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TopBar));
