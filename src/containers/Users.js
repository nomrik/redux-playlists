import {connect} from 'react-redux';
import {getUsersList} from '../selectors';
import {createUser, deleteUser} from '../redux/modules/users';
import {switchUser} from '../redux/modules/activeUser';
import UsersView from '../components/UsersView';

function mapStateToProps(state) {
	return {
		users: getUsersList(state),
		activeUser: state.activeUser
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onCreateUser: userName => dispatch(createUser(userName)),
		onDeleteUser: userName => dispatch(deleteUser(userName)),
		onSwitchUser: userName => dispatch(switchUser(userName))
	};
}

const Users = connect(
	mapStateToProps,
	mapDispatchToProps
)(UsersView);

export default Users;
