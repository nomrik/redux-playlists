import React from 'react';
import InputAction from './InputAction';
import onClickOutside from 'react-onclickoutside';

class ActiveUser extends React.Component {
	getNode() {
		return this.node;
	}

	render() {
		let {user, onClick} = this.props;
		return (
			<div ref={node => this.node = node} onClick={onClick} className='users-view--active-user'>
				{user}
			</div>
		);
	}
}

const OtherUsers = ({users, onSwitchUser}) => (
	<div className='users-view--users-list'>
		<p className='users-view--switch-user-text'>Switch user</p>
		{users.map(user => <div onClick={() => onSwitchUser(user)} className='users-view--other-user'>{user}</div>)}
	</div>
);

const AddUser = ({value, onChange, onAddUser, onKeyDown}) => (
	<InputAction
		value={value}
		onKeyDown={onKeyDown}
		onChange={(e) => onChange(e.target.value)}
		onAction={onAddUser}
		iconName='plus' />
);

class UsersList extends React.Component {

	handleClickOutside(e) {
		if (e.target !== this.props.activeUserComponent.getNode())
			this.props.onCloseList();
	}

	render() {
		let {activeUser, otherUsers, onSwitchUser, onAddUser, inputValue, inputOnChange, inputOnKeyDown} = this.props;
		return (
			<div className='users-view--users-list-wrapper'>
				<p className='users-view--logged-in-as'>Logged in as</p>
				<p className='users-view--active-user-text'>{activeUser}</p>
				{otherUsers.length > 0 && <OtherUsers users={otherUsers} onSwitchUser={onSwitchUser} />}
				<p className='users-view--add-user-text'>Add user</p>
				<AddUser
					value={inputValue}
					onChange={newUserName => inputOnChange(newUserName)}
					onKeyDown={e => inputOnKeyDown(e)}
					onAddUser={onAddUser} />
			</div>
		);
	}
}

UsersList = onClickOutside(UsersList);

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
				<ActiveUser ref={activeUserComponent => this.activeUserComponent = activeUserComponent} user={activeUser.charAt(0).toUpperCase()} onClick={() => this.setState({showUserList: !showUserList})}/>
				{showUserList &&
					<UsersList
						activeUser={activeUser}
						activeUserComponent={this.activeUserComponent}
						otherUsers={otherUsers}
						onSwitchUser={onSwitchUser}
						inputValue={newUserName}
						inputOnChange={newUserName => this.setState({newUserName})}
						inputOnKeyDown={e => this.handleKeyDown(e)}
						onAddUser={() => this.addUser()}
						onCloseList={() => this.setState({showUserList: false})}/>}
			</div>
		);
	}
}

export default UsersView;
