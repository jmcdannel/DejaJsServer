import { Injectable } from '@nestjs/common';
import { CreateEffectDto } from './dto/create-effect.dto';
import { UpdateEffectDto } from './dto/update-effect.dto';

@Injectable()
export class EffectsService {
  create(createEffectDto: CreateEffectDto) {
    return 'This action adds a new effect';
  }

  findAll() {
    return `This action returns all effects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} effect`;
  }

  update(id: number, updateEffectDto: UpdateEffectDto) {
    return `This action updates a #${id} effect`;
  }

  remove(id: number) {
    return `This action removes a #${id} effect`;
  }
}
