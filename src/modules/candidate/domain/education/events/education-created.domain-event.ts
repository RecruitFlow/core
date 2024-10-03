import { DomainEvent, DomainEventProps, AggregateID } from '@libs/ddd';

export class EducationCreatedDomainEvent extends DomainEvent {
  readonly institution: string;

  readonly fieldOfStudy: string;

  readonly level: string;

  readonly duration: string;

  readonly startDate: string;

  readonly endDate: string;

  readonly candidateId: AggregateID;

  constructor(props: DomainEventProps<EducationCreatedDomainEvent>) {
    super(props);
    this.institution = props.institution;
    this.fieldOfStudy = props.fieldOfStudy;
    this.level = props.level;
    this.duration = props.duration;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.candidateId = props.candidateId;
  }
}
