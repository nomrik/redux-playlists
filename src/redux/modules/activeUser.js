// Actions from users modules
import {CREATE, DELETE} from './users';

// Actions
export const SWITCH = 'redux-playlists/activeUser/SWITCH';

// Reducer
export default function reducer(state = '', action = {}) {
	switch (action.type) {
		case CREATE:
			return action.userName;
		case DELETE:
			return action.userName === state ? '' : state;
		case SWITCH:
			return action.userName;
		default:
			return state;
	}
}

// Action Creators
export function switchUser(userName) {
	return { type: SWITCH, userName }
}
