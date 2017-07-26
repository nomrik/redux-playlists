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

const SongsView = ({playlist, songs, playStatus, onPlay, onPlayAll, onPause, currentSong, onRemoveSong}) => {
	let songsWithPreview = songs.filter(song => song.previewUrl);
	return ( playlist.id ?
		<div className='songs-view'>
			<h2 className='songs-view--title'>{playlist.name}</h2>
			{songs.map(song =>
				<PlaylistSong
					key={song.id}
					song={song}
					playStatus={playStatus}
					onPlay={() => onPlay(songs, songsWithPreview.indexOf(song))}
					onPause={onPause}
					currentSong={currentSong}
					onRemoveSong={() => onRemoveSong(playlist.id, song.id, song.id === currentSong)} />)}
 		</div> : null
	)
};

export default SongsView;
