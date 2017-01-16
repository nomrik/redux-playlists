import React from 'react';
import InputAction from './InputAction';
import '../css/users.css';

const ActiveUser = ({user, onClick}) => (
	<div onClick={onClick} className='users-view--active-user'>
		{user}
	</div>
);

const OtherUsers = ({users, onSwitchUser}) => (
	<div className='users-view--users-list'>
		{users.map(user => <div onClick={() => onSwitchUser(user)} className='users-view--other-user'>{user}</div>)}
	</div>
);

const AddUser = ({value, onChange, onAddUser, onKeyDown}) => (
	<InputAction
		value={value}
		onKeyDown={onKeyDown}
		onChange={(e) => onChange(e.target.value)}
		onAction={onAddUser}
		actionText='+' />
);

class UsersView extends React.Component {
	state = {
		newUserName: '',
		showUserList: false
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
		let {users, activeUser, onSwitchUser} = this.props;
		let {newUserName, showUserList} = this.state;
		let otherUsers = users.filter(user => user !== activeUser);
		return (
			<div className='users-view'>
				<ActiveUser user={activeUser.charAt(0).toUpperCase()} onClick={() => this.setState({showUserList: !showUserList})}/>
				{showUserList &&
					<div className='users-view--users-list-wrapper'>
						{otherUsers.length > 0 && <OtherUsers users={otherUsers} onSwitchUser={onSwitchUser} />}
						<AddUser
							value={newUserName}
							onChange={newUserName => this.setState({newUserName})}
							onKeyDown={e => this.handleKeyDown(e)}
							onAddUser={() => this.addUser()} />
					</div>}
			</div>
		);
	}
}

export default UsersView;
