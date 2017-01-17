import {connect} from 'react-redux';
import {loadSongs} from '../redux/modules/searchedSongs';
import {addSongToPlaylist} from '../redux/modules/playlists';
import {setPlayStatus, resetPlayer, addToQueue, progressQueue} from '../redux/modules/player';
import Spotify from '../utils/SpotifyHelper';
import times from 'lodash/times';
import {getSearchedSongsList, getActivePlaylist, getCurrentSongObject} from '../selectors'
import SongSearchView from '../components/SongSearchView';

function mapStateToProps(state) {
	return {
		activeUser: state.activeUser,
		activePlaylist: getActivePlaylist(state),
		songs: getSearchedSongsList(state),
		currentSong: getCurrentSongObject(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onSearchSongs: (searchTerm, currentSong) => {
			return Spotify.search(searchTerm).then(songs => {
				currentSong ?
				dispatch(loadSongs({...songs, [currentSong.id]: currentSong})) :
				dispatch(loadSongs(songs))
			}
		)},
		onAddSongToPlaylist: (playlistId, song) => dispatch(addSongToPlaylist(playlistId, song)),
		onPlay: (songs, startIndex) => {
			dispatch(resetPlayer());
			songs.forEach(song => dispatch(addToQueue(song.id)));
			times(startIndex + 1, () => dispatch(progressQueue()));
			dispatch(setPlayStatus('play'));
		},
		onPause: () => dispatch(setPlayStatus('pause'))
	};
}

const SongSearch = connect(
	mapStateToProps,
	mapDispatchToProps
)(SongSearchView);

export default SongSearch;
