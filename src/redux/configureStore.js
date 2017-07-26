import { createStore, combineReducers } from 'redux';
import users from './modules/users';
import activeUser from './modules/activeUser';
import playlists from './modules/playlists';
import activePlaylist from './modules/activePlaylist';
import searchedSongs from './modules/searchedSongs';
import isSearching from './modules/isSearching';
import savedSongs from './modules/savedSongs';
import player from './modules/player';
import colors from './modules/colors';
import token from './modules/token';

const reducer = combineReducers({
  users,
	activeUser,
	playlists,
	activePlaylist,
	searchedSongs,
	isSearching,
	savedSongs,
	player,
	colors,
	token
});

const configureStore = (initialState) => createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default configureStore;
