import { DomainEvent, DomainEventProps } from '@libs/ddd';
import { CampaignStatus, CampaignEndType } from '../campaign.types';

export class CampaignCreatedDomainEvent extends DomainEvent {
  readonly name: string;

  readonly keyword: string;

  readonly status: CampaignStatus;

  readonly endType: CampaignEndType;

  readonly endValue: number | null;

  readonly providers: string[];

  constructor(props: DomainEventProps<CampaignCreatedDomainEvent>) {
    super(props);
    this.name = props.name;
    this.keyword = props.keyword;
    this.status = props.status;
    this.endType = props.endType;
    this.endValue = props.endValue;
    this.providers = props.providers;
  }
}
