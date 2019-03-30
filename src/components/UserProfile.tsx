import * as React from 'react';
import { Profile } from '../interfaces';
import * as moment from 'moment';

interface UserProfileProps {
  profile: Profile;
}

const UserProfile = (props: UserProfileProps) => (
  <ul>
    <li>{props.profile.firstName}</li>
    <li>{props.profile.lastName}</li>
    <li>{props.profile.email}</li>
    <li>{moment(props.profile.birthDate).format('DD.MM.YYYY')}</li>
    <li>{`+7 ${props.profile.phone}`}</li>
  </ul>
);

export default UserProfile;
