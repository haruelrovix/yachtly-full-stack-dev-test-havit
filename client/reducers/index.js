import { combineReducers } from 'redux';
import users from './userReducer';
import modal from './modalReducer';

const rootReducer = combineReducers({
	// short hand property names
	users,
	modal
});

export default rootReducer;
