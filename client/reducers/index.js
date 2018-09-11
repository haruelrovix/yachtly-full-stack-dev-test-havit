import { combineReducers } from 'redux';
import users from './userReducer';
import loading from './loadingReducer';
import modal from './modalReducer';
import error from './errorReducer';

const rootReducer = combineReducers({
	// short hand property names
	users,
	loading,
	modal,
	error
});

export default rootReducer;
