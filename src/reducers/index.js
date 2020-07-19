import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import auth from './auth';
import data from './data';
import chats from './chats';
import contacts from './contacts';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  data,
  chats,
  contacts
});

export default rootReducer;