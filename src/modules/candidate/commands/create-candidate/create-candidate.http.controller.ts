import {
  Body,
  ConflictException as ConflictHttpException,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { CreateCandidateCommand } from './create-candidate.command';
import { CreateCandidateRequestDto } from './create-candidate.request.dto';
import { CandidateAlreadyExistError } from '@modules/candidate/domain/candidate.errors';
import { IdResponse } from '@libs/api/id.response.dto';
import { AggregateID } from '@libs/ddd';
import { ApiErrorResponse } from '@src/libs/api/api-error.response';

@Controller(routesV1.version)
export class CreateCandidateHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create a candidate' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: CandidateAlreadyExistError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.candidate.create)
  async create(@Body() body: CreateCandidateRequestDto): Promise<IdResponse> {
    const command = new CreateCandidateCommand(body);

    const result: Result<AggregateID, CandidateAlreadyExistError> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof CandidateAlreadyExistError)
          throw new ConflictHttpException(error.message);
        throw error;
      },
    });
  }
}
