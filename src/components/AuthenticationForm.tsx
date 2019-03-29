import * as React from 'react';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { withRouter, RouteComponentProps } from 'react-router';
import { AuthResult } from 'src/interfaces';
import { AxiosInstance } from 'axios';
import { iRootState, Dispatch } from 'src/store';
import { connect } from 'react-redux';

const mapState = (state: iRootState) => ({
  token: state.token,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setToken: (token: string) => dispatch.token.setToken(token),
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

interface PathParamsType {
}

interface SelfProps {
  restClient: AxiosInstance;
}

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & SelfProps & connectedProps;

interface AuthenticationFormState {
  phone: string;
  password: string;
  remember: boolean;
}

class AuthenticationForm extends React.Component<PropsType, AuthenticationFormState> {
  public state = {
    phone: '',
    password: '',
    remember: false,
  };
  public render() {
    return (
      <Form className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <FormGroup>
          <Label for="userPhone">Имя</Label>
          <Input
            className="form-control"
            type="text"
            name="phone"
            id="userPhone"
            placeholder="Введите имя пользователя"
            value={this.state.phone}
            onChange={(event: React.FormEvent<HTMLInputElement>) => this.setState({ phone: event.currentTarget.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="userPassword">Пароль</Label>
          <Input
            className="form-control"
            type="password"
            name="password"
            id="userPassword"
            placeholder="Введите пароль"
            value={this.state.password}
            onChange={(event: React.FormEvent<HTMLInputElement>) => this.setState({ password: event.currentTarget.value })}
          />
        </FormGroup>
        <Button onClick={this.getToken}>Логин</Button>
        <input type="checkbox" name="remember" checked={this.state.remember} onChange={() => this.setState({ remember: !this.state.remember })}/>
      </Form>
    );
  }

  private getToken = async () => {
    const result = await this.props.restClient.post<AuthResult>(
      '/v1/account/login',
      { phone: this.state.phone, password: this.state.password },
      { validateStatus: () => true });

    if (result.status === 200) {
      // console.log('TCL: AuthenticationForm -> privategetToken -> result.data.profile', result.data.profile);
      // this.props.setToken(result.data.token);
      if (this.state.remember) {
        window.localStorage.setItem('token', result.data.token);
      } else {
        window.sessionStorage.setItem('token', result.data.token);
      }
      this.props.history.push('/');
      return;
    }
    alert('Неверный логин или пароль');
  }
}

export default withRouter(connect(mapState, mapDispatch)(AuthenticationForm));
