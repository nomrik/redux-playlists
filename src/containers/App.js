import { connect } from 'react-redux';
import AppView from '../components/AppView';
import {progressQueue, setPlayStatus, setDuration, setCurrentTime, addPendingChange, removePendingChange} from '../redux/modules/player';
import {getCurrentSong, getNextSong, getCurrentSongUrl, getNextSongUrl, getPlayStatus, getUsersList, getVolume, getBgColor, getFontColor, getPendingChanges, getCurrentTime, getToken} from '../selectors';
import {setToken} from '../redux/modules/token';

function mapStateToProps(state) {
	return {
		currentSong: getCurrentSong(state),
		nextSong: getNextSong(state),
		currentSongUrl: getCurrentSongUrl(state),
		nextSongUrl: getNextSongUrl(state),
		playStatus: getPlayStatus(state),
		usersCount: getUsersList(state).length,
		volume: getVolume(state),
		pendingChanges: getPendingChanges(state),
		currentTime: getCurrentTime(state),
		bgColor: getBgColor(state),
		fontColor: getFontColor(state),
		token: getToken(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		playNextSong: () => {
			dispatch(progressQueue());
			dispatch(setPlayStatus('play'));
		},
		endPlaying: () => dispatch(setPlayStatus('ended')),
		onSetDuration: duration => dispatch(setDuration(duration)),
		onSetCurrentTime: currentTime => dispatch(setCurrentTime(currentTime)),
		onAddPendingChange: (type) => dispatch(addPendingChange({type})),
		onRemovePendingChange: type => dispatch(removePendingChange({type})),
		onSetToken: token => dispatch(setToken(token))
	}
}

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppView);

export default App;
