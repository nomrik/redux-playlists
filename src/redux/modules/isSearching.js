// Actions
const SET_IS_SEARCHING = 'redux-playlists/isSearching/SET_IS_SEARCHING';

export default function reducer(state = null, action = {}) {
	switch (action.type) {
		case SET_IS_SEARCHING:
			return action.isSearching;
		default:
			return state
	}
}

export function setIsSearching(isSearching) {
	return {type: SET_IS_SEARCHING, isSearching};
}
