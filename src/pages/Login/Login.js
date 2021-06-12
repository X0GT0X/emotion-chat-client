import { Link } from 'react-router-dom';
import React from 'react';
import styles from './styles';
import UserPreview from '../../components/UserPreview/UserPreview';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import {
  fetchUnauthorizedUserData,
  cleanUnauthorizedUserData
} from '../../actions/data';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { PropTypes } from 'prop-types';
import InputGroup from '../../components/InputGroup/InputGroup';

/**
 * Maps redux store state to component props.
 *
 * @param state Redux store state.
 *
 * @return object Mapped properties.
 */
const mapStateToProps = (state) => ({
  statusText: state.auth.statusText,
  userData: state.data.unauthorizedUser
});

/**
 * Maps redux dispatcher functions to component props.
 *
 * @param dispatch The `dispatch` function available on your Redux store.
 *
 * @return {object} The object mimicking the original object
 */
const mapDispatchToProps = (dispatch) => ({
  loginUserHandler: (login, password) => dispatch(loginUser(login, password)),
  getUserDataHandler: (login) => dispatch(fetchUnauthorizedUserData(login)),
  cleanUserDataHandler: () => dispatch(cleanUnauthorizedUserData())
});

/**
 * Class representing Login page.
 */
class Login extends React.Component {
  /**
   * Login constructor.
   * @constructor
   */
  constructor (props) {
    super(props);
    const redirectRoute = '/login';
    this.state = {
      login: '',
      password: '',
      signinError: '',
      redirectTo: redirectRoute
    };

    this.getDataHandler = this.getDataHandler.bind(this);
  }

  /**
   * Login handler.
   * @param e
   */
  loginHandler (e) {
    e.preventDefault();
    this.props.loginUserHandler(this.state.login, this.state.password);
    this.props.cleanUserDataHandler();
  }

  /**
   * Get data handler.
   */
  getDataHandler () {
    if (this.state.login.length >= 5) {
      this.props.getUserDataHandler(this.state.login);
    }
  }

  /**
   * User typing handler.
   * @param whichInput
   * @param event
   */
  userTypingHandler (whichInput, event) {
    switch (whichInput) {
      case 'login':
        this.setState({ login: event.target.value });
        this.props.cleanUserDataHandler();
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      default:
        break;
    }
  };

  render () {
    const { classes } = this.props;

    let alert = null;
    if (this.state.signinError || this.props.statusText) {
      alert = <Alert severity="info" className={classes.alert}>
        {this.state.signinError || this.props.statusText}
      </Alert>;
    }

    let userPreview = null;
    if (this.props.userData) {
      userPreview = <UserPreview/>;
    }

    return (
      <div className={classes.loginPage}>
        <main className={classes.main}>
          <CssBaseline/>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            {alert}
            {userPreview}
            <form onSubmit={(e) => this.loginHandler(e)} className={classes.form}>
              <InputGroup
                inputId='signin-login-input'
                type='text'
                required
                field='login'
                label='Login'
                onChange={this.userTypingHandler}
              />
              <InputGroup
                inputId='signup-password-input'
                type='password'
                required
                field='password'
                label='Password'
                onChange={this.userTypingHandler}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>Submit
              </Button>
            </form>
            <h5 className={classes.hasAccountHeader}>Don&apos;t Have An Account?
              <Link className={classes.logInLink} to='/register'>Sign Up</Link>
            </h5>
          </Paper>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object,
  statusText: PropTypes.string,
  userData: PropTypes.object,
  loginUserHandler: PropTypes.func,
  cleanUserDataHandler: PropTypes.func,
  getUserDataHandler: PropTypes.func

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
