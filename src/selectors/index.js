import map from 'lodash/map';
import filter from 'lodash/filter';

import { createSelector } from 'reselect';

const getUsers = state => state.users;
export const getPlaylists = state => state.playlists;
const getActiveUser = state => state.activeUser;
const getActivePlaylistId = state => state.activePlaylist.playlist;
const getSearchedSongs = state => state.searchedSongs;
const getSavedSongs = state => state.savedSongs;

export const getUsersList = createSelector(
	[getUsers],
	(users) => map(users, user => user.id)
);

export const getActivePlaylist = createSelector(
	[getPlaylists, getActivePlaylistId],
	(playlists, activePlaylistId) => playlists[activePlaylistId] ? playlists[activePlaylistId] : {}
);

export const getPlaylistOfActiveUser = createSelector(
	[getPlaylists, getActiveUser],
	(playlists, activeUser) => filter(playlists, playlist => playlist.user === activeUser)
);

export const getSearchedSongsList = createSelector(
	[getSearchedSongs],
	(songs) => map(songs, song => song)
);

export const getSongsListOfActivePlaylist = createSelector(
	[getPlaylists, getActivePlaylist, getSavedSongs],
	(playlists, activePlaylist, savedSongs) => map(activePlaylist.songs, songId => savedSongs[songId])
);
