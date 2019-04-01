import * as React from 'react';
import * as moment from 'moment';
import { Label } from 'reactstrap';
import { connect } from 'react-redux';
import { iRootState } from '../store';

const mapState = (state: iRootState) => ({
  profile: state.profile,
});

type connectedProps = ReturnType<typeof mapState>;

interface UserProfileProps {
}

const UserProfile = (props: UserProfileProps & connectedProps) => (
  <div className="p-3">
    <Label for="profile-name">Имя</Label>
      <div
        className="form-control ml-2 mb-2"
        id="profile-name"
      >{props.profile.firstName}</div>
    <Label for="profile-lastName">Фамилия</Label>
      <div
        className="form-control ml-2 mb-2"
        id="profile-lastName"
      >{props.profile.lastName}</div>
    <Label for="profile-email">Электронная почта</Label>
      <div
        className="form-control ml-2 mb-2"
        id="profile-email"
      >{props.profile.email}</div>
    <Label for="profile-birthDate">Дата рождения</Label>
      <div
        className="form-control ml-2 mb-2"
        id="profile-birthDate"
      >{moment(props.profile.birthDate).format('DD.MM.YYYY')}</div>
    <Label for="profile-phone">Телефон</Label>
      <div
        className="form-control ml-2 mb-2"
        id="profile-phone"
      >{`+7${props.profile.phone}`}</div>
  </div>
);

export default connect(mapState)(UserProfile);
