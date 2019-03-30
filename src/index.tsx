import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import registerServiceWorker from './registerServiceWorker';
import AuthenticationForm from './components/AuthenticationForm';

import Axios from 'axios';

const getToken = () => {
  const token = window.localStorage.getItem('token') || window.sessionStorage.getItem('token');
  console.log('TCL: getToken -> token', token);
  return token;
};

const getRestClient = () => {
  const token = getToken() as string;
  return Axios.create({
    validateStatus: () => true,
    headers: { Authorization: token ? `Bearer ${token}` : '' },
    baseURL: 'https://api-applicant.spkfr.ru',
  });
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route
        path="/"
        exact={true}
        render={() => (getToken() ? <Redirect to="/app/profile" /> : <Redirect to="/login" />)} />
      <Route path="/login" render={() => <AuthenticationForm restClient={getRestClient()}/>} />
      <Route path="/app" render={() => <App restClient={getRestClient()}/>} />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
