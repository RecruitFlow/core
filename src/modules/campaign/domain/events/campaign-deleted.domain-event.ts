import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class CampaignDeletedDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<CampaignDeletedDomainEvent>) {
    super(props);
  }
}
