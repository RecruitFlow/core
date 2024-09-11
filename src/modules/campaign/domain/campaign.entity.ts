import { AggregateRoot, AggregateID } from '@libs/ddd';
// import { Address, AddressProps } from './value-objects/address.value-object';
import {
  CampaignProps,
  CreateCampaignProps,
  CampaignStatus,
} from './campaign.types';
import { CampaignStatusChangedDomainEvent } from './events/campaign-status-changed.domain-event';
import { CampaignCreatedDomainEvent } from './events/campaign-created.domain-event';
import { CampaignDeletedDomainEvent } from './events/campaign-deleted.domain-event';
import { randomUUID } from 'crypto';

export class CampaignEntity extends AggregateRoot<CampaignProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateCampaignProps): CampaignEntity {
    const id = randomUUID();

    /* Setting a default status since we are not accepting it during creation. */
    const props: CampaignProps = {
      ...create,
      status: CampaignStatus.ACTIVE,
    };
    const campaign = new CampaignEntity({ id, props });
    /* adding "CampaignCreated" Domain Event that will be published
    eventually so an event handler somewhere may receive it and do an
    appropriate action. Multiple events can be added if needed. */
    campaign.addEvent(
      new CampaignCreatedDomainEvent({
        aggregateId: id,
        ...props,
      }),
    );
    return campaign;
  }

  /* You can create getters only for the properties that you need to
  access and leave the rest of the properties private to keep entity
  encapsulated. To get all entity properties (for saving it to a
  database or mapping a response) use .getProps() method
  defined in a EntityBase parent class */
  get status(): CampaignStatus {
    return this.props.status;
  }

  private changeStatus(newStatus: CampaignStatus): void {
    this.addEvent(
      new CampaignStatusChangedDomainEvent({
        aggregateId: this.id,
        oldStatus: this.props.status,
        newStatus,
      }),
    );

    this.props.status = newStatus;
  }

  delete(): void {
    this.addEvent(
      new CampaignDeletedDomainEvent({
        aggregateId: this.id,
      }),
    );
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
