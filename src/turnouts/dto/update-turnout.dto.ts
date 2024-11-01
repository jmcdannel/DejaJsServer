import { PartialType } from '@nestjs/mapped-types';
import { CreateTurnoutDto } from './create-turnout.dto';

export class UpdateTurnoutDto extends PartialType(CreateTurnoutDto) {
  id: number;
}
