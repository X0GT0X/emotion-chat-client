import {parseJSON} from '../utils/misc';
import {
  get_user_contacts,
  get_filtered_user_contacts,
  get_user_invitations,
} from '../utils/http_functions';
import {
  RECEIVE_CONTACT_LIST,
  FETCH_CONTACT_LIST_REQUEST,
  RECEIVE_INVITATION_LIST,
  FETCH_INVITATION_LIST_REQUEST,
  RECEIVE_FILTERED_CONTACT_LIST,
  FETCH_FILTERED_CONTACT_LIST_REQUEST,
  CLEAN_CONTACT_LIST,
} from '../utils/constants';

export function receiveContactList(data) {

  return {
    type: RECEIVE_CONTACT_LIST,
    payload: {
      data,
    },
  };
}

export function fetchContactListRequest() {
  return {
    type: FETCH_CONTACT_LIST_REQUEST,
  };
}

export function fetchContactList(token) {
  return (dispatch) => {
    dispatch(fetchContactListRequest());
    get_user_contacts(token)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveContactList(response));
      })
      .catch(error => {

      });
  };
}

export function receiveFilteredContactList(data) {

  return {
    type: RECEIVE_FILTERED_CONTACT_LIST,
    payload: {
      data,
    },
  };
}

export function fetchFilteredContactListRequest() {
  return {
    type: FETCH_FILTERED_CONTACT_LIST_REQUEST,
  };
}

export function cleanContactList() {
  return {
    type: CLEAN_CONTACT_LIST
  };
}

export function fetchFilteredContactList(token, login) {
  return (dispatch) => {
    dispatch(fetchFilteredContactListRequest());
    get_filtered_user_contacts(token, login)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveFilteredContactList(response));
      })
      .catch(error => {

      });
  };
}

export function receiveInvitationList(data) {

  return {
    type: RECEIVE_INVITATION_LIST,
    payload: {
      data,
    },
  };
}

export function fetchInvitationListRequest() {
  return {
    type: FETCH_INVITATION_LIST_REQUEST,
  };
}

export function fetchInvitationList(token) {
  return (dispatch) => {
    dispatch(fetchInvitationListRequest());
    get_user_invitations(token)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveInvitationList(response));
      })
      .catch(error => {

      });
  };
}