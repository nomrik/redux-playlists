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

		if (nextProps.playStatus === 'play') {
			this.audio.play();
		} else if (nextProps.playStatus === 'pause') {
			this.audio.pause();
		}

	}

	render() {
		let {playStatus, usersCount} = this.props;
		return ( usersCount > 0 ?
			<div className='app-view'>
				<div className='app-view--top'>
					<Playlists />
					<Songs playStatus={playStatus}/>
					<Users />
				</div>
				<div className='app-view--bottom'>
					<NowPlaying />
					<SongSearch playStatus={playStatus}/>
				</div>
			</div> : <SignUp />
		);
	}
}

export default AppView;
