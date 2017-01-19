import React from 'react';
import Song from './Song';
import FontAwesome from 'react-fontawesome';

const PlaylistSong = ({song, playStatus, onPlay, onPause, currentSong, onRemoveSong}) => (
	<Song
		song={song}
		playStatus={playStatus}
		onPlay={onPlay}
		onPause={onPause}
		currentSong={currentSong}>
		<FontAwesome name='close' onClick={onRemoveSong} />
	</Song>
);

const SongsView = ({playlist, songs, playStatus, onPlay, onPlayAll, onPause, currentSong, onRemoveSong}) => (
	playlist.id ?
	<div style={{margin: 20}}>
		<h2 style={{marginTop: 0}}>{playlist.name}</h2>
		{songs.map(song =>
			<PlaylistSong
				key={song.id}
				song={song}
				playStatus={playStatus}
				onPlay={() => onPlay(songs, songs.indexOf(song))}
				onPause={onPause}
				currentSong={currentSong}
				onRemoveSong={() => onRemoveSong(playlist.id, song.id, song.id === currentSong)} />)}
	</div> : null
);

export default SongsView;
