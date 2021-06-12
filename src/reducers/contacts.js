import {createReducer} from '../utils/misc';
import {
  RECEIVE_CONTACT_LIST,
  FETCH_CONTACT_LIST_REQUEST,
  RECEIVE_INVITATION_LIST,
  FETCH_INVITATION_LIST_REQUEST,
  RECEIVE_FILTERED_CONTACT_LIST,
  FETCH_FILTERED_CONTACT_LIST_REQUEST,
  CLEAN_CONTACT_LIST
} from '../utils/constants';

const initialState = {
  filteredContacts: null,
  contacts: null,
  isFetching: false,
  loaded: false,
};

export default createReducer(initialState, {
  [RECEIVE_CONTACT_LIST]: (state, payload) =>
    Object.assign({}, state, {
      contacts: payload.data,
      isFetching: false,
      loaded: true,
    }),
  [FETCH_CONTACT_LIST_REQUEST]: (state) =>
    Object.assign({}, state, {
      isFetching: true,
      loaded: false
    }),
  [RECEIVE_FILTERED_CONTACT_LIST]: (state, payload) =>
    Object.assign({}, state, {
      filteredContacts: payload.data,
      isFetching: false,
      loaded: true,
    }),
  [FETCH_FILTERED_CONTACT_LIST_REQUEST]: (state) =>
    Object.assign({}, state, {
      isFetching: true,
      loaded: false
    }),
  [CLEAN_CONTACT_LIST]: (state) =>
    Object.assign({}, state, {
      filteredContacts: null,
    }),
  [RECEIVE_INVITATION_LIST]: (state, payload) =>
    Object.assign({}, state, {
      invitations: payload.data,
      isFetching: false,
      loaded: true,
    }),
  [FETCH_INVITATION_LIST_REQUEST]: (state) =>
    Object.assign({}, state, {
      isFetching: true,
      loaded: false
    }),
});