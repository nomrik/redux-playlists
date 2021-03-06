import React from 'react';
import FontAwesome from 'react-fontawesome';
import onClickOutside from 'react-onclickoutside';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isInEditMode: props.isInEditMode,
			newPlaylistName: props.playlist.name
		}
	}

	renamePlaylist() {
		let {playlist: {id}, onRenamePlaylist} = this.props;
		onRenamePlaylist(id, this.state.newPlaylistName);
		this.setState({isInEditMode: false});
	}

	handleClickOutside() {
		if (this.state.isInEditMode) {
			this.renamePlaylist();
		}
	}

	handleKeyDown(e) {
		switch (e.key) {
			case 'Enter':
				this.renamePlaylist();
				this.setState({isInEditMode: false});
				break;
			case 'Escape':
				this.setState({newPlaylistName: this.props.playlist.name, isInEditMode: false});
				break;
			default:
				return;
		}
	}

	componentDidMount() {
		if (this.props.isInEditMode) {
			this.input.focus();
			this.input.select();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.isInEditMode && !prevState.isInEditMode) {
			this.input.focus();
			this.input.select();
		}
	}

	render() {
		let {playlist, onSwitchPlaylist, onDeletePlaylist, isActive} = this.props;
		return (
			<div className='playlist-view'>
				{!this.state.isInEditMode ?
					<span className='playlist-view--playlist-name' onClick={onSwitchPlaylist} onDoubleClick={() => this.setState({isInEditMode: true})} style={{fontWeight: isActive ? 'bold' : 'normal'}}>{playlist.name}</span>
					:
					<input className='playlist-view--playlist-edit' ref={input => this.input = input} value={this.state.newPlaylistName} onChange={e =>  this.setState({newPlaylistName: e.target.value})} onKeyDown={e => this.handleKeyDown(e)} />
				}
				<FontAwesome name='close' onClick={onDeletePlaylist} />
			</div>
		);
	}
}

Playlist = onClickOutside(Playlist);

class PlaylistsView extends React.Component {

	createPlaylist() {
		let {onCreatePlaylist, activeUser} = this.props;
		onCreatePlaylist(activeUser, 'Playlist');
	}

	render() {
		let {playlists, activeUser, activePlaylist, currentSong, searchedSongs, onDeletePlaylist, onSwitchPlaylist, onRenamePlaylist} = this.props;
		return (
			activeUser ?
			<div className='playlists-view'>
				<h2 className='playlists-view--title'>Playlists</h2>
				<FontAwesome name='plus' onClick={() => this.createPlaylist()}	/>
				{playlists.map(playlist =>
					<Playlist
						key={playlist.id}
						playlist={playlist}
						onSwitchPlaylist={() => onSwitchPlaylist(playlist.id)}
						onDeletePlaylist={() => onDeletePlaylist(playlist.id, playlist.songs, currentSong, searchedSongs)}
						onRenamePlaylist={onRenamePlaylist}
						isActive={activePlaylist === playlist.id}
						isInEditMode={playlist.isInEditMode}/>)}
			</div> : null
		);
	}
}

export default PlaylistsView;
