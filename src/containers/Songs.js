import {connect} from 'react-redux';
import {getSongsListOfActivePlaylist, getActivePlaylist} from '../selectors';
import {removeSongFromPlaylist} from '../redux/modules/playlists';
import SongsView from '../components/SongsView';

function mapStateToProps(state) {
	return {
		songs: getSongsListOfActivePlaylist(state),
		playlist: getActivePlaylist(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onRemoveSong: (playlistId, songId) => dispatch(removeSongFromPlaylist(playlistId, songId))
	};
}

const Songs = connect(
	mapStateToProps,
	mapDispatchToProps
)(SongsView);

export default Songs;
