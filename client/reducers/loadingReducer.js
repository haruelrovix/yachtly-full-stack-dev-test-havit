import * as types from '../actions/actionTypes';
import initialState from './initialState';

const loadingReducer = (state = initialState.loading, action) => {
	switch (action.type) {
		case types.TOGGLE_LOADING_SPINNER:
			return { isDisplayed: action.payload };

		default:
			return state;
	}
};

export default loadingReducer;
