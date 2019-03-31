import * as React from 'react';
import { AxiosInstance } from 'axios';
import { Profile, Exam, ExamResponseType } from './interfaces';
import { Optional } from 'typescript-optional';
import { withRouter, RouteComponentProps, Switch, Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import Exams from './components/Exams';
import Button from 'reactstrap/lib/Button';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

interface PathParamsType {
}

interface SelfProps {
  restClient: AxiosInstance;
}

// Your component own properties
type AppProps = RouteComponentProps<PathParamsType> & SelfProps;

interface AppState {
  profile: Optional<Profile>;
  exams: Optional<Exam[]>;
  activePage: number;
  itemsPerPage: number;
  totalCount: number;
}

class App extends React.Component<AppProps, AppState> {

  public state = {
    profile: Optional.empty<Profile>(),
    exams: Optional.empty<Exam[]>(),
    activePage: 1,
    itemsPerPage: 2,
    totalCount: 0,
  };

  public async componentDidMount() {
    await this.getProfile();
    await this.getExams(this.state.activePage);
  }

  public render() {
    return (
      <div className="app">
        <div className="grid-item header pr-2 ">
          <Button onClick={this.logOut}>Выйти</Button>
        </div>
        <div className="grid-item side-bar pl-1 pr-1">
          <nav className="nav flex-column nav-pills nav-fill">
            <div className="logo">
              Logo
            </div>
            <div className="user-profile">
              {this.state.profile.matches({
                present: p =>
                  <NavLink activeClassName="active" className="nav-item nav-link" to="/app/profile">
                    {`${p.firstName} ${p.lastName}`}
                  </NavLink>,
                empty: () => null,
              })}
            </div>
            {/* <NavLink activeClassName="active" className="nav-item nav-link" to="/app/profile">Профиль</NavLink> */}
            <NavLink activeClassName="active" to="/app/exams" className="nav-item nav-link">Расписание эксзаменов</NavLink>
          </nav>
        </div>
        <div className="grid-item content">
          <Switch>
            <Route path="/app/profile" render={() => this.state.profile.matches({
              present: p => <UserProfile profile={p}/>,
              empty: () => null,
            })} />
            <Route path="/app/exams" render={() => this.state.exams.matches({
              present: e =>
                <Exams
                  exams={e}
                  activePage={this.state.activePage}
                  itemsPerPage={this.state.itemsPerPage}
                  totalCount={this.state.totalCount}
                  handlePageChange={this.getExams}
                />,
              empty: () => null,
            })} />
          </Switch>
        </div>
      </div>
    );
  }

  private getProfile = async () => {
    const response = await this.props.restClient.get<Profile>('/v1/account/profile');
    if (response.status !== 200) {
      this.props.history.push('/');
      return;
    }
    this.setState({ profile: Optional.of(response.data) });
  }

  private getExams = async (page: number) => {
    const response = await this.props.restClient.get<ExamResponseType>(`/v1/exams?page=${page}&pageSize=${this.state.itemsPerPage}`);
    if (response.status !== 200) {
      this.props.history.push('/');
      return;
    }
    this.setState({
      exams: Optional.of(response.data.exams),
      totalCount: response.data.total,
      activePage: page,
    });
  }

  private logOut = () => {
    window.localStorage.removeItem('token');
    window.sessionStorage.removeItem('token');
    this.props.history.push('/');
  }
}

export default withRouter(App);
