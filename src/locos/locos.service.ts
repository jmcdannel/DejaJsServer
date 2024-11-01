import { Injectable } from '@nestjs/common';
import { CreateLocoDto } from './dto/create-loco.dto';
import { UpdateLocoDto } from './dto/update-loco.dto';

@Injectable()
export class LocosService {
  create(createLocoDto: CreateLocoDto) {
    return 'This action adds a new loco';
  }

  findAll() {
    return `This action returns all locos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loco`;
  }

  update(id: number, updateLocoDto: UpdateLocoDto) {
    return `This action updates a #${id} loco`;
  }

  remove(id: number) {
    return `This action removes a #${id} loco`;
  }
}
