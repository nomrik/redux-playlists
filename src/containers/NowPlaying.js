import {connect} from 'react-redux';
import {getCurrentSongObject, getPlayStatus, getVolume, getCurrentTime, getRemainingTime, getDuration} from '../selectors';
import NowPlayingView from '../components/NowPlayingView';
import {setPlayStatus, progressQueue, moveBack, setVolume} from '../redux/modules/player';

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
		onPlay: () => dispatch(setPlayStatus('play')),
		onPause: () => dispatch(setPlayStatus('pause')),
		onForward: () => dispatch(progressQueue()),
		onBack: () => dispatch(moveBack()),
		onSetVolume: volume => dispatch(setVolume(volume))
	};
}

const NowPlaying = connect(
	mapStateToProps,
	mapDispatchToProps
)(NowPlayingView);

export default NowPlaying;
