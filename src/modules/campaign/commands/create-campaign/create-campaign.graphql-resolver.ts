import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCampaignCommand } from './create-campaign.command';
import { CreateCampaignGqlRequestDto } from './dtos/create-campaign.gql-request.dto';
import { IdGqlResponse } from './dtos/id.gql-response.dto';
import { AggregateID } from '@src/libs/ddd';
import { CampaignAlreadyExistError } from '@src/modules/campaign/domain/campaign.errors';
import { Result } from 'oxide.ts';

// If you are Using GraphQL you'll need a Resolver instead of a Controller
@Resolver()
export class CreateCampaignGraphqlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => IdGqlResponse)
  async create(
    @Args('input') input: CreateCampaignGqlRequestDto,
  ): Promise<IdGqlResponse> {
    const command = new CreateCampaignCommand(input);

    const id: Result<AggregateID, CampaignAlreadyExistError> =
      await this.commandBus.execute(command);

    return new IdGqlResponse(id.unwrap());
  }
}
