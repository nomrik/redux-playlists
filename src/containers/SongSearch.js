import {connect} from 'react-redux';
import {loadSongs} from '../redux/modules/searchedSongs';
import {addSongToPlaylist} from '../redux/modules/playlists';
import Spotify from '../utils/SpotifyHelper';
import {getSearchedSongsList, getActivePlaylist} from '../selectors'
import SongSearchView from '../components/SongSearchView';

function mapStateToProps(state) {
	return {
		activeUser: state.activeUser,
		activePlaylist: getActivePlaylist(state),
		songs: getSearchedSongsList(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onSearchSongs: searchTerm => Spotify.search(searchTerm).then(songs => dispatch(loadSongs(songs))),
		onAddSongToPlaylist: (playlistId, song) => dispatch(addSongToPlaylist(playlistId, song))
	};
}

const SongSearch = connect(
	mapStateToProps,
	mapDispatchToProps
)(SongSearchView);

export default SongSearch;
