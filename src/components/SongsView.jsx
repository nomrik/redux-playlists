import React from 'react';
import Song from './Song';

const PlaylistSong = ({song, playStatus, onPlay, onPause, loadedSong, onRemoveSong}) => (
	<Song
		song={song}
		playStatus={playStatus}
		onPlay={onPlay}
		onPause={onPause}
		loadedSong={loadedSong}>
		<button onClick={onRemoveSong}>Remove</button>
	</Song>
);

const SongsView = ({playlist, songs, playStatus, onPlay, onPlayAll, onPause, loadedSong, onRemoveSong}) => (
	playlist.id ?
	<div style={{margin: 20}}>
		<span><h2>Songs for {playlist.name}</h2><button onClick={() => onPlayAll(songs)}>Play All</button></span>
		{songs.map(song =>
			<PlaylistSong
				key={song.id}
				song={song}
				playStatus={playStatus}
				onPlay={onPlay}
				onPause={onPause}
				loadedSong={loadedSong}
				onRemoveSong={() => onRemoveSong(playlist.id, song.id)} />)}
	</div> : null
);

export default SongsView;
