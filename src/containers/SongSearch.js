import {connect} from 'react-redux';
import {loadSongs} from '../redux/modules/searchedSongs';
import {addSongToPlaylist} from '../redux/modules/playlists';
import {setPlayStatus, resetPlayer, addToQueue, progressQueue, addPendingChange, changesTypes} from '../redux/modules/player';
import Spotify from '../utils/SpotifyHelper';
import times from 'lodash/times';
import {getSearchedSongsList, getActivePlaylist, getCurrentSongObject, getPlayStatus} from '../selectors'
import SongSearchView from '../components/SongSearchView';

function mapStateToProps(state) {
	return {
		activeUser: state.activeUser,
		activePlaylist: getActivePlaylist(state),
		songs: getSearchedSongsList(state),
		currentSong: getCurrentSongObject(state),
		playStatus: getPlayStatus(state)
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
			dispatch(addPendingChange({type: changesTypes.PLAY_STATUS}));
		},
		onPause: () => {
			dispatch(setPlayStatus('pause'));
			dispatch(addPendingChange({type: changesTypes.PLAY_STATUS}));
		}
	};
}

const SongSearch = connect(
	mapStateToProps,
	mapDispatchToProps
)(SongSearchView);

export default SongSearch;
