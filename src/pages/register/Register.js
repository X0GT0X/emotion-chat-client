import { Link } from 'react-router-dom';
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

import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import * as actionCreators from "../../actions/auth";


function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

class Register extends React.Component {

    constructor() {
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

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.registerPage}>
                <main className={classes.main}>
                    <CssBaseline/>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        {
                            this.state.signupError || this.props.registerStatusText ?
                                <Alert severity="info" className={classes.alert}>
                                    {this.state.signupError || this.props.registerStatusText}
                                </Alert> :
                                null
                        }
                        <form onSubmit={(e) => this.submitSignup(e)} className={classes.form}>
                            <FormControl required fullWidth margin='normal'>
                                <InputLabel htmlFor='signup-email-input'>Name</InputLabel>
                                <Input className={classes.input} autoFocus onChange={(e) => this.userTyping('name', e)} id='signup-name-input'/>
                            </FormControl>
                            <FormControl fullWidth margin='normal'>
                                <InputLabel htmlFor='signup-email-input'>Surname(Optional)</InputLabel>
                                <Input className={classes.input} onChange={(e) => this.userTyping('surname', e)} id='signup-surname-input'/>
                            </FormControl>
                            <FormControl required fullWidth margin='normal'>
                                <InputLabel htmlFor='signup-email-input'>Login</InputLabel>
                                <Input className={classes.input} onChange={(e) => this.userTyping('login', e)} id='signup-login-input'/>
                            </FormControl>
                            <FormControl required fullWidth margin='normal'>
                                <InputLabel htmlFor='signup-password-input'>Password</InputLabel>
                                <Input type="password" className={classes.input} onChange={(e) => this.userTyping('password', e)} id='signup-password-input'/>
                            </FormControl>
                            <FormControl required fullWidth margin='normal'>
                                <InputLabel htmlFor='signup-password-confirmation-input'>Confirm Password</InputLabel>
                                <Input type="password" className={classes.input} onChange={(e) => this.userTyping('passwordConfirmation', e)} id='signup-password-confirmation-input'/>
                            </FormControl>
                            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Submit</Button>
                        </form>
                        <h5 className={classes.hasAccountHeader}>Already Have An Account? <Link className={classes.logInLink} to='/login'>Log In</Link></h5>
                    </Paper>
                </main>
            </div>
        );
    }

    userTyping = (whichInput, event) => {
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
    };

    formIsValid = () => this.state.password === this.state.passwordConfirmation;
    loginIsValid = () => this.state.login.length >= 6;
    passwordIsValid = () => this.state.password.length >= 6;

    submitSignup = (e) => {
        e.preventDefault();

        this.setState({signupError: ''});

        if(!this.loginIsValid()){
            this.setState({ signupError: 'Login must be at least 6 characters.' });
            return;
        }
        if(!this.passwordIsValid()) {
            this.setState({ signupError: 'Password must be at least 6 characters.' });
            return;
        }
        if(!this.formIsValid()) {
            this.setState({ signupError: 'Passwords do not match.' });
            return;
        }

        this.props.registerUser(this.state.name, this.state.surname, this.state.login, this.state.password, this.state.redirectTo);

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));