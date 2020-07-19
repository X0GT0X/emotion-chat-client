import {Link} from 'react-router-dom';
import React from 'react';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import {fetchUnauthorizedUserData, cleanUnauthorizedUserData} from '../../actions/data';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/auth';
import Avatar from "@material-ui/core/Avatar/Avatar";
import {API_PATH} from "../../utils/constants";


function mapStateToProps(state) {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText,
    userData: state.data.unauthorizedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (login, password) => dispatch(loginUser(login, password)),
    getUserData: (login) => dispatch(fetchUnauthorizedUserData(login)),
    cleanUserData: () => dispatch(cleanUnauthorizedUserData())
  }
}

class Login extends React.Component {

  constructor() {
    super();
    const redirectRoute = '/login';
    this.state = {
      login: '',
      password: '',
      signinError: '',
      redirectTo: redirectRoute,
    };

    this.getData = this.getData.bind(this);
  }

  login(e) {
    e.preventDefault();
    this.props.loginUser(this.state.login, this.state.password);
    this.props.cleanUserData();
  }

  getData() {
    if (this.state.login.length >= 5) {
      this.props.getUserData(this.state.login);
    }
  }

  render() {

    const {classes} = this.props;

    return (
      <div className={classes.registerPage}>
        <main className={classes.main}>
          <CssBaseline/>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            {
              this.state.signinError || this.props.statusText ?
                <Alert severity="info" className={classes.alert}>
                  {this.state.signinError || this.props.statusText}
                </Alert> :
                null
            }
            {
              this.props.userData ? <center className={classes.avatarContainer}>
                {
                  this.props.userData.profile_image ? <Avatar
                      className={classes.avatar}
                      src={API_PATH + this.props.userData.profile_image}
                    /> :
                    <Avatar className={classes.avatar}>
                      {
                        (this.props.userData.name ? this.props.userData.name.charAt(0).toUpperCase() : '') + '' +
                        (this.props.userData.surname ? this.props.userData.surname.charAt(0).toUpperCase() : '')
                      }
                    </Avatar>
                }
                <Typography component="h2" variant="h6" className={classes.welcomeText}>
                  Welcome, {this.props.userData.name}
                </Typography>
              </center> : null
            }
            <form onSubmit={(e) => this.login(e)} className={classes.form}>
              <FormControl required fullWidth margin='normal'>
                <InputLabel htmlFor='signin-email-input'>Login</InputLabel>
                <Input
                  autoFocus
                  className={classes.input}
                  onChange={(e) => this.userTyping('login', e)}
                  onBlur={this.getData}
                  id='signin-login-input'
                />
              </FormControl>
              <FormControl required fullWidth margin='normal'>
                <InputLabel htmlFor='signin-password-input'>Password</InputLabel>
                <Input type="password" className={classes.input} onChange={(e) => this.userTyping('password', e)}
                       id='signin-password-input'/>
              </FormControl>
              <Button type='submit' fullWidth variant='contained' color='primary'
                      className={classes.submit}>Submit</Button>
            </form>
            <h5 className={classes.hasAccountHeader}>Don't Have An Account? <Link className={classes.logInLink}
                                                                                  to='/register'>Sign Up</Link></h5>
          </Paper>
        </main>
      </div>
    );
  }

  userTyping = (whichInput, event) => {
    switch (whichInput) {
      case 'login':
        this.setState({login: event.target.value});
        this.props.cleanUserData();
        break;
      case 'password':
        this.setState({password: event.target.value});
        break;
      default:
        break;
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));