import * as React from 'react';
import { Profile } from '../interfaces';
import * as moment from 'moment';
import { InputGroup, FormGroup, Label, Input } from 'reactstrap';

interface UserProfileProps {
  profile: Profile;
}

const UserProfile = (props: UserProfileProps) => (
  <div className="p-3">
    {/* <li>{props.profile.firstName}</li> */}
    <FormGroup>
      <Label for="profile-name">Имя</Label>
      <InputGroup>
        <Input
          className="form-control ml-2"
          type="text"
          id="profile-name"
          name="phone"
          value={props.profile.firstName}
          disabled={true}
        />
      </InputGroup>
    </FormGroup>
    <FormGroup>
      <Label for="profile-lastName">Фамилия</Label>
      <InputGroup>
        <Input
          className="form-control ml-2"
          type="text"
          id="profile-lastName"
          name="lastName"
          value={props.profile.lastName}
          disabled={true}
        />
      </InputGroup>
    </FormGroup>
    <FormGroup>
      <Label for="profile-email">Электронная почта</Label>
      <InputGroup>
        <Input
          className="form-control ml-2"
          type="email"
          id="profile-email"
          name="email"
          value={props.profile.email}
          disabled={true}
        />
      </InputGroup>
    </FormGroup>
    <FormGroup>
      <Label for="profile-birthDate">Дата рождения</Label>
      <InputGroup>
        <Input
          className="form-control ml-2"
          type="text"
          id="profile-birthDate"
          name="birthDate"
          value={moment(props.profile.birthDate).format('DD.MM.YYYY')}
          disabled={true}
        />
      </InputGroup>
    </FormGroup>
    <FormGroup>
      <Label for="profile-phone">Телефон</Label>
      <InputGroup>
        <Input
          className="form-phone ml-2"
          type="text"
          id="profile-phone"
          name="phone"
          value={`+7${props.profile.phone}`}
          disabled={true}
        />
      </InputGroup>
    </FormGroup>
    {/* <li>{props.profile.lastName}</li>
    <li>{props.profile.email}</li>
    <li>{moment(props.profile.birthDate).format('DD.MM.YYYY')}</li>
    <li>{`+7 ${props.profile.phone}`}</li> */}
  </div>
);

export default UserProfile;
