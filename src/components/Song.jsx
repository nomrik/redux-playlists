import React from 'react';
import FontAwesome from 'react-fontawesome';

const SongActionButton = ({song, currentSong, playStatus, onPlay, onPause}) => {
	if (!song.previewUrl) {return null}
	if (currentSong && currentSong.id === song.id && playStatus !== 'ended') {
		if (playStatus === 'play') {
			return <FontAwesome name='pause' onClick={() => onPause()} />;
		} else {
			return <FontAwesome name='play' onClick={() => onPlay(song)} />;
		}
	} else {
		return <FontAwesome name='play' onClick={() => onPlay(song)} />;
	}
}

const Song = ({song, playStatus, onPlay, onPause, currentSong, children}) => (
	<div className='song-view'>
		<SongActionButton song={song} onPlay={onPlay} onPause={onPause} currentSong={currentSong} playStatus={playStatus} />
		<span className='song-view--song-name'>{song.name}</span>
		<span className='song-view--song-artists'>{song.artists.join(', ')}</span>
		<span className='song-view--song-duration'>{song.duration}</span>
		{children}
	</div>
);

export default Song
