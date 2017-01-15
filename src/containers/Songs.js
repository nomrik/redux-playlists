import {connect} from 'react-redux';
import {getSongsListOfActivePlaylist, getActivePlaylist} from '../selectors';
import {removeSongFromPlaylist} from '../redux/modules/playlists';
import {setPlayStatus, emptyQueue, addToQueue, progressQueue, removeFromQueue} from '../redux/modules/player';
import SongsView from '../components/SongsView';

function mapStateToProps(state) {
	return {
		songs: getSongsListOfActivePlaylist(state),
		playlist: getActivePlaylist(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onRemoveSong: (playlistId, songId, isCurrent) => {
			dispatch(removeSongFromPlaylist(playlistId, songId));
			dispatch(removeFromQueue(songId));
			if (isCurrent) {
				dispatch(setPlayStatus('pause'));
			}
		},
		onPlay: songs => {
			dispatch(emptyQueue());
			songs.forEach(song => dispatch(addToQueue(song.id)));
			dispatch(progressQueue());
			dispatch(setPlayStatus('play'));
		},
		onPause: () => dispatch(setPlayStatus('pause')),
	};
}

const Songs = connect(
	mapStateToProps,
	mapDispatchToProps
)(SongsView);

export default Songs;
