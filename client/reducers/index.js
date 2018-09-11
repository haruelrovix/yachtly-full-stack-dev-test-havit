import { combineReducers } from 'redux';
import users from './userReducer';
import modal from './modalReducer';
import error from './errorReducer';

const rootReducer = combineReducers({
	// short hand property names
	users,
	modal,
	error
});

export default rootReducer;
