import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '../../utils/history';
import * as actionCreators from '../../actions/auth';
import { validateToken } from '../../utils/http_functions';
import PropTypes from 'prop-types';

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
 * RequireNoAuthentication HOC function.
 *
 * @param Component
 * @return React.Component
 */
export const requireNoAuthentication = (Component) => {
  /**
   * Class representing an NotAuthenticated component.
   * Shows provided component if user is not authenticated.
   */
  class notAuthenticatedComponent extends React.Component {
    /**
     * NotAuthenticatedComponent constructor.
     * @param props
     * @constructor
     */
    constructor (props) {
      super(props);
      this.state = {
        loaded: false
      };
    }

    componentDidMount () {
      this.checkAuth();
    }

    static getDerivedStateFromProps (nextProps, prevState) {
      if (nextProps.isAuthenticated) {
        history.push('/');
      } else {
        const token = localStorage.getItem('token');
        const login = localStorage.getItem('userLogin');

        if (token) {
          validateToken(token).then(res => {
            if (res.status === 200) {
              nextProps.loginUserSuccess(token, login);
              history.push('/');
            } else {
              return { loaded: true };
            }
          })
            .catch(res => {
              localStorage.removeItem('token');
              localStorage.removeItem('userLogin');
              history.push('/');
            });
        } else {
          return { loaded: true };
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
      if (props.isAuthenticated) {
        history.push('/');
      } else {
        const token = localStorage.getItem('token');
        const login = localStorage.getItem('userLogin');

        if (token) {
          validateToken(token).then(res => {
            if (res.status === 200) {
              this.props.loginUserSuccess(token, login);
              history.push('/');
            } else {
              this.setState({
                loaded: true
              });
            }
          });
        } else {
          this.setState({
            loaded: true
          });
        }
      }
    }

    render () {
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

  notAuthenticatedComponent.propTypes = {
    isAuthenticated: PropTypes.bool,
    history: PropTypes.object,
    loginUserSuccess: PropTypes.func
  };

  return connect(mapStateToProps, mapDispatchToProps)(notAuthenticatedComponent);
};
