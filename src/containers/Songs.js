import {connect} from 'react-redux';
import {getSongsListOfActivePlaylist, getActivePlaylist, getCurrentSongObject, getPlayStatus} from '../selectors';
import {removeSongFromPlaylist} from '../redux/modules/playlists';
import times from 'lodash/times';
import {setPlayStatus, resetPlayer, addToQueue, progressQueue, removeFromQueue, addPendingChange, changesTypes} from '../redux/modules/player';
import SongsView from '../components/SongsView';

function mapStateToProps(state) {
	return {
		songs: getSongsListOfActivePlaylist(state),
		playlist: getActivePlaylist(state),
		currentSong: getCurrentSongObject(state),
		playStatus: getPlayStatus(state)
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
			dispatch(addPendingChange({type: changesTypes.PLAY_STATUS}));
		},
		onPause: () => {
			dispatch(setPlayStatus('pause'));
			dispatch(addPendingChange({type: changesTypes.PLAY_STATUS}));
		}
	};
}

const Songs = connect(
	mapStateToProps,
	mapDispatchToProps
)(SongsView);

export default Songs;
