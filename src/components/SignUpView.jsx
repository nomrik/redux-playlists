import React from 'react';
import '../css/signUp.css';

export default class SignUpView extends React.Component {
	state = {
		newUserName: ''
	}

	handleKeyDown(e) {
		switch (e.key) {
			case 'Enter':
				this.props.onCreateUser(this.state.newUserName);
				break;
			default:
				return;
		}
	}

	render() {
		return (
			<div className='sign-up-wrapper'>
				<div className='sign-up'>
					<h1 className='sign-up-text'>Enter Username</h1>
					<input className='sign-up-input' onKeyDown={e => this.handleKeyDown(e)} value={this.state.newUserName} onChange={e => this.setState({newUserName: e.target.value})} />
					<button className='sign-up-button' onClick={() => this.props.onCreateUser(this.state.newUserName)}>Sign Up</button>
				</div>
			</div>
		);
	}
}
