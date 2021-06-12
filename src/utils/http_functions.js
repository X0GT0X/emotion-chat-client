import axios from 'axios';
import { API_PATH } from './constants';

const api_host = `${API_PATH}/api`;

const tokenConfig = (token) => ({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});

export const validateToken = (token) =>
  axios.post(`${api_host}/auth/is_token_valid`, {
    token
  }, tokenConfig(token));

export const create_user = (name, surname, login, password) =>
  axios.post(`${api_host}/auth/signup`, {
    name,
    surname,
    login,
    password
  });

export const get_token = (login, password) =>
  axios.post(`${api_host}/auth/signin`, {
    login,
    password
  });

export const data_about_user = (token) =>
  axios.get(`${api_host}/user`, tokenConfig(token));

export const update_user_data = (token, user) =>
  axios.put(`${api_host}/user`, user, tokenConfig(token));

export const update_user_photo = (token, data) =>
  axios.put(`${api_host}/user/image`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
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

export const check_user_status = (token, login) =>
  axios.get(`${api_host}/user/check_status/${login}`, tokenConfig(token));

export const get_chats = (token) =>
  axios.get(`${api_host}/chats`, tokenConfig(token));

export const add_chat = (token, login) =>
  axios.post(`${api_host}/chats`, { user: login }, tokenConfig(token));

export const read_chat = (token, chat, type) =>
  axios.put(`${api_host}/chat/${chat}`, { type }, tokenConfig(token));

export const delete_chat = (token, id) =>
  axios.delete(`${api_host}/chat/${id}`, tokenConfig(token));

export const add_group = (token, title, users) =>
  axios.post(`${api_host}/groups`, {
    title: title,
    users: users
  }, tokenConfig(token));

export const update_group_title = (token, id, title) =>
  axios.put(`${api_host}/group/${id}`, {
    title: title
  }, tokenConfig(token));

export const update_group_photo = (token, data, chat) =>
  axios.put(`${api_host}/group/image/${chat}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  });

export const update_group_members = (token, data, chat) =>
  axios.post(`${api_host}/group/${chat}`, data, tokenConfig(token));

export const delete_group = (token, id) =>
  axios.delete(`${api_host}/group/${id}`, tokenConfig(token));

export const get_groups = (token) =>
  axios.get(`${api_host}/groups`, tokenConfig(token));

export const get_user_contacts = (token) =>
  axios.get(`${api_host}/contacts`, tokenConfig(token));

export const get_filtered_user_contacts = (token, login) =>
  axios.get(`${api_host}/contacts/${login}`, tokenConfig(token));

export const get_user_invitations = (token) =>
  axios.get(`${api_host}/invitations`, tokenConfig(token));
