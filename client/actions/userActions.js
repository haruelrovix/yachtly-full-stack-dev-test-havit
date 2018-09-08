import * as types from './actionTypes';
import userApi from '../api/userApi';

export const loadUsers = () => {
	return (dispatch) => {
		return userApi.getAllUsers()
			.then(response => {
				dispatch(loadUsersSuccess(response));
			})
			.catch(error => {
				throw(error);
			});
	};
};

export const loadUsersSuccess = ({ users }) => {
	return { 
		type: types.LOAD_USERS_SUCCESS, 
		users: users ? users : []
	};
};

export const updateUser = user => {
	return (dispatch) => {
		return userApi.updateUser(user)
			.then(response => {
				dispatch(updateUserSuccess(response));
			})
			.catch(error => {
				throw(error);
			});
	};
}

export const updateUserSuccess = ({ user }) => {
	return {
		type: types.UPDATE_USER_SUCCESS, 
		user
	};
};
