import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import './scss/index.scss';

const store = configureStore();

class Root extends React.Component {
  render(){
    return(
      <Provider store={store}>
				<App />
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
