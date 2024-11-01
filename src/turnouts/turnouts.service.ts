import { Injectable } from '@nestjs/common';
import { CreateTurnoutDto } from './dto/create-turnout.dto';
import { UpdateTurnoutDto } from './dto/update-turnout.dto';

@Injectable()
export class TurnoutsService {
  create(createTurnoutDto: CreateTurnoutDto) {
    return 'This action adds a new turnout';
  }

  findAll() {
    return `This action returns all turnouts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} turnout`;
  }

  update(id: number, updateTurnoutDto: UpdateTurnoutDto) {
    return `This action updates a #${id} turnout`;
  }

  remove(id: number) {
    return `This action removes a #${id} turnout`;
  }
}
