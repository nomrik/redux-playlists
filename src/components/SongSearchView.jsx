import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Song from './Song';
import InputAction from './InputAction';
import FontAwesome from 'react-fontawesome';

const SongSearchResult = ({song, onAdd, isActivePlaylist, playStatus, onPlay, onPause, currentSong}) => (
	<Song
		song={song}
		playStatus={playStatus}
		onPlay={onPlay}
		onPause={onPause}
		currentSong={currentSong}>
		{isActivePlaylist && <FontAwesome name='plus' onClick={onAdd} />}
	</Song>
);

class SongSearchView extends React.Component {
	state = {
		searchTerm: ''
	}

	searchSongs() {
		let {onSearchSongs, currentSong} = this.props;
		onSearchSongs(this.state.searchTerm, currentSong);
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
		let {songs, activeUser, activePlaylist, isSearching, onAddSongToPlaylist, onPlay, playStatus, onPause, currentSong} = this.props;
		let songsWithPreview = songs.filter(song => song.previewUrl);
		return (
			activeUser ?
			<div className='song-search-view'>
				<h2>Search For Songs</h2>
				<InputAction
					value={this.state.searchTerm}
					onKeyDown={e => this.handleKeyDown(e)}
					onChange={(e) => this.setState({searchTerm: e.target.value})}
					onAction={() => this.searchSongs()}
					iconName='search' />
				{isSearching && <p>Searching...</p>}
				{!isSearching && <div className='song-search-view--search-resutls'>
					{isSearching !== null && (songs.length > 0 ? songs.map(song =>
						<SongSearchResult
							key={song.id}
							onPlay={() => onPlay(songs, songsWithPreview.indexOf(song))}
							onPause={onPause}
							song={song}
							onAdd={() => activePlaylist.songs.includes(song.id) ? null : onAddSongToPlaylist(activePlaylist.id, song)}
							currentSong={currentSong}
							playStatus={playStatus}
							isActivePlaylist={!isEmpty(activePlaylist)}/>) :
						<p>Sorry! No songs found.</p>)}
				</div>}
			</div> : null
		);
	}
}

export default SongSearchView;
