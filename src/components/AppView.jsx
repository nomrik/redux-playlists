import React from 'react';
import Users from '../containers/Users';
import Playlists from '../containers/Playlists';
import SongSearch from '../containers/SongSearch';
import Songs from '../containers/Songs';
import SignUp from '../containers/SignUp';
import NowPlaying from '../containers/NowPlaying';

class AppView extends React.Component {

	constructor(props) {
		super(props)
		this.playNext = this.playNext.bind(this);
	}

	componentDidMount() {
		this.audio = new Audio();
		this.audio.addEventListener('ended', this.playNext);
	}

	playNext() {
		let {playNextSong, endPlaying} = this.props;
		switch (this.props.nextSong) {
			case null:
				endPlaying();
				break;
			default:
				playNextSong();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.currentSong !== this.props.currentSong) {
			this.audio.src = nextProps.currentSongUrl;
		}
	}

	componentDidUpdate() {
		this.audio.volume = this.props.volume;
		if (this.props.playStatus === 'play') {
			this.audio.play();
		} else if (this.props.playStatus === 'pause') {
			this.audio.pause();
		}
	}

	render() {
		let {usersCount} = this.props;
		return ( usersCount > 0 ?
			<div className='app-view'>
				<div className='app-view--top'>
					<Playlists />
					<Songs />
					<Users />
				</div>
				<div className='app-view--bottom'>
					<NowPlaying />
					<SongSearch />
				</div>
			</div> : <SignUp />
		);
	}
}

export default AppView;
