import React from 'react';
import LoginButton from './LoginButton.jsx';

const clientId = '3a0902511f114bf383740142ca8bc2bf';
const scopes = 'user-read-private user-library-read';
const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${window.location.href}app&scope=${scopes}`

class Auth extends React.Component {
	render() {
		return (
			<div className='auth-view'>
				<h1>Welcome</h1>
				<a href={spotifyLoginUrl}><LoginButton /></a>
			</div>
		);
	}
}

export default Auth;