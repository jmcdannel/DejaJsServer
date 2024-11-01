import { PartialType } from '@nestjs/mapped-types';
import { CreateLocoDto } from './create-loco.dto';

export class UpdateLocoDto extends PartialType(CreateLocoDto) {
  id: number;
}
