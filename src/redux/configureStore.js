import { createStore, combineReducers } from 'redux';
import users from './modules/users';
import activeUser from './modules/activeUser';
import playlists from './modules/playlists';
import activePlaylist from './modules/activePlaylist';
import searchedSongs from './modules/searchedSongs';
import savedSongs from './modules/savedSongs';

const reducer = combineReducers({
  users,
	activeUser,
	playlists,
	activePlaylist,
	searchedSongs,
	savedSongs
});

const configureStore = (initialState) => createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default configureStore;
