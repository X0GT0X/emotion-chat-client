import axios from 'axios';

const api_host = 'http://localhost:5000/api';

const tokenConfig = (token) => ({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

export const validate_token = (token) =>
    axios.post(`${api_host}/auth/is_token_valid`, {
        token,
    }, tokenConfig(token));

export const create_user = (name, surname, login, password) =>
    axios.post(`${api_host}/auth/signup`, {
        name,
        surname,
        login,
        password,
    });

export const get_token = (login, password) =>
    axios.post(`${api_host}/auth/signin`, {
        login,
        password,
    });

export const data_about_user = (token) =>
    axios.get(`${api_host}/user`, tokenConfig(token));

export const update_user_data = (token, user) =>
    axios.put(`${api_host}/user`, user, tokenConfig(token));

export const update_user_photo = (token, data) =>
    axios.put(`${api_host}/user/image`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        }
    });

export const get_users_data = (token, login) =>
    axios.get(`${api_host}/users/${login}`, tokenConfig(token));

export const get_unauthorized_user_data = (login) =>
    axios.get(`${api_host}/user/${login}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

export const get_chats = (token) =>
    axios.get(`${api_host}/chats`, tokenConfig(token));

export const add_chat = (token, login) =>
    axios.post(`${api_host}/chats`, {user: login}, tokenConfig(token));

export const read_chat = (token, chat) =>
    axios.put(`${api_host}/chats`, { chat: chat }, tokenConfig(token));