import { DomainEvent, DomainEventProps, AggregateID } from '@libs/ddd';
import { WorkLocation, WorkTime } from '../candidate.types';

export class CandidateCreatedDomainEvent extends DomainEvent {
  readonly name: string;

  readonly campaignId: AggregateID;

  readonly age?: number;

  readonly workTime: WorkTime;

  readonly workLocation: WorkLocation;

  readonly position?: string;

  readonly salary?: number;

  constructor(props: DomainEventProps<CandidateCreatedDomainEvent>) {
    super(props);
    this.name = props.name;
    this.campaignId = props.campaignId;
    this.age = props.age;
    this.workTime = props.workTime;
    this.workLocation = props.workLocation;
    this.position = props.position;
    this.salary = props.salary;
  }
}
