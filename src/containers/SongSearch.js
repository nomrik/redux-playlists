import {connect} from 'react-redux';
import {loadSongs} from '../redux/modules/searchedSongs';
import {addSongToPlaylist} from '../redux/modules/playlists';
import {setCurrentSong, setPlayStatus} from '../redux/modules/player';
import Spotify from '../utils/SpotifyHelper';
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
		onPlay: song => {
			dispatch(setCurrentSong(song.id));
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
