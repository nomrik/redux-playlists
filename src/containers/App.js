import { connect } from 'react-redux';
import AppView from '../components/AppView';
import {progressQueue, setPlayStatus, setDuration, setCurrentTime} from '../redux/modules/player';
import {getCurrentSong, getNextSong, getCurrentSongUrl, getNextSongUrl, getPlayStatus, getUsersList, getVolume} from '../selectors';

function mapStateToProps(state) {
	return {
		currentSong: getCurrentSong(state),
		nextSong: getNextSong(state),
		currentSongUrl: getCurrentSongUrl(state),
		nextSongUrl: getNextSongUrl(state),
		playStatus: getPlayStatus(state),
		usersCount: getUsersList(state).length,
		volume: getVolume(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		playNextSong: () => {
			dispatch(progressQueue());
			dispatch(setPlayStatus('play'));
		},
		endPlaying: () => dispatch(setPlayStatus('ended')),
		onSetDuration : duration => dispatch(setDuration(duration)),
		onSetCurrentTime : currentTime => dispatch(setCurrentTime(currentTime)),
	}
}

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppView);

export default App;
