import * as types from '../actions/actionTypes';
import initialState from './initialState';

const modalReducer = (state = initialState.modal, action) => {
	switch (action.type) {
		case types.TOGGLE_MODAL_VISIBILITY:
			return { isDisplayed: !state.isDisplayed, ...action.payload };

		default:
			return state;
	}
};

export default modalReducer;
