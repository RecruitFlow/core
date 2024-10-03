import { RepositoryPort } from '@libs/ddd';
import { CandidateEntity } from '../domain/candidate.entity';

export interface CandidateRepositoryPort
  extends RepositoryPort<CandidateEntity> {}
