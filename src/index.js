import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Auth from './components/Auth';
import { Provider } from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import configureStore from './redux/configureStore';

import './resources/fonts/open-sans.scss';

import './resources/scss/index.scss';

const store = configureStore();



class Root extends React.Component {
  render(){
    return(
      <Provider store={store}>
				<BrowserRouter>
					<AppRouter />
				</BrowserRouter>
      </Provider>
    );
  }
}

class AppRouter extends React.Component {
	render() {
		return (
			<div style={{height: '100%', display: 'flex'}}>
				<Route exact path={process.env.PUBLIC_URL + '/'} component={Auth} />
				<Route path={process.env.PUBLIC_URL + '/app'} component={App} />
			</div>
		)
	}
}



ReactDOM.render(<Root />, document.getElementById('root'));
