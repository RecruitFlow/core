import { ArgsType, Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsArray,
  IsNumber,
  IsEnum,
} from 'class-validator';

import {
  CampaignProviders,
  CampaignEndType,
} from '@modules/campaign/domain/campaign.types';

@ArgsType()
@InputType()
export class CreateCampaignGqlRequestDto {
  @MaxLength(64)
  @Field()
  readonly name: string;

  @MaxLength(50)
  @MinLength(4)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  @Field()
  readonly keyword: string;

  @Field()
  @IsNumber()
  readonly endValue: number;

  @Field(() => String)
  @IsEnum(CampaignEndType)
  readonly endType: CampaignEndType;

  @Field(() => [String])
  @IsArray()
  readonly providers: CampaignProviders[];
}
