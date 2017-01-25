import {connect} from 'react-redux';
import {getCurrentSongObject, getPlayStatus, getVolume, getCurrentTime, getRemainingTime, getDuration} from '../selectors';
import NowPlayingView from '../components/NowPlayingView';
import {setPlayStatus, progressQueue, moveBack, setVolume, addPendingChange, changesTypes, setCurrentTime} from '../redux/modules/player';
import {setBgColor, setFontColor} from '../redux/modules/colors';

function mapStateToProps(state) {
	return {
		song: getCurrentSongObject(state),
		playStatus: getPlayStatus(state),
		volume: getVolume(state),
		currentTime: getCurrentTime(state),
		remainingTime: getRemainingTime(state),
		duration: getDuration(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onPlay: () => {
			dispatch(setPlayStatus('play'));
			dispatch(addPendingChange({type: changesTypes.PLAY_STATUS}));
		},
		onPause: () => {
			dispatch(setPlayStatus('pause'));
			dispatch(addPendingChange({type: changesTypes.PLAY_STATUS}));
		},
		onForward: () => dispatch(progressQueue()),
		onBack: () => dispatch(moveBack()),
		onSetVolume: volume => {
			dispatch(setVolume(volume))
			dispatch(addPendingChange({type: changesTypes.VOLUME}));
		},
		onSetCurrentTime: currentTime => {
			dispatch(setCurrentTime(currentTime));
			dispatch(addPendingChange({type: changesTypes.CURRENT_TIME}));
		},
		onSetBgColor: color => dispatch(setBgColor(color)),
		onSetFontColor: color => dispatch(setFontColor(color))
	};
}

const NowPlaying = connect(
	mapStateToProps,
	mapDispatchToProps
)(NowPlayingView);

export default NowPlaying;
