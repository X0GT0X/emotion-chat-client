import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '../history';
import * as actionCreators from '../actions/auth';
import { validate_token } from '../utils/http_functions';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userLogin: state.auth.login,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export function requireNoAuthentication(Component) {

    class notAuthenticatedComponent extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                loaded: false,
            };
        }

        componentDidMount() {
            this.checkAuth();
        }

        static getDerivedStateFromProps(nextProps, prevState){
            if(nextProps.isAuthenticated) history.push('/');
            else{
                const token = localStorage.getItem('token');
                const login = localStorage.getItem('userLogin');

                if (token) validate_token(token).then(res => {
                    if (res.status === 200) {
                        nextProps.loginUserSuccess(token, login);
                        history.push('/');
                    }
                    else return {loaded: true};
                })
                    .catch(res => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userLogin');
                        history.push('/');
                    });
                else return {loaded: true};
            }
            return null;
        }

        checkAuth(props = this.props) {
            if (props.isAuthenticated) history.push('/');
            else {
                const token = localStorage.getItem('token');
                const login = localStorage.getItem('userLogin');

                if (token) validate_token(token).then(res => {
                    if (res.status === 200) {
                        this.props.loginUserSuccess(token, login);
                        history.push('/');
                    }
                    else this.setState({
                        loaded: true,
                    });
                });
                else this.setState({
                    loaded: true,
                });
            }
        }

        render() {

            return (
                <div className='auth-component'>
                    {!this.props.isAuthenticated && this.state.loaded
                        ? <Component {...this.props} />
                        : null
                    }
                </div>
            );

        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(notAuthenticatedComponent);

}