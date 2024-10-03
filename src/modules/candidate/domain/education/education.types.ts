import { AggregateID } from '@libs/ddd';

export interface EducationProps {
  institution: string;
  fieldOfStudy: string;
  level: string;
  duration: string;
  startDate: string;
  endDate: string;
  candidateId: AggregateID;
}

export interface CreateCandidateProps extends EducationProps {}
