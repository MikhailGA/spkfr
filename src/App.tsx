import * as React from 'react';
import { AxiosInstance } from 'axios';
import { Profile } from './interfaces';
import { Optional } from 'typescript-optional';
import { withRouter, RouteComponentProps, Switch, Route } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import { NavLink } from 'react-router-dom';
import UserProfile from './components/UserProfile';

interface PathParamsType {
}

interface SelfProps {
  restClient: AxiosInstance;
}

// Your component own properties
type AppProps = RouteComponentProps<PathParamsType> & SelfProps;

interface AppState {
  profile: Optional<Profile>;
}

class App extends React.Component<AppProps, AppState> {

  public state = {
    profile: Optional.empty<Profile>(),
  };

  public async componentDidMount() {
    const response = await this.props.restClient.get<Profile>('/v1/account/profile');
    console.log('TCL: App -> publiccomponentDidMount -> profile', response);
    if (response.status !== 200) {
      this.props.history.push('/');
      return;
    }
    this.setState({ profile: Optional.of(response.data) });
  }

  public render() {
    return (
      <div className="app">
        <div className="grid-item user-profile">
          {this.state.profile.matches({
            present: p => `${p.firstName} ${p.lastName}`,
            empty: () => null,
          })}
        </div>
        <div className="grid-item header">
          Btn
        </div>
        <div className="grid-item side-bar">
          <nav className="nav flex-column nav-pills nav-fill">
            <NavLink activeClassName="active" className="nav-item nav-link" to="/app/profile">Профиль</NavLink>
            <NavLink activeClassName="active" to="/app/users" className="nav-item nav-link">Расписание эксзаменов</NavLink>
          </nav>
        </div>
        <div className="grid-item content">
          <Switch>
            <Route path="/app/profile" render={() => <UserProfile profile={this.state.profile}/>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
