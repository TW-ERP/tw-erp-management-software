import { combineReducers } from 'redux';
import loginReducer from './loginReducer.js';

const reducers = combineReducers({
  login: loginReducer,
});

export default reducers;
