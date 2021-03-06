import omit from 'lodash/omit';
import uuid from 'uuid';

// Actions
const CREATE = 'redux-playlists/playlists/CREATE';
export const DELETE = 'redux-playlists/playlists/DELETE';
export const RENAME = 'redux-playlists/playlists/RENAME';
export const ADD_SONG = 'redux-playlists/playlists/ADD_SONG';
export const REMOVE_SONG = 'redux-playlists/playlists/REMOVE_SONG';

// Reducer
export default function reducer(state = {}, action = {}) {
	switch (action.type) {
		case CREATE:
			return {
				...state,
				[action.playlistId]: {
					id: action.playlistId,
					name: action.playlistName,
					user: action.userName,
					songs: [],
					created: new Date(),
					isInEditMode: true
				}
			};
		case DELETE:
			return omit(state, [action.playlistId]);
		case RENAME:
			return {
				...state,
				[action.playlistId]: {
					...state[action.playlistId],
					name: action.newName,
					isInEditMode: false
				}
			};
		case ADD_SONG:
			return {
				...state,
				[action.playlistId]: {
					...state[action.playlistId],
					songs: [...state[action.playlistId].songs, action.song.id]
				}
			}
			case REMOVE_SONG:
				return {
					...state,
					[action.playlistId]: {
						...state[action.playlistId],
						songs: state[action.playlistId].songs.filter(song => song !== action.song)
					}
				}
		default:
			return state;
	}
}

// Action Creators
export function createPlaylist(userName, playlistName) {
	let newId = uuid();
	return { type: CREATE, userName, playlistName, playlistId: newId };
}

export function deletePlaylist(playlistId) {
	return { type: DELETE, playlistId };
}

export function renamePlaylist(playlistId, newName) {
	return { type: RENAME, playlistId, newName };
}

export function addSongToPlaylist(playlistId, song) {
	return { type: ADD_SONG, playlistId, song };
}

export function removeSongFromPlaylist(playlistId, song) {
	return { type: REMOVE_SONG, playlistId, song };
}
