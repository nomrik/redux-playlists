import React from 'react';

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
			<div className='sign-up-view'>
				<div className='sign-up-view--wrapper'>
					<h1 className='sign-up-view--heading'>Enter Your Name</h1>
					<input className='sign-up-view--input' onKeyDown={e => this.handleKeyDown(e)} value={this.state.newUserName} onChange={e => this.setState({newUserName: e.target.value})} />
					<button className='sign-up-view--button' onClick={() => this.props.onCreateUser(this.state.newUserName)}>Start Listening!</button>
				</div>
			</div>
		);
	}
}
