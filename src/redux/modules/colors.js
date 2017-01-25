// Actions
export const SET_BG_COLOR = 'redux-playlists/activeUser/SET_BG_COLOR';
export const SET_FONT_COLOR = 'redux-playlists/activeUser/SET_FONT_COLOR';

export default function reducer(state = {bgColor: '#525252', fontColor: 'white'}, action = {}) {
	switch (action.type) {
		case SET_BG_COLOR:
			return {
				...state,
				bgColor: action.color
			};
			case SET_FONT_COLOR:
				return {
					...state,
					fontColor: action.color
				};
			default:
				return state;
	}
}

export function setBgColor(color) {
	return {type: SET_BG_COLOR, color};
}

export function setFontColor(color) {
	return {type: SET_FONT_COLOR, color};
}
