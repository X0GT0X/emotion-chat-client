import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import {connect} from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from '@material-ui/core/IconButton';
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions/chats";

const useStyles = makeStyles(theme => ({
  header: {
    zIndex: theme.zIndex.drawer + 1,
  },
  container: {
    backgroundColor: theme.palette.primary.main,
  },
  logo: {
    maxWidth: 48,
    marginRight: 10
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    [theme.breakpoints.down('md')]: {
      minHeight: 48,
    },
  },
  button: {
    paddingRight: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  icon: {
    color: 'white',
  }
}));

function mapStateToProps(state) {
  return {
    isFetching: state.data.isFetching,
    isAuthenticating: state.auth.isAuthenticating,
    isAuthenticated: state.auth.isAuthenticated,
    isRegistering: state.auth.isRegistering,
    isChatsFetching: state.chats.isFetching,
    isAddingChat: state.chats.isAddingChat,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

function TopBar(props) {
  const classes = useStyles();

  const isDataLoading = () => props.isFetching || props.isAuthenticating ||
    props.isRegistering || props.isChatsFetching || props.isAddingChat;

  return (
    <AppBar position="fixed" className={classes.header}>
      <div className={classes.container}>
        <Toolbar className={classes.toolbar}>
          <img src='/static/logo.png' alt='EmotionChat' className={classes.logo}/>
          <Typography variant="h6" className={classes.title}>
            EmotionChat
          </Typography>
          {
            props.isAuthenticated ? <IconButton
              onClick={() => props.handleToggleSidebar(true)}
              className={classes.button}
            >
              <ChatIcon className={classes.icon}/>
            </IconButton> : null
          }
        </Toolbar>
      </div>
      {
        isDataLoading() ? <LinearProgress color="secondary"/> : null
      }
    </AppBar>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)