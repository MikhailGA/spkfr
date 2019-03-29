import * as React from 'react';
import { Profile } from '../interfaces';
import { Optional } from 'typescript-optional';

interface UserProfileProps {
  profile: Optional<Profile>;
}

const UserProfile = (props: UserProfileProps) => (
  <ul>
    {props.profile.matches({
      present: p => (
        <>
          <li>{p.firstName}</li>
          <li>{p.lastName}</li>
          <li>{p.email}</li>
          <li>{p.birthDate}</li>
          <li>{p.phone}</li>
        </>
      ),
      empty: () => null,
    })}
  </ul>
);

export default UserProfile;
