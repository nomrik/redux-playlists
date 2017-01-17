import {connect} from 'react-redux';
import {getCurrentSongObject, getPlayStatus} from '../selectors';
import NowPlayingView from '../components/NowPlayingView';
import {setPlayStatus} from '../redux/modules/player';

function mapStateToProps(state) {
	return {
		song: getCurrentSongObject(state),
		playStatus: getPlayStatus(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onPlay: () => dispatch(setPlayStatus('play')),
		onPause: () => dispatch(setPlayStatus('pause'))
	};
}

const NowPlaying = connect(
	mapStateToProps,
	mapDispatchToProps
)(NowPlayingView);

export default NowPlaying;
