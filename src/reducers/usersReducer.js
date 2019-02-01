import initialState from "../initialState";
import * as types from '../actions/actionsTypes';
import * as actionTypes from '../constants/ActionTypes'

export default function usersReducer(state = initialState.users, action) {
	switch (action.type) {
		case types.LOAD_JSON_SUCCESS:
			return Object.assign({}, state, {users: action.users});
		case actionTypes.USER_AUTHENTIFICATION:
			return state;
		default:
			return state;
	}
}
