import React from 'react';
import FontAwesome from 'react-fontawesome';

const PlayerControls = ({playStatus, onPlay, onBack, onForward, onPause, className}) => (
	<div className='now-playing-view--control'>
		<div className='now-playing-view--back' onClick={onBack}>
			<FontAwesome name='backward' size='2x' />
		</div>
		<div className='now-playing-view--play-pause' onClick={playStatus === 'play' ? onPause : onPlay}>
			{playStatus === 'play' ?
				<FontAwesome name='pause' size='2x' />
				:
				<FontAwesome name='play' size='2x' />}
		</div>
		<div className='now-playing-view--forward' onClick={onForward}>
			<FontAwesome name='forward' size='2x' />
		</div>
	</div>
);

export default class NowPlayingView extends React.Component {
	state = {
		showControl: false
	}

	render() {
		let {song, playStatus, onPlay, onPause, onForward, onBack} = this.props;
		return (
			song ? <div
				onMouseEnter={() => this.setState({showControl: true})}
				onMouseLeave={() => this.setState({showControl: false})}
				className='now-playing-view'
				style={{backgroundImage: `url(${song.albumImage})`}}>
				{this.state.showControl && <div className='now-playing-view--song-name'>{song.name}</div>}
				{this.state.showControl && <PlayerControls playStatus={playStatus} onPlay={onPlay} onForward={onForward} onBack={onBack} onPause={onPause} />}
				{/* {this.state.showControl && <input type='range' min={0} max={100} />} */}
			</div> : null
		);
	}
}
