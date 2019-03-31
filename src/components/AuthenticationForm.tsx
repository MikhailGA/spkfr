import * as React from 'react';
import { FormGroup, Form, Label, Input, Button, InputGroupAddon } from 'reactstrap';
import { withRouter, RouteComponentProps } from 'react-router';
import { AuthenticationResponseType } from 'src/interfaces';
import { AxiosInstance } from 'axios';
import InputGroup from 'reactstrap/lib/InputGroup';

interface SelfProps {
  restClient: AxiosInstance;
}

// Your component own properties
type PropsType = RouteComponentProps & SelfProps;

interface AuthenticationFormState {
  phone: string;
  password: string;
  remember: boolean;
  phoneValid: boolean;
  passwordValid: boolean;
}

class AuthenticationForm extends React.Component<PropsType, AuthenticationFormState> {
  public state = {
    phone: '',
    password: '',
    remember: false,
    phoneValid: true,
    passwordValid: true,
  };
  public render() {
    return (
      <Form onSubmit={this.logIn} className="form-signin">
        <div className="text-center mb-4">
          <h1 className="h3 mb-3 font-weight-normal">Вход</h1>
        </div>
        <FormGroup>
          <Label for="userPhone">Имя</Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">+7</InputGroupAddon>
            <Input
              className="form-control"
              type="text"
              name="phone"
              id="userPhone"
              placeholder="9205530907"
              value={this.state.phone}
              onChange={this.onChangePhone}
              valid={this.state.phoneValid && (this.state.phone.length > 0)}
              invalid={!this.state.phoneValid}
            />
          </InputGroup>
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
            invalid={!this.state.passwordValid}
            onChange={this.handlePasswordInput}
          />
        </FormGroup>
        <Button className="mb-2" block={true}>Логин</Button>
        <Label check>
            <input type="checkbox" checked={this.state.remember} onChange={() => this.setState({ remember: !this.state.remember })}/>{' '}
            Запомни меня
        </Label>
      </Form>
    );
  }

  private handlePasswordInput = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      password: event.currentTarget.value,
      passwordValid: true,
    });
  }

  private onChangePhone = (event: React.FormEvent<HTMLInputElement>) => {
    const regExp = /^([0-9]){10}$/;
    if (regExp.test(event.currentTarget.value)) {
      this.setState({ phoneValid: true });
    } else {
      this.setState({ phoneValid: false });
    }
    this.setState({ phone: event.currentTarget.value });
  }

  private logIn = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!this.state.phoneValid) return;
    if (this.state.password.length === 0) {
      this.setState({ passwordValid: false });
      return;
    }

    const result = await this.props.restClient.post<AuthenticationResponseType>(
      '/v1/account/login',
      { phone: this.state.phone, password: this.state.password });

    if (result.status === 200) {
      if (this.state.remember) {
        window.localStorage.setItem('token', result.data.token);
      } else {
        window.sessionStorage.setItem('token', result.data.token);
      }
      this.props.history.push('/');
      return;
    }
    this.setState({
      passwordValid: false,
      phoneValid: false,
    });
  }
}

export default withRouter(AuthenticationForm);
