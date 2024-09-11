import { ExceptionBase } from '@libs/exceptions';

export class CampaignActiveError extends ExceptionBase {
  static readonly message = 'Campaign in Active state';

  public readonly code = 'CAMPAIGN.ACTIVE';

  constructor(cause?: Error, metadata?: unknown) {
    super(CampaignActiveError.message, cause, metadata);
  }
}
