import { ExceptionBase } from '@libs/exceptions';

export class CandidateAlreadyExistError extends ExceptionBase {
  static readonly message = 'Candidate already exists';

  public readonly code = 'CANDIDATE.EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(CandidateAlreadyExistError.message, cause, metadata);
  }
}

export class CandidateCampaignNotFoundError extends ExceptionBase {
  static readonly message = 'Candidate campaign not found';

  public readonly code = 'CANDIDATE.CAMPAIGN_NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(CandidateCampaignNotFoundError.message, cause, metadata);
  }
}
