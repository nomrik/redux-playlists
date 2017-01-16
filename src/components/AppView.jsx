import React from 'react';
import Users from '../containers/Users';
import Playlists from '../containers/Playlists';
import SongSearch from '../containers/SongSearch';
import Songs from '../containers/Songs';
import SignUp from '../containers/SignUp';

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
		let {currentSong, playStatus, usersCount} = this.props;
		return ( usersCount > 0 ?
			<div style={{display: 'flex'}}>
				<Playlists />
				<Songs currentSong={currentSong} playStatus={playStatus}/>
				<SongSearch currentSong={currentSong} playStatus={playStatus}/>
				<Users />
			</div> : <SignUp />
		);
	}
}

export default AppView;
