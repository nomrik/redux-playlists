import {connect} from 'react-redux';
import {createUser} from '../redux/modules/users';
import SignUpView from '../components/SignUpView';

function mapDispatchToProps(dispatch) {
	return {
		onCreateUser: userName => dispatch(createUser(userName))
	};
}

const SignUp = connect(
	null,
	mapDispatchToProps
)(SignUpView);

export default SignUp;
