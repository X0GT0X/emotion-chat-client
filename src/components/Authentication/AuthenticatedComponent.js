import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/auth';
import { validateToken } from '../../utils/http_functions';

/**
 * Maps redux store state to component props.
 *
 * @param state Redux store state.
 *
 * @return object Mapped properties.
 */
const mapStateToProps = (state) => ({
  token: state.auth.token,
  userLogin: state.auth.login,
  isAuthenticated: state.auth.isAuthenticated
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
 * RequireAuthentication HOC function.
 *
 * @param Component
 * @return React.Component
 */
export const requireAuthentication = (Component) => {
  /**
   * Class representing an Authenticated component.
   * Shows provided component if user is authenticated.
   */
  class AuthenticatedComponent extends React.Component {
    /**
     * AuthenticatedComponent constructor.
     * @param props
     * @constructor
     */
    constructor (props) {
      super(props);
      this.state = {
        loaded_if_needed: false
      };
    }

    componentDidMount () {
      this.checkAuth();
    }

    static getDerivedStateFromProps (nextProps, prevState) {
      if (!nextProps.isAuthenticated) {
        const token = localStorage.getItem('token');
        const login = localStorage.getItem('userLogin');

        if (!token) {
          nextProps.history.push('/login');
        } else {
          validateToken(token).then(res => {
            if (res.status === 200) {
              nextProps.loginUserSuccess(token, login);
              return { loaded_if_needed: true };
            } else {
              nextProps.history.push('/login');
            }
          });
        }
      }

      return null;
    }

    /**
     * Checks if user is authenticated.
     *
     * @param props
     */
    checkAuth (props = this.props) {
      if (!props.isAuthenticated) {
        const token = localStorage.getItem('token');
        const login = localStorage.getItem('userLogin');

        if (!token) {
          this.props.history.push('/login');
        } else {
          validateToken(token).then(res => {
            if (res.status === 200) {
              this.props.loginUserSuccess(token, login);
              this.setState({
                loaded_if_needed: true
              });
            } else {
              this.props.history.push('/login');
            }
          })
            .catch(res => {
              localStorage.removeItem('token');
              localStorage.removeItem('userLogin');
              this.props.history.push('/login');
            });
        }
      } else {
        this.setState({
          loaded_if_needed: true
        });
      }
    }

    render () {
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

  AuthenticatedComponent.propTypes = {
    isAuthenticated: PropTypes.bool,
    history: PropTypes.object,
    loginUserSuccess: PropTypes.func
  };

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
};
