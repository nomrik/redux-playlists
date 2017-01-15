import React from 'react';
import Users from '../containers/Users';
import Playlists from '../containers/Playlists';
import SongSearch from '../containers/SongSearch';
import Songs from '../containers/Songs';

class AppView extends React.Component {
	constructor(props) {
		super(props);
		this.onPlay = this.onPlay.bind(this)
	}
	state = {
		loadedSong: '',
		playStatus: 'ended'
	}

	componentDidMount() {
		this.audio = new Audio();
		this.audio.addEventListener('ended', () => this.setState({playStatus: 'ended'}));
		this.audio.addEventListener('play', () => this.setState({playStatus: 'play'}));
		this.audio.addEventListener('pause', () => this.setState({playStatus: 'pause'}));
	}

	onPlay(song) {
		if (song.id !== this.state.loadedSong) {
			this.setState({loadedSong: song.id});
			this.audio.src = song.previewUrl;
			this.audio.load();
		}
		this.audio.play();
	}

	playNext(songs) {
		let songsCount = 1;
		let onPlay = this.onPlay;
		return function() {
			if (songsCount < songs.length) {
				onPlay(songs[songsCount]);
				songsCount++;
			}
		}
	}

	onPlayAll(songs) {
		this.audio.addEventListener('ended', this.playNext(songs));
		this.onPlay(songs[0]);
	}

	onPause() {
		this.audio.pause();
	}

	render() {
		let {loadedSong, playStatus, song: currentSong} = this.state;
		const playerProps = {
			loadedSong,
			playStatus,
			currentSong,
			onPause: () => this.onPause(),
			onPlay: song => this.onPlay(song),
			onPlayAll: songs => this.onPlayAll(songs)
		};
		return (
			<div style={{display: 'flex'}}>
				<Users />
				<Playlists />
				<Songs {...playerProps}/>
				<SongSearch {...playerProps}/>
			</div>
		);
	}
}

export default AppView;
