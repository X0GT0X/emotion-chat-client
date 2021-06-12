import { Link } from 'react-router-dom';
import React from 'react';
import styles from './styles';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import InputGroup from '../../components/InputGroup/InputGroup';

/**
 * Maps redux store state to component props.
 *
 * @param state Redux store state.
 *
 * @return object Mapped properties.
 */
const mapStateToProps = (state) => ({
  registerStatusText: state.auth.registerStatusText
});

/**
 * Maps redux dispatcher functions to component props.
 *
 * @param dispatch The `dispatch` function available on your Redux store.
 *
 * @return {object} The object mimicking the original object
 */
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

/**
 * Class representing Register page.
 */
class Register extends React.Component {
  /**
   * Login constructor.
   * @constructor
   */
  constructor () {
    super();
    this.state = {
      name: null,
      surname: null,
      login: null,
      password: null,
      passwordConfirmation: null,
      signupError: ''
    };
  }

  /**
   * User typing handler.
   * @param whichInput
   * @param event
   */
  userTypingHandler (whichInput, event) {
    switch (whichInput) {
      case 'name':
        this.setState({ name: event.target.value });
        break;
      case 'surname':
        this.setState({ surname: event.target.value });
        break;
      case 'login':
        this.setState({ login: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      case 'passwordConfirmation':
        this.setState({ passwordConfirmation: event.target.value });
        break;
      default:
        break;
    }
  }

  /**
   * Checks if form is valid.
   *
   * @return {boolean}
   */
  formIsValid () {
    return this.state.password === this.state.passwordConfirmation;
  }

  /**
   * Checks if input data has enough symbols.
   * @param inputText
   *
   * @return {boolean}
   */
  inputHasEnoughSymbols (inputText) {
    return inputText.length >= 6;
  }

  submitSignup (e) {
    e.preventDefault();

    this.setState({ signupError: '' });

    if (!this.inputHasEnoughSymbols(this.state.login)) {
      this.setState({ signupError: 'Login must be at least 6 characters.' });
      return;
    }
    if (!this.inputHasEnoughSymbols(this.state.password)) {
      this.setState({ signupError: 'Password must be at least 6 characters.' });
      return;
    }
    if (!this.formIsValid()) {
      this.setState({ signupError: 'Passwords do not match.' });
      return;
    }

    this.props.registerUser(this.state.name, this.state.surname, this.state.login, this.state.password, this.state.redirectTo);
  };

  render () {
    const { classes } = this.props;

    let alert = null;
    if (this.state.signupError || this.props.registerStatusText) {
      alert = <Alert severity="info" className={classes.alert}>
        {this.state.signupError || this.props.registerStatusText}
      </Alert>;
    }

    return (
      <div className={classes.registerPage}>
        <main className={classes.main}>
          <CssBaseline/>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">Sign Up</Typography>
            {alert}
            <form onSubmit={(e) => this.submitSignup(e)}
                  className={classes.form}>
              <InputGroup
                inputId='signup-name-input'
                type='text'
                required
                field='name'
                label='Name'
                onChange={this.userTypingHandler}
              />
              <InputGroup
                inputId='signup-surname-input'
                type='text'
                required={false}
                field='surname'
                label='Surname(Optional)'
                onChange={this.userTypingHandler}
              />
              <InputGroup
                inputId='signup-login-input'
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
              <InputGroup
                inputId='signup-password-confirmation-input'
                type='password'
                required
                field='passwordConfirmation'
                label='Confirm Password'
                onChange={this.userTypingHandler}
              />
              <Button type='submit' fullWidth variant='contained'
                      color='primary'
                      className={classes.submit}>Submit</Button>
            </form>
            <h5 className={classes.hasAccountHeader}>Already Have An
              Account? <Link className={classes.logInLink}
                             to='/login'>Log In</Link></h5>
          </Paper>
        </main>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object,
  registerStatusText: PropTypes.string,
  registerUser: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));
