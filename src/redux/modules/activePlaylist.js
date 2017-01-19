// Actions from playlists modules
import {RENAME, DELETE} from './playlists';

// Actions
const SWITCH = 'redux-playlists/activePlaylist/SWITCH';

// Reducer
export default function reducer(state = '', action = {}) {
	switch (action.type) {
		case RENAME:
			return action.playlistId;
		case DELETE:
			return action.playlistId === state ? '' : state;
		case SWITCH:
			return action.playlistId;
		default:
			return state;
	}
}

// Action Creators
export function switchPlaylist(playlistId) {
	return { type: SWITCH, playlistId }
}
