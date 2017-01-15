import React from 'react';

const SongActionButton = ({song, loadedSong, playStatus, onPlay, onPause}) => {
	if (loadedSong === song.id && playStatus !== 'ended') {
		if (playStatus === 'play') {
			return <button style={{marginRight: 20}} onClick={() => onPause()}>Pause</button>;
		} else {
			return <button style={{marginRight: 20}} onClick={() => onPlay(song)}>Resume</button>;
		}
	} else {
		return <button style={{marginRight: 20}} onClick={() => onPlay(song)}>Preview</button>;
	}
}

const Song = ({song, playStatus, onPlay, onPause, loadedSong, children}) => (
	<div style={{marginTop: 20}}>
		<span style={{marginRight: 20}}>{song.name}</span>
		<span style={{marginRight: 20}}>{song.artists.join(', ')}</span>
		<span style={{marginRight: 20}}>{song.duration}</span>
		<SongActionButton song={song} onPlay={onPlay} onPause={onPause} loadedSong={loadedSong} playStatus={playStatus} />
		{children}
	</div>
);

export default Song
