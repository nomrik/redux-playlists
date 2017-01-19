// Actions
const SET_CURRENT_SONG = 'redux-playlists/player/SET_CURRENT_SONG';
const SET_PLAY_STATUS = 'redux-playlists/player/SET_PLAY_STATUS';
const SET_VOLUME = 'redux-playlists/player/SET_VOLUME';
const ADD_TO_QUEUE = 'redux-playlists/player/ADD_TO_QUEUE';
const MOVE_BACK = 'redux-playlists/player/MOVE_BACK';
const REMOVE_FROM_QUEUE = 'redux-playlists/player/REMOVE_FROM_QUEUE';
const RESET_PLAYER = 'redux-playlists/player/RESET_PLAYER';
const PROGRESS_QUEUE = 'redux-playlists/player/PROGRESS_QUEUE';

// Reducer
export default function reducer(state = {queue: [], previousSongs: [], playStatus: '', volume: 1}, action = {}) {
	switch (action.type) {
		case SET_CURRENT_SONG:
			return {
				...state,
				currentSong: action.songId
			};
			case SET_VOLUME:
				return {
					...state,
					volume: action.volume
				}
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
		case MOVE_BACK:
			let previousSongsLength = state.previousSongs.length;
			let lastSong = previousSongsLength > 0 ? state.previousSongs[previousSongsLength - 1] : '';
			return previousSongsLength > 0 ? {
				...state,
				currentSong: lastSong,
				queue: [state.currentSong, ...state.queue],
				previousSongs: state.previousSongs.slice(0, previousSongsLength - 1)
			} : state
		case REMOVE_FROM_QUEUE:
			return {
				...state,
				queue: state.queue.filter(songId => songId !== action.songId)
			};
		case RESET_PLAYER:
			return {
				playStatus: '',
				queue: [],
				previousSongs: [],
				volume: 1
			};
		case PROGRESS_QUEUE:
			let newQueue = state.queue.slice(1);
			return state.queue.length > 0 ? {
				...state,
				currentSong: state.queue[0],
				queue: newQueue,
				previousSongs: state.currentSong ? [...state.previousSongs, state.currentSong] : state.previousSongs
			} : state;
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

export function setVolume(volume) {
	return {type: SET_VOLUME, volume}
}

export function addToQueue(songId) {
	return {type: ADD_TO_QUEUE, songId}
}

export function moveBack(songId) {
	return {type: MOVE_BACK, songId}
}

export function removeFromQueue(songId) {
	return {type: REMOVE_FROM_QUEUE, songId}
}

export function resetPlayer(songId) {
	return {type: RESET_PLAYER, songId}
}

export function progressQueue() {
	return {type: PROGRESS_QUEUE}
}
