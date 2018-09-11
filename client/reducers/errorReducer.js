import * as types from '../actions/actionTypes';
import initialState from './initialState';

const errorReducer = (state = initialState.error, action) => {
	switch (action.type) {
		case types.TOGGLE_ERROR_MESSAGE:
			return { isDisplayed: !state.isDisplayed, ...action.payload };

		default:
			return state;
	}
};

export default errorReducer;
