// Actions
const LOAD = 'redux-playlists/searchedSongs/LOAD';

// Reducer
export default function reducer(state = {}, action = {}) {
	switch (action.type) {
		case LOAD:
			return action.songs;
		default:
			return state;
	}
}

// Action Creators
export function loadSongs(songs) {
	return {type: LOAD, songs}
}
