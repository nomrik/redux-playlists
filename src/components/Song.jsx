import React from 'react';
import FontAwesome from 'react-fontawesome';

const SongActionButton = ({song, currentSong, playStatus, onPlay, onPause}) => {
	if (currentSong === song.id && playStatus !== 'ended') {
		if (playStatus === 'play') {
			return <FontAwesome name='pause' style={{marginRight: 20}} onClick={() => onPause()} />;
		} else {
			return <FontAwesome name='play' style={{marginRight: 20}} onClick={() => onPlay(song)} />;
		}
	} else {
		return <FontAwesome name='play' style={{marginRight: 20}} onClick={() => onPlay(song)} />;
	}
}

const Song = ({song, playStatus, onPlay, onPause, currentSong, children}) => (
	<div style={{marginTop: 20}}>
		<SongActionButton song={song} onPlay={onPlay} onPause={onPause} currentSong={currentSong} playStatus={playStatus} />
		<span style={{marginRight: 20}}>{song.name}</span>
		<span style={{marginRight: 20}}>{song.artists.join(', ')}</span>
		<span style={{marginRight: 20}}>{song.duration}</span>
		{children}
	</div>
);

export default Song
