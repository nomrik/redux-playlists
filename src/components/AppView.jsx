import React from 'react';
import Users from '../containers/Users';
import Playlists from '../containers/Playlists';
import SongSearch from '../containers/SongSearch';
import Songs from '../containers/Songs';
import SignUp from '../containers/SignUp';
import NowPlaying from '../containers/NowPlaying';
import {changesTypes} from '../redux/modules/player';

class AppView extends React.Component {

	constructor(props) {
		super(props)
		this.playNext = this.playNext.bind(this);
	}

	componentDidMount() {
		this.audio = new Audio();
		this.audio.addEventListener('ended', this.playNext);
		this.audio.addEventListener('durationchange', () => this.props.onSetDuration(Math.round(this.audio.duration)))
		this.audio.addEventListener('timeupdate', () => this.props.onSetCurrentTime(Math.round(this.audio.currentTime)))
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
			if (this.props.playStatus === 'play') {
				this.audio.play();
			} else if (this.props.playStatus === 'pause') {
				this.audio.pause();
			}
		}
	}

	componentDidUpdate() {
		let {pendingChanges, onRemovePendingChange} = this.props;
		pendingChanges.forEach(change => {
			switch (change.type) {
				case changesTypes.PLAY_STATUS:
					if (this.props.playStatus === 'play') {
						this.audio.play();
					} else if (this.props.playStatus === 'pause') {
						this.audio.pause();
					}
					break;
				case changesTypes.VOLUME:
					this.audio.volume = this.props.volume;
					break;
				case changesTypes.CURRENT_TIME:
					this.audio.currentTime = this.props.currentTime;
					break;
				default:
					return
			}
			onRemovePendingChange(change.type)
		})
	}

	render() {
		let {usersCount, bgColor, fontColor} = this.props;
		return ( usersCount > 0 ?
			<div className='app-view' style={{backgroundColor: bgColor, color: fontColor, borderColor: fontColor}}>
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
