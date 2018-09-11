import * as types from './actionTypes';
import userApi from '../api/userApi';
import { toggleErrorMessage } from './errorActions';

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

export const saveUser = (user, history) => {
	return (dispatch) => {
		return userApi.saveUser(user)
			.then(response => {
				const action = response.error ? toggleErrorMessage : saveUserSuccess;

				if (response.error) {
					response.user = user;
				} else {
					history.push(`/user/${response.user.id}`);
				}

				dispatch(action(response));
			})
			.catch(error => {
				throw(error);
			});
	};
}

export const saveUserSuccess = ({ user }) => {
	return {
		type: types.SAVE_USER_SUCCESS, 
		user
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

export const deleteUser = user => {
	return (dispatch) => {
		return userApi.deleteUser(user)
			.then(() => {
				dispatch(deleteUserSuccess(user));

				return;
			})
			.catch(error => {
				throw(error);
			});
	};
};

export const deleteUserSuccess = user => {
	return {
		type: types.DELETE_USER_SUCCESS, 
		user
	};
};
