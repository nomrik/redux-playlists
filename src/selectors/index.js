import map from 'lodash/map';
import filter from 'lodash/filter';

import { createSelector } from 'reselect';

const getUsers = state => state.users;
export const getPlaylists = state => state.playlists;
const getActiveUser = state => state.activeUser;
const getActivePlaylistId = state => state.activePlaylist.playlist;
const getSearchedSongs = state => state.searchedSongs;
const getSavedSongs = state => state.savedSongs;
export const getCurrentSong = state => state.player.currentSong;
export const getNextSong = state => state.player.queue.length > 0 ? state.player.queue[0] : null;
export const getPlayStatus = state => state.player.playStatus;


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

export const getCurrentSongUrl = createSelector(
	[getCurrentSong, getSavedSongs, getSearchedSongs],
	(currentSong, savedSongs, searchedSongs) => {
		let combinedSongs = Object.assign({}, savedSongs, searchedSongs);
		console.log(combinedSongs.hasOwnProperty(currentSong) ? combinedSongs[currentSong].previewUrl : '');
		return combinedSongs.hasOwnProperty(currentSong) ? combinedSongs[currentSong].previewUrl : '';
	}
);

export const getNextSongUrl = createSelector(
	[getNextSong, getSavedSongs],
	(nextSong, savedSongs) => savedSongs.hasOwnProperty(nextSong) ? savedSongs[nextSong].previewUrl : ''
);
