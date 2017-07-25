// Actions
export const SET = 'redux-playlists/token/SET';

// Reducer
export default function reducer(state = '', action = {}) {
	switch (action.type) {
		case SET:
			return action.token;
		default:
			return state;
	}
}

// Action Creators
export function setToken(token) {
	return token ? { type: SET, token } : undefined;
}