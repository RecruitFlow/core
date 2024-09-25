import { ExceptionBase } from '@libs/exceptions';

export class FailedCreateFinderJob extends ExceptionBase {
  static readonly message = 'Failed to create finder job';

  public readonly code = 'FINDER.INIT.FAIL';

  constructor(cause?: Error, metadata?: unknown) {
    super(FailedCreateFinderJob.message, cause, metadata);
  }
}
