import {parseJSON} from '../utils/misc';
import {
  get_chats,
  add_chat,
  add_group,
  read_chat,
  get_groups,
  update_group_title,
  delete_group, delete_chat, update_group_photo, update_group_members
} from '../utils/http_functions';
import {logoutAndRedirect} from './auth';
import {
  RECEIVE_USER_CHATS,
  FETCH_USER_CHATS_REQUEST,
  RECEIVE_USER_GROUPS,
  FETCH_USER_GROUPS_REQUEST,
  ADD_CHAT_REQUEST,
  ADD_CHAT_SUCCESS,
  ADD_CHAT_FAILURE,
  ADD_CHAT_CLOSE,
  ADD_GROUP_REQUEST,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAILURE,
  READ_CHAT_REQUEST,
  READ_CHAT,
  UPDATE_GROUP_TITLE_REQUEST,
  UPDATE_GROUP_TITLE_SUCCESS,
  UPDATE_GROUP_TITLE_FAILURE,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE,
  DELETE_CHAT_REQUEST,
  DELETE_CHAT_SUCCESS,
  DELETE_CHAT_FAILURE,
  UPDATE_GROUP_PHOTO,
  UPDATE_GROUP_PHOTO_FAILURE,
  UPDATE_GROUP_PHOTO_REQUEST,
  UPDATE_GROUP_MEMBERS_REQUEST,
  UPDATE_GROUP_MEMBERS_FAILURE,
  UPDATE_GROUP_MEMBERS_SUCCESS,
  TOGGLE_SIDEBAR,
} from '../utils/constants';
import {socket} from "../pages/dashboard/Dashboard";

export function receiveUserChats(data, selectChat) {
  socket.emit('chats_loading');
  return {
    type: RECEIVE_USER_CHATS,
    payload: {
      data,
    },
  };
}

export function fetchUserChatsRequest(isFetching) {
  return {
    type: FETCH_USER_CHATS_REQUEST,
    payload: {
      isFetching: !!isFetching,
    }
  };
}

export function fetchUserChats(token, selectChat, chat_id, isFetching) {
  return (dispatch) => {
    dispatch(fetchUserChatsRequest(isFetching));
    get_chats(token)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveUserChats(response));
        if (selectChat && chat_id) {
          selectChat(chat_id);
        }
      })
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error));
        }
      });
  };
}

export function addChatRequest() {
  return {
    type: ADD_CHAT_REQUEST
  }
}

export function addChatSuccess() {
  return {
    type: ADD_CHAT_SUCCESS,
    payload: {},
  };
}

export function addChatFailure(error) {
  return {
    type: ADD_CHAT_FAILURE,
    payload: {
      error
    },
  };
}

export function addChatClose() {
  return {
    type: ADD_CHAT_CLOSE,
    payload: {
      addChatError: null
    },
  };
}

export function addChat(userLogin, openModal, selectChat) {

  const token = localStorage.getItem('token');

  return function (dispatch) {
    dispatch(addChatRequest);
    return add_chat(token, userLogin)
      .then(parseJSON)
      .then(response => {
        dispatch(addChatSuccess);
        dispatch(fetchUserChats(token, selectChat, response.chat_id));
        dispatch(fetchUserGroups(token));
        if (openModal) {
          openModal('add-chat', false);
        }
      })
      .catch(error => {
        dispatch(addChatFailure(error.response.data.message));
      });
  };
}

export function deleteChatRequest() {
  return {
    type: DELETE_CHAT_REQUEST
  }
}

export function deleteChatSuccess(message) {
  return {
    type: DELETE_CHAT_SUCCESS,
    payload: {
      type: 'success',
      message,
    }
  };
}

export function deleteChatFailure(message) {
  return {
    type: DELETE_CHAT_FAILURE,
    payload: {
      type: 'success',
      message,
    }
  };
}

export function deleteChat(chatId) {

  const token = localStorage.getItem('token');

  return function (dispatch) {
    dispatch(deleteChatRequest());
    return delete_chat(token, chatId)
      .then(parseJSON)
      .then(response => {
        dispatch(deleteChatSuccess(response.message));
        dispatch(fetchUserChats(token));
        dispatch(fetchUserGroups(token));
      })
      .catch(error => {
        dispatch(deleteChatFailure(error.response.data.message));
      });
  };
}

export function addGroupRequest() {
  return {
    type: ADD_GROUP_REQUEST
  }
}

export function addGroupSuccess() {
  return {
    type: ADD_GROUP_SUCCESS,
  };
}

export function addGroupFailure(error) {
  return {
    type: ADD_GROUP_FAILURE,
    payload: {
      error
    },
  };
}

export function addGroup(title, users, openModal) {

  const token = localStorage.getItem('token');

  return function (dispatch) {
    dispatch(addGroupRequest);
    return add_group(token, title, users)
      .then(parseJSON)
      .then(response => {
        dispatch(addGroupSuccess);
        dispatch(fetchUserChats(token));
        dispatch(fetchUserGroups(token));
        openModal('add-chat', false);
      })
      .catch(error => {
        dispatch(addGroupFailure(error.response.data.message));
      });
  };
}

