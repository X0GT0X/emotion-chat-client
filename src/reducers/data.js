import {createReducer} from '../utils/misc';
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

const initialState = {
  data: null,
  usersList: null,
  status: null,
  isFetching: false,
  loaded: false,
  unauthorizedUser: null
};

export default createReducer(initialState, {
  [RECEIVE_PROTECTED_DATA]: (state, payload) =>
    Object.assign({}, state, {
      data: payload.data,
      // status: payload.status,
      isFetching: false,
      loaded: true,
    }),
  [FETCH_PROTECTED_DATA_REQUEST]: (state) =>
    Object.assign({}, state, {
      isFetching: true,
    }),

  [UPDATE_USER_DATA]: (state, payload) =>
    Object.assign({}, state, {
      data: payload.data,
      status: payload.status,
      isFetching: false,
      loaded: true,
    }),
  [UPDATE_USER_DATA_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      status: payload.status,
      isFetching: false,
      loaded: true,
    }),
  [UPDATE_USER_DATA_REQUEST]: (state) =>
    Object.assign({}, state, {
      isFetching: true,
    }),
  [UPDATE_USER_DATA_CLOSE]: (state, payload) =>
    Object.assign({}, state, {
      status: payload.status,
    }),
  [UPDATE_USER_PHOTO]: (state, payload) =>
    Object.assign({}, state, {
      data: payload.data,
      status: payload.status,
      isFetching: false,
      loaded: true,
    }),
  [UPDATE_USER_PHOTO_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      status: payload.status,
      isFetching: false,
      loaded: true,
    }),
  [UPDATE_USER_PHOTO_REQUEST]: (state) =>
    Object.assign({}, state, {
      isFetching: true,
    }),
  [FETCH_USERS_DATA_REQUEST]: (state) =>
    Object.assign({}, state, {
      isFetching: true
    }),
  [RECEIVE_USERS_DATA]: (state, payload) =>
    Object.assign({}, state, {
      usersList: payload.users,
      isFetching: false,
    }),
  [CLEAN_USERS_DATA]: (state) =>
    Object.assign({}, state, {
      usersList: null,
    }),
  [RECEIVE_UNAUTHORIZED_USER_DATA]: (state, payload) =>
    Object.assign({}, state, {
      unauthorizedUser: payload.unauthorizedUser,
      isFetching: false
    }),
  [FETCH_UNAUTHORIZED_USER_DATA_REQUEST]: (state) =>
    Object.assign({}, state, {
      isFetching: true
    }),
  [FETCH_UNAUTHORIZED_USER_DATA_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      status: payload.status,
      isFetching: false,
      loaded: true,
    }),
  [CLEAN_UNAUTHORIZED_USER_DATA]: (state) =>
    Object.assign({}, state, {
      unauthorizedUser: null,
    }),
});