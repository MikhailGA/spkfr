import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import registerServiceWorker from './registerServiceWorker';
import AuthenticationForm from './components/AuthenticationForm';

import './styles/index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" exact={true} component={AuthenticationForm} />
      <Route path="/app" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
