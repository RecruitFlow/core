import { Command, CommandProps, AggregateID } from '@libs/ddd';
import {
  WorkTime,
  WorkLocation,
} from '@modules/candidate/domain/candidate.types';

export class CreateCandidateCommand extends Command {
  readonly name: string;

  readonly campaignId: AggregateID;

  readonly age?: number;

  readonly workTime: WorkTime;

  readonly workLocation: WorkLocation;

  readonly position?: string;

  readonly salary?: number;

  readonly skills: string[];

  readonly location?: string;

  readonly languages: string[];

  readonly yearsOfExperience?: number;

  constructor(props: CommandProps<CreateCandidateCommand>) {
    super(props);
    this.name = props.name;
    this.campaignId = props.campaignId;
    this.age = props.age;
    this.workTime = props.workTime;
    this.workLocation = props.workLocation;
    this.position = props.position;
    this.salary = props.salary;
    this.skills = props.skills;
    this.location = props.location;
    this.languages = props.languages;
    this.yearsOfExperience = props.yearsOfExperience;
  }
}
