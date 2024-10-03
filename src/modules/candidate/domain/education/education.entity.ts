import { AggregateRoot, AggregateID } from '@libs/ddd';
import { EducationProps, CreateCandidateProps } from './education.types';
import { EducationCreatedDomainEvent } from './events/education-created.domain-event';
import { randomUUID } from 'crypto';

export class EducationEntity extends AggregateRoot<EducationProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateCandidateProps): EducationEntity {
    const id = randomUUID();

    const props: EducationProps = {
      ...create,
    };

    const candidate = new EducationEntity({ id, props });

    candidate.addEvent(
      new EducationCreatedDomainEvent({
        aggregateId: id,
        ...props,
      }),
    );

    return candidate;
  }

  public validate(): void {}
}
