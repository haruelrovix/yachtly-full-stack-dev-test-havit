import * as types from './actionTypes';
import userApi from '../api/userApi';
import { toggleErrorMessage } from './errorActions';
import { toggleLoadingSpinner } from './loadingActions';

export const loadUsers = () => {
	return (dispatch) => {
		dispatch(toggleLoadingSpinner(true));

		return userApi.getAllUsers()
			.then(response => {
				dispatch(toggleLoadingSpinner(false));
				dispatch(loadUsersSuccess(response));
			})
			.catch(error => {
				dispatch(toggleLoadingSpinner(false));
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
				const action = response.error ? toggleErrorMessage : updateUserSuccess;

				if (response.error) {
						response.user = user;
				}

				dispatch(action(response));
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

export const deleteUser = (user, history) => {
	return (dispatch) => {
		return userApi.deleteUser(user)
			.then(() => {
				dispatch(deleteUserSuccess(user));

				history.push('/');

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
