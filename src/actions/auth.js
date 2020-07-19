import history from '../history';
import {parseJSON} from '../utils/misc';
import {get_token, create_user} from '../utils/http_functions';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGOUT_USER
} from '../utils/constants';


export function loginUserSuccess(token, login) {
  localStorage.setItem('token', token);
  localStorage.setItem('userLogin', login);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token,
      login
    },
  };
}


export function loginUserFailure(error) {
  localStorage.removeItem('token');
  localStorage.removeItem('userLogin');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST,
  };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userLogin');
  return {
    type: LOGOUT_USER,
  };
}

export function logoutAndRedirect() {
  return (dispatch) => {
    dispatch(logout());
    history.push('/login');
  };
}

export function redirectToRoute(route) {
  return () => {
    history.push(route);
  };
}

export function loginUser(login, password) {
  return function (dispatch) {
    dispatch(loginUserRequest());
    return get_token(login, password)
      .then(parseJSON)
      .then(response => {
        try {
          dispatch(loginUserSuccess(response.token, login));
          history.push('/');
        } catch (e) {
          alert(e);
          dispatch(loginUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token',
            },
          }));
        }
      })
      .catch(error => {
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid login or password',
          },
        }));
      });
  };
}


export function registerUserRequest() {
  return {
    type: REGISTER_USER_REQUEST,
  };
}

export function registerUserSuccess(token, login) {
  localStorage.setItem('token', token);
  localStorage.setItem('userLogin', login);
  return {
    type: REGISTER_USER_SUCCESS,
    payload: {
      token,
      login
    },
  };
}

export function registerUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function registerUser(name, surname, login, password) {
  return function (dispatch) {
    dispatch(registerUserRequest());
    return create_user(name, surname, login, password)
      .then(parseJSON)
      .then(response => {
        try {
          dispatch(registerUserSuccess(response.token, login));
          history.push('/');
        } catch (e) {
          dispatch(registerUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token',
            },
          }));
        }
      })
      .catch(error => {
        dispatch(registerUserFailure({
            response: {
              status: 403,
              statusText: 'User with that login already exists',
            },
          }
        ));
      });
  };
}