import React from 'react';
import FontAwesome from 'react-fontawesome';
import {convertSecondsToDisplayFormat} from '../utils/TimeFormatter';
import getPixels from 'get-pixels';
import getPalette from 'get-rgba-palette';

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

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

const VolumeControl = ({volume, onSetVolume}) => (
	<input value={volume * 100} onChange={e => onSetVolume(e.target.value / 100)} type='range' min={0} max={100} />
);

const TimerControl = ({currentTime, remainingTime, duration, onSetCurrentTime}) => (
	<div>
		<span>{convertSecondsToDisplayFormat(currentTime)}</span>
		<span className='now-playing-view--timer-control'>
			<input value={currentTime} onChange={e => onSetCurrentTime(e.target.value)} type='range' min={0} max={duration} />
		</span>
		<span>{convertSecondsToDisplayFormat(remainingTime)}</span>
	</div>
);

export default class NowPlayingView extends React.Component {
	state = {
		showControl: false
	}

	componentDidUpdate(prevProps) {
		let {onSetBgColor, onSetFontColor} = this.props;
		if (this.props.song && (prevProps.song ? (this.props.song.albumImage !== prevProps.song.albumImage) : true)) {
			getPixels(this.props.song.albumImage, (err, pixels) => {
				let colors = getPalette(pixels.data);
				onSetBgColor(rgbToHex(...colors[0]));
				onSetFontColor(rgbToHex(...colors[1]));
			});
		}
	}

	render() {
		let {song, playStatus, volume, onPlay, onPause, onForward, onBack, onSetVolume, onSetCurrentTime, currentTime, remainingTime, duration} = this.props;
		return (
			song ? <div
				onMouseEnter={() => this.setState({showControl: true})}
				onMouseLeave={() => this.setState({showControl: false})}
				className='now-playing-view'
				style={{backgroundImage: `url(${song.albumImage})`}}>
				{this.state.showControl &&
					<div className='now-playing-view--song-name'>
						<div>{song.name}</div>
						<TimerControl currentTime={currentTime} remainingTime={remainingTime} duration={duration} onSetCurrentTime={onSetCurrentTime}/>
					</div>
				}
				{this.state.showControl && <PlayerControls playStatus={playStatus} onPlay={onPlay} onForward={onForward} onBack={onBack} onPause={onPause} />}
				{this.state.showControl && <VolumeControl volume={volume} onSetVolume={onSetVolume} />}
			</div> : null
		);
	}
}
