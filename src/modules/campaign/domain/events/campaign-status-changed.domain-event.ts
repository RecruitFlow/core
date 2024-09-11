import { DomainEvent, DomainEventProps } from '@libs/ddd';
import { CampaignStatus } from '../campaign.types';

export class CampaignStatusChangedDomainEvent extends DomainEvent {
  readonly oldStatus: CampaignStatus;

  readonly newStatus: CampaignStatus;

  constructor(props: DomainEventProps<CampaignStatusChangedDomainEvent>) {
    super(props);
    this.oldStatus = props.newStatus;
    this.newStatus = props.newStatus;
  }
}
