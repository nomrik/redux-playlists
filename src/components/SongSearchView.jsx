import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Song from './Song';
import InputAction from './InputAction';

const SongSearchResult = ({song, onAdd, isActivePlaylist, playStatus, onPlay, onPause, currentSong}) => (
	<Song
		song={song}
		playStatus={playStatus}
		onPlay={onPlay}
		onPause={onPause}
		currentSong={currentSong}>
		{isActivePlaylist && <span><button onClick={onAdd}>Add To Playlist</button></span>}
	</Song>
);

class SongSearchView extends React.Component {
	state = {
		searchTerm: ''
	}

	searchSongs() {
		let {onSearchSongs} = this.props;
		onSearchSongs(this.state.searchTerm);
		this.clearInputField();
	}

	clearInputField() {
		this.setState({searchTerm: ''});
	}

	handleKeyDown(e) {
		switch (e.key) {
			case 'Enter':
				this.searchSongs();
				break;
			case 'Escape':
				this.clearInputField();
				break;
			default:
				return;
		}
	}

	render() {
		let {songs, activeUser, activePlaylist, onAddSongToPlaylist, onPlay, playStatus, onPause, currentSong} = this.props;
		return (
			activeUser ?
			<div style={{margin: 20}}>
				<h2>Search For Songs</h2>
				<InputAction
					value={this.state.searchTerm}
					onKeyDown={e => this.handleKeyDown(e)}
					onChange={(e) => this.setState({searchTerm: e.target.value})}
					onAction={() => this.searchSongs()}
					actionText='Search' />
				{songs.map(song =>
					<SongSearchResult
						key={song.id}
						onPlay={onPlay}
						onPause={onPause}
						song={song}
						onAdd={() => activePlaylist.songs.includes(song.id) ? null : onAddSongToPlaylist(activePlaylist.id, song)}
						currentSong={currentSong}
						playStatus={playStatus}
						isActivePlaylist={!isEmpty(activePlaylist)}/>)}
			</div> : null
		);
	}
}

export default SongSearchView;
