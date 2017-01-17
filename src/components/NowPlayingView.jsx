import React from 'react';
import FontAwesome from 'react-fontawesome';

const PlayOrPauseControl = ({playStatus, onPlay, onPause, className}) => (
	<div className={className} onClick={playStatus === 'play' ? onPause : onPlay}>
		{playStatus === 'play' ?
			<FontAwesome name='pause' size='2x' />
			:
			<FontAwesome name='play' size='2x' />}
	</div>
)

export default class NowPlayingView extends React.Component {
	state = {
		showControl: false
	}

	render() {
		let {song, playStatus, onPlay, onPause} = this.props;
		return (
			song ? <div
				onMouseEnter={() => this.setState({showControl: true})}
				onMouseLeave={() => this.setState({showControl: false})}
				className='now-playing-view'
				style={{backgroundImage: `url(${song.albumImage})`}}>
				{this.state.showControl && <div className='now-playing-view--song-name'>{song.name}</div>}
				{this.state.showControl && <PlayOrPauseControl className='now-playing-view--control' playStatus={playStatus} onPlay={onPlay} onPause={onPause} />}
			</div> : null
		);
	}
}
