import {connect} from 'react-redux';
import {getPlaylistOfActiveUser, getSearchedSongsList, getCurrentSong} from '../selectors';
import {createPlaylist, deletePlaylist, removeSongFromPlaylist} from '../redux/modules/playlists';
import {setPlayStatus} from '../redux/modules/player';
import {switchPlaylist} from '../redux/modules/activePlaylist';
import PlaylistsView from '../components/PlaylistsView';

function mapStateToProps(state) {
	return {
		playlists: getPlaylistOfActiveUser(state),
		activeUser: state.activeUser,
		activePlaylist: state.activePlaylist,
		searchedSongs: getSearchedSongsList(state),
		currentSong: getCurrentSong(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onCreatePlaylist: (userName, playlistName) => dispatch(createPlaylist(userName, playlistName)),
		onDeletePlaylist: (userName, playlistId, songs, currentSong, searchedSongs) => {
			songs.forEach(song => {
				dispatch(removeSongFromPlaylist(playlistId, song));
				if (song === currentSong && !searchedSongs.map(song => song.id).includes(song)) {
					dispatch(setPlayStatus('pause'));
				}
			});
			dispatch(deletePlaylist(userName, playlistId));
		},
		onSwitchPlaylist: (userName, playlistId) => dispatch(switchPlaylist(userName, playlistId)),
	};
}

const Playlists = connect(
	mapStateToProps,
	mapDispatchToProps
)(PlaylistsView);

export default Playlists;
