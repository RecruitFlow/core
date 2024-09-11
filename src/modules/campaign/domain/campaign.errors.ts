import { ExceptionBase } from '@libs/exceptions';

export class CampaignActiveError extends ExceptionBase {
  static readonly message = 'Campaign in Active state';

  public readonly code = 'CAMPAIGN.ACTIVE';

  constructor(cause?: Error, metadata?: unknown) {
    super(CampaignActiveError.message, cause, metadata);
  }
}

export class CampaignAlreadyExistError extends ExceptionBase {
  static readonly message = 'Campaign already exists';

  public readonly code = 'CAMPAIGN.EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(CampaignAlreadyExistError.message, cause, metadata);
  }
}
