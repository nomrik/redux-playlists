import omit from 'lodash/omit';

// Actions
export const CREATE = 'redux-playlists/users/CREATE';
export const DELETE = 'redux-playlists/users/DELETE';

// Reducer
export default function reducer(state = {}, action = {}) {
	switch (action.type) {
		case CREATE:
			if (state.hasOwnProperty(action.userName)) {
				throw new Error('There is already a user by that name!')
			}
			return {
				...state,
				[action.userName]: {
					id: action.userName,
					created: new Date()
				}
			};
		case DELETE:
			return omit(state, [action.userName]);
		default:
			return state;
	}
}

// Action Creators
export function createUser(userName) {
	return { type: CREATE, userName }
}

export function deleteUser(userName) {
	return { type: DELETE, userName }
}
