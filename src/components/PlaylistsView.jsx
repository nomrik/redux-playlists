import React from 'react';
import InputAction from './InputAction';
import isEqual from 'lodash/isEqual';
import FontAwesome from 'react-fontawesome';

const Playlist = ({playlist, onSwitchPlaylist, onDeletePlaylist, isActive}) => (
	<div style={{marginTop: 20}}>
		<span onClick={onSwitchPlaylist} style={{cursor: 'pointer', fontWeight: isActive ? 'bold' : 'normal', marginRight: 20}}>{playlist.name}</span>
		<FontAwesome name='close' onClick={onDeletePlaylist} />
	</div>
);

class PlaylistsView extends React.Component {
	state = {
		newPlaylistName: ''
	}

	createPlaylist() {
		let {onCreatePlaylist, activeUser} = this.props;
		onCreatePlaylist(activeUser, this.state.newPlaylistName);
		this.clearInputField();
	}

	clearInputField() {
		this.setState({newPlaylistName: ''});
	}

	handleKeyDown(e) {
		switch (e.key) {
			case 'Enter':
				this.createPlaylist();
				break;
			case 'Escape':
				this.clearInputField();
				break;
			default:
				return;
		}
	}

	render() {
		let {playlists, activeUser, activePlaylist, currentSong, searchedSongs, onDeletePlaylist, onSwitchPlaylist} = this.props;
		return (
			activeUser ?
			<div style={{margin: 20}}>
				<h2>Playlists</h2>
				<InputAction
					value={this.state.newPlaylistName}
					onKeyDown={e => this.handleKeyDown(e)}
					onChange={(e) => this.setState({newPlaylistName: e.target.value})}
					onAction={() => this.createPlaylist()}
					actionText='Add' />
				{playlists.map(playlist =>
					<Playlist
						key={playlist.id}
						playlist={playlist}
						onSwitchPlaylist={() => onSwitchPlaylist(activeUser, playlist.id)}
						onDeletePlaylist={() => onDeletePlaylist(activeUser, playlist.id, playlist.songs, currentSong, searchedSongs)}
						isActive={isEqual(activePlaylist, {user: activeUser, playlist: playlist.id})}/>)}
			</div> : null
		);
	}
}

export default PlaylistsView;