export function updateGroupTitleRequest() {
  return {
    type: UPDATE_GROUP_TITLE_REQUEST
  }
}

export function updateGroupTitleSuccess() {
  return {
    type: UPDATE_GROUP_TITLE_SUCCESS,
  };
}

export function updateGroupTitleFailure(error) {
  return {
    type: UPDATE_GROUP_TITLE_FAILURE,
    payload: {
      error
    },
  };
}

export function updateGroupTitle(id, title) {

  const token = localStorage.getItem('token');

  return function (dispatch) {
    dispatch(updateGroupTitleRequest());
    return update_group_title(token, id, title)
      .then(parseJSON)
      .then(response => {
        dispatch(updateGroupTitleSuccess());
        dispatch(fetchUserChats(token));
        dispatch(fetchUserGroups(token));
      })
      .catch(error => {
        dispatch(updateGroupTitleFailure(error.response.data.message));
      });
  };
}

export function updateGroupMembersRequest() {
  return {
    type: UPDATE_GROUP_MEMBERS_REQUEST
  }
}

export function updateGroupMembersSuccess() {
  return {
    type: UPDATE_GROUP_MEMBERS_SUCCESS,
  };
}

export function updateGroupMembersFailure(error) {
  return {
    type: UPDATE_GROUP_MEMBERS_FAILURE,
    payload: {
      error
    },
  };
}

export function updateGroupMembers(id, users) {

  const token = localStorage.getItem('token');

  return function (dispatch) {
    dispatch(updateGroupMembersRequest());
    return update_group_members(token, users, id)
      .then(parseJSON)
      .then(response => {
        dispatch(updateGroupMembersSuccess());
        dispatch(fetchUserGroups(token));
      })
      .catch(error => {
        dispatch(updateGroupMembersFailure(error.response.data.message));
      });
  };
}

export function deleteGroupRequest() {
  return {
    type: DELETE_GROUP_REQUEST
  }
}

export function deleteGroupSuccess(message) {
  return {
    type: DELETE_GROUP_SUCCESS,
    payload: {
      type: 'success',
      message,
    }
  };
}

export function deleteGroupFailure(message) {
  return {
    type: DELETE_GROUP_FAILURE,
    payload: {
      type: 'success',
      message,
    }
  };
}

export function deleteGroup(groupId) {

  const token = localStorage.getItem('token');

  return function (dispatch) {
    dispatch(deleteGroupRequest());
    return delete_group(token, groupId)
      .then(parseJSON)
      .then(response => {
        dispatch(deleteGroupSuccess(response.message));
        dispatch(fetchUserChats(token));
        dispatch(fetchUserGroups(token));
      })
      .catch(error => {
        dispatch(deleteGroupFailure(error.response.data.message));
      });
  };
}

export function readChatRequest() {
  return {
    type: READ_CHAT_REQUEST,
    payload: {},
  };
}

export function readChatSuccess() {
  return {
    type: READ_CHAT,
    payload: {},
  };
}

export function readChat(chat, type) {
  const token = localStorage.getItem('token');

  return function (dispatch) {
    dispatch(readChatRequest);
    return read_chat(token, chat, type)
      .then(parseJSON)
      .then(response => {
        dispatch(readChatSuccess);
        dispatch(fetchUserChats(token));
        dispatch(fetchUserGroups(token));
      })
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error));
        }
      })
  }
}

export function receiveUserGroups(data) {
  socket.emit('chats_loading');
  return {
    type: RECEIVE_USER_GROUPS,
    payload: {
      data,
    },
  };
}

export function fetchUserGroupsRequest(isFetching) {
  return {
    type: FETCH_USER_GROUPS_REQUEST,
    payload: {
      isFetching: !!isFetching
    }
  };
}

export function fetchUserGroups(token, isFetching) {
  return (dispatch) => {
    dispatch(fetchUserGroupsRequest(isFetching));
    get_groups(token)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveUserGroups(response));
      })
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error));
        }
      });
  };
}

export function receiveUpdatedPhoto(data) {
  return {
    type: UPDATE_GROUP_PHOTO,
    payload: {
      updatePhotoMessage: data.message,
    },
  };
}

export function updateGroupPhotoFailure(data) {
  return {
    type: UPDATE_GROUP_PHOTO_FAILURE,
    payload: {
      updatePhotoMessage: data.message
    },
  };
}

export function updateGroupPhotoRequest() {
  return {
    type: UPDATE_GROUP_PHOTO_REQUEST,
  };
}

export function updateGroupPhoto(token, data, chat) {
  return (dispatch) => {
    dispatch(updateGroupPhotoRequest());
    update_group_photo(token, data, chat)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveUpdatedPhoto(response));
        dispatch(fetchUserGroups(token));
      })
      .catch(error => {
        if (error.response.status === 403) {
          dispatch(logoutAndRedirect(error));
        }
        else {
          dispatch(updateGroupPhotoFailure(error.response.data));
        }
      });
  };
}

export function toggleSidebar(state) {
  return {
    type: TOGGLE_SIDEBAR,
    payload: {
      sidebarOpen: state
    },
  };
}

export function handleToggleSidebar(state) {
  return (dispatch) => {
    dispatch(toggleSidebar(state));
  };
}