import { parseJSON } from '../utils/misc';
import {get_chats, add_chat, read_chat} from '../utils/http_functions';
import {logoutAndRedirect} from './auth';
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


export function receiveUserChats(data) {
    return {
        type: RECEIVE_USER_CHATS,
        payload: {
            data,
        },
    };
}

export function fetchUserChatsRequest() {
    return {
        type: FETCH_USER_CHATS_REQUEST,
    };
}

export function fetchUserChats(token) {
    return (dispatch) => {
        dispatch(fetchUserChatsRequest());
        get_chats(token)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveUserChats(response));
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

export function addChat(userLogin, openModal) {

    const token = localStorage.getItem('token');

    return function (dispatch) {
        dispatch(addChatRequest);
        return add_chat(token, userLogin)
            .then(parseJSON)
            .then(response => {
                dispatch(addChatSuccess);
                dispatch(fetchUserChats(token));
                openModal('add-chat', false);
            })
            .catch(error => {
                dispatch(addChatFailure(error.response.data.message));
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

export function readChat(chat) {
    const token = localStorage.getItem('token');

    return function (dispatch) {
        dispatch(readChatRequest);
        return read_chat(token, chat)
            .then(parseJSON)
            .then(response => {
                dispatch(readChatSuccess);
                dispatch(fetchUserChats(token));
            })
            .catch(error => {
                if (error.status === 401) {
                    dispatch(logoutAndRedirect(error));
                }
            })
    }
}