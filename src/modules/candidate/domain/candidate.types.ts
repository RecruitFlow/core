import { AggregateID } from '@libs/ddd';
export interface CandidateProps {
  name: string;
  campaignId: AggregateID;
  age?: number;
  workTime: WorkTime;
  workLocation: WorkLocation;
  position?: string;
  salary?: number;
  skills: string[];
  location?: string;
  languages?: string[];
  yearsOfExperience?: number;
  education?: AggregateID[];
  experience?: AggregateID[];
}

export interface CreateCandidateProps extends CandidateProps {}

export enum WorkTime {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  UNDEFINED = 'UNDEFINED',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
}

export enum WorkLocation {
  REMOTE = 'REMOTE',
  OFFICE = 'OFFICE',
  MIXED = 'MIXED',
  UNDEFINED = 'UNDEFINED',
}
