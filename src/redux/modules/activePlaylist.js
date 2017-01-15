// Actions from users modules
import {CREATE as CREATE_USER, DELETE as DELETE_USER} from './users';
import {SWITCH as SWITCH_USER} from './activeUser';

// Actions from playlists modules
import {CREATE, DELETE} from './playlists';

// Actions
const SWITCH = 'redux-playlists/activePlaylist/SWITCH';

// Reducer
export default function reducer(state = {}, action = {}) {
	switch (action.type) {
		case CREATE:
			return {
				user: action.userName,
				playlist: action.playlistId
			};
		case DELETE:
			return action.playlistId === state.playlist && action.userName === state.user ? {} : state;
		case SWITCH:
			return {
				user: action.userName,
				playlist: action.playlistId
			};
		case SWITCH_USER:
			return action.userName === state.user ? state : {};
		case DELETE_USER:
			return action.userName === state.user ? {} : state;
		case CREATE_USER:
			return {};
		default:
			return state;
	}
}

// Action Creators
export function switchPlaylist(userName, playlistId) {
	return { type: SWITCH, userName, playlistId }
}
