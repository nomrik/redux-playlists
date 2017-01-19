import React from 'react';
import isEqual from 'lodash/isEqual';
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
		this.renamePlaylist();
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
		const inputStyle = {
			marginRight: 10,
    	border: 'none',
    	padding: 4,
    	borderRadius: 5,
		};
		return (
			<div style={{marginTop: 20}}>
				{!this.state.isInEditMode ?
					<span onClick={onSwitchPlaylist} onDoubleClick={() => this.setState({isInEditMode: true})} style={{cursor: 'pointer', fontWeight: isActive ? 'bold' : 'normal', marginRight: 20}}>{playlist.name}</span>
					:
					<input ref={input => this.input = input} style={inputStyle} value={this.state.newPlaylistName} onChange={e =>  this.setState({newPlaylistName: e.target.value})} onKeyDown={e => this.handleKeyDown(e)} />
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
			<div style={{margin: 20, width: 230}}>
				<h2 style={{marginRight: 10, display: 'inline'}}>Playlists</h2>
				<FontAwesome name='plus' onClick={() => this.createPlaylist()}	/>
				{playlists.map(playlist =>
					<Playlist
						key={playlist.id}
						playlist={playlist}
						onSwitchPlaylist={() => onSwitchPlaylist(activeUser, playlist.id)}
						onDeletePlaylist={() => onDeletePlaylist(activeUser, playlist.id, playlist.songs, currentSong, searchedSongs)}
						onRenamePlaylist={onRenamePlaylist}
						isActive={isEqual(activePlaylist, {user: activeUser, playlist: playlist.id})}
						isInEditMode={playlist.isInEditMode}/>)}
			</div> : null
		);
	}
}

export default PlaylistsView;
