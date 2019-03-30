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

export interface AuthenticationResponseType {
  profile: Profile;
  token: string;
}

export interface ApiError {
  code: number;
  type: string;
  message: string;
}

export type ExamStatus = 'isApplying'
  | 'applyingFinished'
  | 'canceled'
  | 'isPassing'
  | 'finished'
  | 'nokProtocolUploaded'
  | 'nokProtocolSentToSpkfr'
  | 'nokProtocolRejected'
  | 'akProtocolUploaded'
  | 'sovietProtocolUploaded'
  | 'sentToNark';

export interface Exam {
  id:	string;
  date:	string;
  qualificationTitle:	string;
  qualificationLevel:	string;
  occupationalStandardTitle:	string;
  examinationCenterName:	string;
  address:	string;
  city:	string;
  status:	ExamStatus;
}

export interface ExamResponseType {
  exams: Exam[];
  currentPage: number;
  pageSize: number;
  total: number;
}
