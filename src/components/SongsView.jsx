import React from 'react';
import Song from './Song';

const PlaylistSong = ({song, playStatus, onPlay, onPause, currentSong, onRemoveSong}) => (
	<Song
		song={song}
		playStatus={playStatus}
		onPlay={onPlay}
		onPause={onPause}
		currentSong={currentSong}>
		<button onClick={onRemoveSong}>Remove</button>
	</Song>
);

const SongsView = ({playlist, songs, playStatus, onPlay, onPlayAll, onPause, currentSong, onRemoveSong}) => (
	playlist.id ?
	<div style={{margin: 20}}>
		<span><h2>Songs for {playlist.name}</h2><button onClick={() => onPlay(songs)}>Play All</button></span>
		{songs.map(song =>
			<PlaylistSong
				key={song.id}
				song={song}
				playStatus={playStatus}
				onPlay={() => onPlay(songs.slice(songs.indexOf(song)))}
				onPause={onPause}
				currentSong={currentSong}
				onRemoveSong={() => onRemoveSong(playlist.id, song.id, song.id === currentSong)} />)}
	</div> : null
);

export default SongsView;
