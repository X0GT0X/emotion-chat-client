import { createReducer } from '../utils/misc';
import {
    RECEIVE_USER_CHATS,
    FETCH_USER_CHATS_REQUEST,
    ADD_CHAT_REQUEST,
    ADD_CHAT_SUCCESS,
    ADD_CHAT_FAILURE,
    ADD_CHAT_CLOSE,
    READ_CHAT_REQUEST,
    READ_CHAT
} from '../utils/constants';

const initialState = {
    chats: null,
    isFetching: false,
    loaded: false,
    addChatError: null,
    isAddingChat: false,
};

export default createReducer(initialState, {
    [RECEIVE_USER_CHATS]: (state, payload) =>
        Object.assign({}, state, {
            chats: payload.data,
            isFetching: false,
            loaded: true,
        }),
    [FETCH_USER_CHATS_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
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
        }),
    [ADD_CHAT_CLOSE]: (state, payload) =>
        Object.assign({}, state, {
            addChatError: payload.addChatError,
        }),
    [READ_CHAT_REQUEST]: (state) =>
        Object.assign({}, state, {
           loaded: false
        }),
    [READ_CHAT]: (state) =>
        Object.assign({}, state, {
            loaded: true
        }),
});