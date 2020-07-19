import {createReducer} from '../utils/misc';
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
  UPDATE_GROUP_MEMBERS_SUCCESS, TOGGLE_SIDEBAR
} from '../utils/constants';

const initialState = {
  chats: null,
  groups: null,
  isFetching: false,
  loaded: false,
  addChatError: null,
  isAddingChat: false,
  deleteGroupMessage: null,
  deleteChatMessage: null,
  sidebarOpen: false,
};

export default createReducer(initialState, {
  [RECEIVE_USER_CHATS]: (state, payload) =>
    Object.assign({}, state, {
      chats: payload.data,
      isFetching: false,
      loaded: true,
    }),
  [FETCH_USER_CHATS_REQUEST]: (state, payload) =>
    Object.assign({}, state, {
      isFetching: payload.isFetching,
    }),
  [ADD_CHAT_REQUEST]: (state) =>
    Object.assign({}, state, {
      addChatError: null,
      isAddingChat: true,
    }),

  [ADD_CHAT_SUCCESS]: (state) =>
    Object.assign({}, state, {
      addChatError: null,
      isAddingChat: false
    }),

  [ADD_CHAT_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      addChatError: payload.error,
      isAddingChat: false
    }),
  [ADD_CHAT_CLOSE]: (state, payload) =>
    Object.assign({}, state, {
      addChatError: payload.addChatError,
    }),

  [DELETE_CHAT_REQUEST]: (state) =>
    Object.assign({}, state, {
      isFetching: true,
    }),

  [DELETE_CHAT_SUCCESS]: (state, payload) =>
    Object.assign({}, state, {
      isFetching: false,
      deleteChatMessage: payload,
    }),

  [DELETE_CHAT_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      isFetching: false,
      deleteChatMessage: payload,
    }),

  [ADD_GROUP_REQUEST]: (state) =>
    Object.assign({}, state, {
      addChatError: null,
      isAddingChat: true,
    }),

  [ADD_GROUP_SUCCESS]: (state) =>
    Object.assign({}, state, {
      addChatError: null,
      isAddingChat: false
    }),

  [ADD_GROUP_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      addChatError: payload.error,
      isAddingChat: false
    }),

  [UPDATE_GROUP_TITLE_REQUEST]: (state) =>
    Object.assign({}, state, {
      isFetching: true,
    }),

  [UPDATE_GROUP_TITLE_SUCCESS]: (state) =>
    Object.assign({}, state, {
      isFetching: false
    }),

  [UPDATE_GROUP_TITLE_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      updateGroupError: payload.error,
      isFetching: false
    }),

  [UPDATE_GROUP_MEMBERS_REQUEST]: (state) =>
    Object.assign({}, state, {
      isFetching: true,
    }),

  [UPDATE_GROUP_MEMBERS_SUCCESS]: (state) =>
    Object.assign({}, state, {
      isFetching: false
    }),

  [UPDATE_GROUP_MEMBERS_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      updateGroupError: payload.error,
      isFetching: false
    }),

  [DELETE_GROUP_REQUEST]: (state) =>
    Object.assign({}, state, {
      isFetching: true,
    }),

  [DELETE_GROUP_SUCCESS]: (state, payload) =>
    Object.assign({}, state, {
      isFetching: false,
      deleteGroupMessage: payload,
    }),

  [DELETE_GROUP_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      isFetching: false,
      deleteGroupMessage: payload,
    }),

  [READ_CHAT_REQUEST]: (state) =>
    Object.assign({}, state, {
      loaded: false
    }),
  [READ_CHAT]: (state) =>
    Object.assign({}, state, {
      loaded: true
    }),
  [RECEIVE_USER_GROUPS]: (state, payload) =>
    Object.assign({}, state, {
      groups: payload.data,
      isFetching: false,
      loaded: true,
    }),
  [FETCH_USER_GROUPS_REQUEST]: (state, payload) =>
    Object.assign({}, state, {
      isFetching: payload.isFetching,
    }),
  [UPDATE_GROUP_PHOTO]: (state, payload) =>
    Object.assign({}, state, {
      updatePhotoMessage: payload.updatePhotoMessage,
      isFetching: false,
      loaded: true,
    }),
  [UPDATE_GROUP_PHOTO_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      updatePhotoMessage: payload.updatePhotoMessage,
      isFetching: false,
      loaded: true,
    }),
  [UPDATE_GROUP_PHOTO_REQUEST]: (state) =>
    Object.assign({}, state, {
      isFetching: true,
      loaded: false,
    }),
  [TOGGLE_SIDEBAR]: (state, payload) =>
    Object.assign({}, state, {
      sidebarOpen: payload.sidebarOpen
    }),
});