import { connect } from 'react-redux';
import AppView from '../components/AppView';
import {progressQueue, setPlayStatus} from '../redux/modules/player';
import {getCurrentSong, getNextSong, getCurrentSongUrl, getNextSongUrl, getPlayStatus} from '../selectors';

function mapStateToProps(state) {
	return {
		currentSong: getCurrentSong(state),
		nextSong: getNextSong(state),
		currentSongUrl: getCurrentSongUrl(state),
		nextSongUrl: getNextSongUrl(state),
		playStatus: getPlayStatus(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		playNextSong: () => {
			dispatch(progressQueue());
			dispatch(setPlayStatus('play'));
		},
		endPlaying: () => dispatch(setPlayStatus('ended'))
	}
}

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppView);

export default App;
