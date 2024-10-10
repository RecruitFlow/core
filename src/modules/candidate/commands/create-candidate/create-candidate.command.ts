import { Command, CommandProps, AggregateID } from '@libs/ddd';
import {
  WorkTime,
  WorkLocation,
} from '@modules/candidate/domain/candidate.types';

export class CreateCandidateCommand extends Command {
  readonly name: string | null;

  readonly campaignId: AggregateID;

  readonly age: number | null;

  readonly workTime: WorkTime | null;

  readonly workLocation: WorkLocation | null;

  readonly position: string | null;

  readonly salary: number | null;

  readonly skills: string[];

  readonly location: string | null;

  readonly languages: string[];

  readonly yearsOfExperience: number | null;

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
