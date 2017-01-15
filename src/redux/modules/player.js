// Actions
const SET_CURRENT_SONG = 'redux-playlists/player/SET_CURRENT_SONG';
const ADD_TO_QUEUE = 'redux-playlists/player/ADD_TO_QUEUE';
const REMOVE_FROM_QUEUE = 'redux-playlists/player/REMOVE_FROM_QUEUE';
const EMPTY_QUEUE = 'redux-playlists/player/EMPTY_QUEUE';
const PROGRESS_QUEUE = 'redux-playlists/player/PROGRESS_QUEUE';

// Reducer
export default function reducer(state = {currentSong: '', queue: []}, action = {}) {
	switch (action.type) {
		case SET_CURRENT_SONG:
			return {
				...state,
				currentSong: action.songUrl
			};
		case ADD_TO_QUEUE:
			return {
				...state,
				queue: [...state.queue, action.songUrl]
			};
		case REMOVE_FROM_QUEUE:
			return {
				...state,
				queue: state.queue.filter(songUrl => songUrl !== action.songUrl)
			};
		case EMPTY_QUEUE:
			return {
				...state,
				queue: []
			};
		case PROGRESS_QUEUE:
			let newQueue = state.queue.slice(1);
			return {
				currentSong: state.queue[0],
				queue: newQueue
			};
		default:
	}
}

// Action Creators
export function setCurrentSong(songUrl) {
	return {type: SET_CURRENT_SONG, songUrl}
}

export function addToQueue(songUrl) {
	return {type: ADD_TO_QUEUE, songUrl}
}

export function removeFromQueue(songUrl) {
	return {type: REMOVE_FROM_QUEUE, songUrl}
}

export function emptyQueue(songUrl) {
	return {type: EMPTY_QUEUE, songUrl}
}

export function progressQueue() {
	return {type: PROGRESS_QUEUE}
}
