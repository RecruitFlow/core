import { Mapper } from '@libs/ddd';
import { campaignSchema, CampaignModel } from './database/campaign.repository';
import { CampaignEntity } from './domain/campaign.entity';
import { CampaignResponseDto } from './dtos/campaign.response.dto';
import { Injectable } from '@nestjs/common';

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class CampaignMapper
  implements Mapper<CampaignEntity, CampaignModel, CampaignResponseDto>
{
  toPersistence(entity: CampaignEntity): CampaignModel {
    const copy = entity.getProps();
    const record: CampaignModel = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      name: copy.name,
      keyword: copy.keyword,
      status: copy.status,
      endType: copy.endType,
      endValue: copy.endValue,
      providers: copy.providers,
    };

    return campaignSchema.parse(record);
  }

  toDomain(record: CampaignModel): CampaignEntity {
    const entity = new CampaignEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        name: record.name,
        keyword: record.keyword,
        status: record.status,
        endType: record.endType,
        endValue: record.endValue,
        providers: record.providers,
      },
    });
    return entity;
  }

  toResponse(entity: CampaignEntity): CampaignResponseDto {
    const props = entity.getProps();
    const response = new CampaignResponseDto(entity);
    response.name = props.name;
    response.keyword = props.keyword;
    response.status = props.status;
    response.endType = props.endType;
    response.endValue = props.endValue;
    response.providers = props.providers;

    return response;
  }

  /* ^ Data returned to the user is whitelisted to avoid leaks.
     If a new property is added, like password or a
     credit card number, it won't be returned
     unless you specifically allow this.
     (avoid blacklisting, which will return everything
      but blacklisted items, which can lead to a data leak).
  */
}
