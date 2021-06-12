import {parseJSON} from '../utils/misc';
import {
  data_about_user,
  update_user_data,
  update_user_photo,
  get_users_data,
  get_unauthorized_user_data,
  check_user_status,
} from '../utils/http_functions';
import {logoutAndRedirect} from './auth';
import {
  RECEIVE_PROTECTED_DATA,
  FETCH_PROTECTED_DATA_REQUEST,
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_FAILURE,
  UPDATE_USER_DATA_CLOSE,
  UPDATE_USER_PHOTO_REQUEST,
  UPDATE_USER_PHOTO,
  UPDATE_USER_PHOTO_FAILURE,
  FETCH_USERS_DATA_REQUEST,
  RECEIVE_USERS_DATA,
  CLEAN_USERS_DATA,
  RECEIVE_UNAUTHORIZED_USER_DATA,
  FETCH_UNAUTHORIZED_USER_DATA_REQUEST,
  FETCH_UNAUTHORIZED_USER_DATA_FAILURE,
  CLEAN_UNAUTHORIZED_USER_DATA,
} from '../utils/constants';

export function receiveProtectedData(data) {

  return {
    type: RECEIVE_PROTECTED_DATA,
    payload: {
      data,
    },
  };
}

export function fetchProtectedDataRequest() {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST,
  };
}

export function fetchProtectedData(token, initFunction) {
  return (dispatch) => {
    dispatch(fetchProtectedDataRequest());
    data_about_user(token)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveProtectedData(response));
        if (initFunction) initFunction(response);
      })
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error));
        }
      });
  };
}


export function receiveUpdatedData(data) {
  const user_data = data.data;
  const status = {
    message: data.message,
    status: 'OK'
  };
  return {
    type: UPDATE_USER_DATA,
    payload: {
      data: user_data,
      status
    },
  };
}

export function updateDataFailure(data) {
  const status = {
    message: data.message,
    status: 'ER'
  };
  return {
    type: UPDATE_USER_DATA_FAILURE,
    payload: {
      status
    },
  };
}

export function updateUserDataRequest() {
  return {
    type: UPDATE_USER_DATA_REQUEST,
  };
}

export function updateUserDataClose() {
  return {
    type: UPDATE_USER_DATA_CLOSE,
    payload: {
      status: null
    }
  };
}

export function updateUserData(token, user) {
  return (dispatch) => {
    dispatch(updateUserDataRequest());
    update_user_data(token, user)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveUpdatedData(response));
        dispatch(fetchProtectedData(token));
      })
      .catch(error => {
        if (error.response.status === 403) {
          dispatch(logoutAndRedirect(error));
        }
        else {
          dispatch(updateDataFailure(error.response.data));
        }
      });
  };
}


export function receiveUpdatedPhoto(data) {
  const user_data = data.data;
  const status = {
    message: data.message,
    status: 'OK'
  };
  return {
    type: UPDATE_USER_PHOTO,
    payload: {
      data: user_data,
      status
    },
  };
}

export function updateUserPhotoFailure(data) {
  const status = {
    message: data.message,
    status: 'ER'
  };
  return {
    type: UPDATE_USER_PHOTO_FAILURE,
    payload: {
      status
    },
  };
}

export function updateUserPhotoRequest() {
  return {
    type: UPDATE_USER_PHOTO_REQUEST,
  };
}

export function updateUserPhoto(token, data) {
  return (dispatch) => {
    dispatch(updateUserPhotoRequest());
    update_user_photo(token, data)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveUpdatedPhoto(response));
      })
      .catch(error => {
        if (error.response.status === 403) {
          dispatch(logoutAndRedirect(error));
        }
        else {
          dispatch(updateUserPhotoFailure(error.response.data));
        }
      });
  };
}

export function fetchUsersDataRequest() {
  return {
    type: FETCH_USERS_DATA_REQUEST,
  };
}

export function receiveUsersData(data) {
  return {
    type: RECEIVE_USERS_DATA,
    payload: {
      users: data,
    },
  };
}

export function cleanUsersData() {
  return {
    type: CLEAN_USERS_DATA,
  };
}

export function fetchUsersData(token, login) {
  return (dispatch) => {
    dispatch(fetchUsersDataRequest());
    get_users_data(token, login)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveUsersData(response));
      })
      .catch(error => {
        dispatch(logoutAndRedirect(error));
      });
  };
}

export function fetchUnauthorizedUserDataRequest() {
  return {
    type: FETCH_UNAUTHORIZED_USER_DATA_REQUEST,
  };
}

export function fetchUnauthorizedUserDataFailure(data) {
  const status = {
    message: data.message,
    status: 'ER'
  };

  return {
    type: FETCH_UNAUTHORIZED_USER_DATA_FAILURE,
    payload: {
      status
    }
  };
}

export function receiveUnauthorizedUsersData(data) {
  return {
    type: RECEIVE_UNAUTHORIZED_USER_DATA,
    payload: {
      unauthorizedUser: data
    }
  };
}

export function cleanUnauthorizedUserData() {
  return {
    type: CLEAN_UNAUTHORIZED_USER_DATA,
  };
}

export function fetchUnauthorizedUserData(login) {
  return (dispatch) => {
    dispatch(fetchUnauthorizedUserDataRequest());
    get_unauthorized_user_data(login)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveUnauthorizedUsersData(response));
      })
      .catch(error => {
        dispatch(fetchUnauthorizedUserDataFailure(error.response.data));
      });
  };
}

export async function checkUserStatus(user, setStatus) {

  const token = localStorage.getItem('token');

  check_user_status(token, user)
    .then(parseJSON)
    .then(response => {
      setStatus(response.online);
    })
}