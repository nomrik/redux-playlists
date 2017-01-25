import map from 'lodash/map';
import filter from 'lodash/filter';

import { createSelector } from 'reselect';

const getUsers = state => state.users;
export const getPlaylists = state => state.playlists;
const getActiveUser = state => state.activeUser;
const getActivePlaylistId = state => state.activePlaylist;
const getSearchedSongs = state => state.searchedSongs;
const getSavedSongs = state => state.savedSongs;
export const getCurrentSong = state => state.player.currentSong;
export const getNextSong = state => state.player.queue.length > 0 ? state.player.queue[0] : null;
export const getPlayStatus = state => state.player.playStatus;
export const getVolume = state => state.player.volume;
export const getDuration = state => state.player.duration;
export const getCurrentTime = state => state.player.currentTime;
export const getPendingChanges = state => state.player.pendingChanges;
export const getBgColor = state => state.colors.bgColor;
export const getFontColor = state => state.colors.fontColor;

export const getRemainingTime = createSelector(
	[getDuration, getCurrentTime],
	(duration, currentTime) => duration - currentTime
);

const getCombinedSongs = createSelector(
	[getSavedSongs, getSearchedSongs],
	(savedSongs, searchedSongs) => Object.assign({}, savedSongs, searchedSongs)
);

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
	[getCurrentSong, getCombinedSongs],
	(currentSong, combinedSongs) => combinedSongs.hasOwnProperty(currentSong) ? combinedSongs[currentSong].previewUrl : ''
);

export const getNextSongUrl = createSelector(
	[getNextSong, getSavedSongs],
	(nextSong, savedSongs) => savedSongs.hasOwnProperty(nextSong) ? savedSongs[nextSong].previewUrl : ''
);

export const getCurrentSongObject = createSelector(
	[getCurrentSong, getCombinedSongs],
	(currentSong, combinedSongs) => combinedSongs[currentSong]
);
