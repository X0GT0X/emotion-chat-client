import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/auth';
import {validate_token} from "../utils/http_functions";

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

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        loaded_if_needed: false,
      };
    }

    componentDidMount() {
      this.checkAuth();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (!nextProps.isAuthenticated) {
        const token = localStorage.getItem('token');
        const login = localStorage.getItem('userLogin');

        if (!token) nextProps.history.push('/login');
        else validate_token(token).then(res => {
          if (res.status === 200) {
            nextProps.loginUserSuccess(token, login);
            return {loaded_if_needed: true};
          }
          else nextProps.history.push('/login');
        });

      }
      return null;
    }

    checkAuth(props = this.props) {
      if (!props.isAuthenticated) {
        const token = localStorage.getItem('token');
        const login = localStorage.getItem('userLogin');

        if (!token) this.props.history.push('/login');
        else validate_token(token).then(res => {
          if (res.status === 200) {
            this.props.loginUserSuccess(token, login);
            this.setState({
              loaded_if_needed: true,
            });
          }
          else this.props.history.push('/login');
        })
          .catch(res => {
            localStorage.removeItem('token');
            localStorage.removeItem('userLogin');
            this.props.history.push('/login');
          });
      } else this.setState({
        loaded_if_needed: true,
      });
    }

    render() {
      return (
        <div className='auth-component'>
          {this.props.isAuthenticated && this.state.loaded_if_needed
            ? <Component {...this.props} />
            : null
          }
        </div>
      );

    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}