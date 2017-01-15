// Actions
const SET_CURRENT_SONG = 'redux-playlists/player/SET_CURRENT_SONG';
const SET_PLAY_STATUS = 'redux-playlists/player/SET_PLAY_STATUS';
const ADD_TO_QUEUE = 'redux-playlists/player/ADD_TO_QUEUE';
const REMOVE_FROM_QUEUE = 'redux-playlists/player/REMOVE_FROM_QUEUE';
const EMPTY_QUEUE = 'redux-playlists/player/EMPTY_QUEUE';
const PROGRESS_QUEUE = 'redux-playlists/player/PROGRESS_QUEUE';

// Reducer
export default function reducer(state = {currentSong: '', queue: [], playStatus: ''}, action = {}) {
	switch (action.type) {
		case SET_CURRENT_SONG:
			return {
				...state,
				currentSong: action.songId
			};
			case SET_PLAY_STATUS:
				return {
					...state,
					playStatus: action.playStatus
				};
		case ADD_TO_QUEUE:
			return {
				...state,
				queue: [...state.queue, action.songId]
			};
		case REMOVE_FROM_QUEUE:
			return {
				...state,
				queue: state.queue.filter(songId => songId !== action.songId)
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
			return state;
	}
}

// Action Creators
export function setCurrentSong(songId) {
	return {type: SET_CURRENT_SONG, songId}
}

export function setPlayStatus(playStatus) {
	return {type: SET_PLAY_STATUS, playStatus}
}

export function addToQueue(songId) {
	return {type: ADD_TO_QUEUE, songId}
}

export function removeFromQueue(songId) {
	return {type: REMOVE_FROM_QUEUE, songId}
}

export function emptyQueue(songId) {
	return {type: EMPTY_QUEUE, songId}
}

export function progressQueue() {
	return {type: PROGRESS_QUEUE}
}
