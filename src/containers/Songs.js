import {connect} from 'react-redux';
import {getSongsListOfActivePlaylist, getActivePlaylist, getCurrentSongObject} from '../selectors';
import {removeSongFromPlaylist} from '../redux/modules/playlists';
import times from 'lodash/times';
import {setPlayStatus, resetPlayer, addToQueue, progressQueue, removeFromQueue} from '../redux/modules/player';
import SongsView from '../components/SongsView';

function mapStateToProps(state) {
	return {
		songs: getSongsListOfActivePlaylist(state),
		playlist: getActivePlaylist(state),
		currentSong: getCurrentSongObject(state)
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
		onPlay: (songs, startIndex) => {
			dispatch(resetPlayer());
			songs.forEach(song => dispatch(addToQueue(song.id)));
			times(startIndex + 1, () => dispatch(progressQueue()));
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
