import * as React from 'react';
import { AxiosInstance } from 'axios';
import { Profile, Exam, ExamResponseType, Theme } from './interfaces';
import { withRouter, RouteComponentProps, Switch, Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import Exams from './components/Exams';
import Button from 'reactstrap/lib/Button';
import { connect } from 'react-redux';
import { iRootState, Dispatch } from './store';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import ThemeSwitch from './components/ThemeSwitch';

const mapState = (state: iRootState) => ({
  profile: state.profile,
  exams: state.exams,
  theme: state.theme,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setProfile: (profile: Profile) => dispatch.profile.setProfile(profile),
  setExams: (exams: Exam[]) => dispatch.exams.setExams(exams),
  setTheme: (theme: Theme) => dispatch.theme.setTheme(theme),
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

interface PathParamsType {
}

interface SelfProps {
  restClient: AxiosInstance;
}

// Your component own properties
type AppProps = RouteComponentProps<PathParamsType> & SelfProps & connectedProps;

interface AppState {
  activePage: number;
  itemsPerPage: number;
  totalCount: number;
}

class App extends React.Component<AppProps, AppState> {

  public state = {
    activePage: 1,
    itemsPerPage: 5,
    totalCount: 0,
  };

  public async componentDidMount() {
    await this.getProfile();
    await this.getExams(this.state.activePage);
  }

  public render() {
    return (
      <div className="app">
        <ThemeSwitch />
        <div className="grid-item header pr-2 ">
          <div className="mr-3">
            {this.props.theme === 'light'
              ? <div className="theme-icon" onClick={this.handleTheme('dark')}><i className="far fa-sun" aria-hidden="true" /></div>
              : <div className="theme-icon" onClick={this.handleTheme('light')}><i className="far fa-moon" aria-hidden="true" /></div>}
          </div>
          <Button onClick={this.logOut}>Выйти</Button>
        </div>
        <div className="grid-item side-bar pl-1 pr-1">
          <nav className="nav flex-column nav-pills nav-fill">
            <div className="logo">
              Logo
            </div>
            <div className="user-profile">
              <NavLink activeClassName="active" className="nav-item nav-link" to="/app/profile">
                {`${this.props.profile.firstName} ${this.props.profile.lastName}`}
              </NavLink>
            </div>
            <NavLink activeClassName="active" to="/app/exams" className="nav-item nav-link">Расписание эксзаменов</NavLink>
          </nav>
        </div>
        <div className="grid-item content">
          <Switch>
            <Route path="/app/profile" component={UserProfile}/>
            <Route path="/app/exams"
              render={() =>
                <Exams
                  activePage={this.state.activePage}
                  itemsPerPage={this.state.itemsPerPage}
                  totalCount={this.state.totalCount}
                  handlePageChange={this.getExams}
                />}/>
          </Switch>
        </div>
      </div>
    );
  }

  private handleTheme = (theme: Theme) => () => {
    this.props.setTheme(theme);
    localStorage.setItem('theme', theme);
  }

  private getProfile = async () => {
    const response = await this.props.restClient.get<Profile>('/v1/account/profile');
    if (response.status !== 200) {
      this.props.history.push('/');
      return;
    }
    this.props.setProfile(response.data);
  }

  private getExams = async (page: number) => {
    const response = await this.props.restClient.get<ExamResponseType>(`/v1/exams?page=${page}&pageSize=${this.state.itemsPerPage}`);
    if (response.status !== 200) {
      this.props.history.push('/');
      return;
    }
    this.props.setExams(response.data.exams);
    this.setState({
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

export default withRouter(connect(mapState, mapDispatch)(App));
