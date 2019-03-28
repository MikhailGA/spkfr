import * as React from 'react';
import axios from 'axios';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { withRouter, RouteComponentProps } from 'react-router';
import { AuthResult } from 'src/interfaces';

interface PathParamsType {
}

interface SelfProps {
}

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & SelfProps;

interface AuthenticationFormState {
  phone: string;
  password: string;
}

class AuthenticationForm extends React.Component<PropsType, AuthenticationFormState> {
  public state = {
    phone: '',
    password: '',
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
      </Form>
    );
  }

  private getToken = async () => {
    const result = await axios.post<AuthResult>(
      'https://api-applicant.spkfr.ru/v1/account/login',
      { phone: this.state.phone, password: this.state.password },
      { validateStatus: () => true });

    if (result.status === 200) {
      console.log('TCL: AuthenticationForm -> privategetToken -> result.data.profile', result.data.profile);
      this.props.history.push('/app');
      return;
    }
    alert('Неверный логин или пароль');
  }
}

export default withRouter(AuthenticationForm);
