import React from 'react';
import InputAction from './InputAction';

const User = ({userName, onSwitchUser, isActive}) => (
	<div>
		<p><span onClick={onSwitchUser} style={{fontWeight: isActive ? 'bold' : 'normal', marginRight: 20}}>{userName}</span></p>
	</div>
)

class UsersView extends React.Component {
	state = {
		newUserName: ''
	}

	addUser() {
		let {onCreateUser} = this.props;
		onCreateUser(this.state.newUserName);
		this.clearInputField();
	}

	clearInputField() {
		this.setState({newUserName: ''});
	}

	handleKeyDown(e) {
		switch (e.key) {
			case 'Enter':
				this.addUser();
				break;
			case 'Escape':
				this.clearInputField();
				break;
			default:
				return;
		}
	}

	render() {
		let {users, activeUser, onDeleteUser, onSwitchUser} = this.props;
		return (
			<div className="users">
				<h2>Users</h2>
				<InputAction
					value={this.state.newUserName}
					onKeyDown={e => this.handleKeyDown(e)}
					onChange={(e) => this.setState({newUserName: e.target.value})}
					onAction={() => this.addUser()}
					actionText='Add' />
				{users.map(user => <User key={user} userName={user} onDeleteUser={() => onDeleteUser(user)} onSwitchUser={() => onSwitchUser(user)} isActive={activeUser === user}/>)}
			</div>
		);
	}
}

export default UsersView;
