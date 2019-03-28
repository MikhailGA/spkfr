export type Sex = 'male' | 'female';

export interface Profile {
  id:	string;
  firstName:	string;
  lastName:	string;
  sex: Sex;
  birthDate:	string;
  email:	string;
  emailConfirmed:	boolean;
  phone:	string;
}

export interface AuthResult {
  profile: Profile;
  token: string;
}

export interface ApiError {
  code: number;
  type: string;
  message: string;
}
