import { Command, CommandProps } from '@libs/ddd';
import {
  CampaignProviders,
  CampaignEndType,
} from '@modules/campaign/domain/campaign.types';

export class CreateCampaignCommand extends Command {
  readonly name: string;

  readonly keyword: string;

  readonly endType: CampaignEndType;

  readonly endValue: number | null;

  readonly providers: CampaignProviders[];

  constructor(props: CommandProps<CreateCampaignCommand>) {
    super(props);
    this.name = props.name;
    this.keyword = props.keyword;
    this.endType = props.endType;
    this.endValue = props.endValue;
    this.providers = props.providers;
  }
}
