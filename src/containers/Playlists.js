import {connect} from 'react-redux';
import {getPlaylistOfActiveUser} from '../selectors';
import {createPlaylist, deletePlaylist, removeSongFromPlaylist} from '../redux/modules/playlists';
import {switchPlaylist} from '../redux/modules/activePlaylist';
import PlaylistsView from '../components/PlaylistsView';

function mapStateToProps(state) {
	return {
		playlists: getPlaylistOfActiveUser(state),
		activeUser: state.activeUser,
		activePlaylist: state.activePlaylist
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onCreatePlaylist: (userName, playlistName) => dispatch(createPlaylist(userName, playlistName)),
		onDeletePlaylist: (userName, playlistId, songs) => {
			songs.forEach(song => dispatch(removeSongFromPlaylist(playlistId, song)));
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
