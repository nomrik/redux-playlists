import omit from 'lodash/omit';

// Actions from playlists modules
import {ADD_SONG, REMOVE_SONG} from './playlists';

export default function reducer(state = {}, action = {}) {
	switch (action.type) {
		case ADD_SONG:
			return state.hasOwnProperty(action.song.id) ? {
					...state,
					[action.song.id]: {
						...state[action.song.id],
						count: state[action.song.id].count + 1
					}
				} : {
					...state,
					[action.song.id]: {
						...action.song,
						count: 1
					}
				};
		case REMOVE_SONG:
			return state[action.song].count > 1 ? {
				...state,
				[action.song]: {
					...state[action.song],
					count: state[action.song].count - 1
				}
			} : omit(state, [action.song]);
		default:
			return state;
	}
}
