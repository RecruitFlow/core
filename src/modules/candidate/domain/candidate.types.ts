import { AggregateID } from '@libs/ddd';
export interface CandidateProps {
  name: string | null;
  campaignId: AggregateID;
  age: number | null;
  workTime: WorkTime | null;
  workLocation: WorkLocation | null;
  position: string | null;
  salary: number | null;
  skills: string[];
  location: string | null;
  languages: string[];
  yearsOfExperience: number | null;
  education?: AggregateID[];
  experience?: AggregateID[];
}

export interface CreateCandidateProps extends CandidateProps {}

export enum WorkTime {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
}

export enum WorkLocation {
  REMOTE = 'REMOTE',
  OFFICE = 'OFFICE',
  MIXED = 'MIXED',
}
