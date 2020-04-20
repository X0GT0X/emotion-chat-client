import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import data from './data';
import chats from './chats';

const rootReducer = combineReducers({
    routing: routerReducer,
    auth,
    data,
    chats
});

export default rootReducer;