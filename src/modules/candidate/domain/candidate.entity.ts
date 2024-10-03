import { AggregateRoot, AggregateID } from '@libs/ddd';
import { CandidateProps, CreateCandidateProps } from './candidate.types';
import { CandidateCreatedDomainEvent } from './events/candidate-created.domain-event';
import { randomUUID } from 'crypto';

export class CandidateEntity extends AggregateRoot<CandidateProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateCandidateProps): CandidateEntity {
    const id = randomUUID();

    const props: CandidateProps = {
      ...create,
    };

    const candidate = new CandidateEntity({ id, props });

    candidate.addEvent(
      new CandidateCreatedDomainEvent({
        aggregateId: id,
        age: props.age,
        campaignId: props.campaignId,
        name: props.name,
        position: props.position,
        salary: props.salary,
        workLocation: props.workLocation,
        workTime: props.workTime,
      }),
    );

    return candidate;
  }

  public validate(): void {}
}
