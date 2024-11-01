import { Controller } from '@nestjs/common';
import { DccService } from './dcc.service';

@Controller()
export class DccController {
  constructor(private readonly dccService: DccService) {}
}
