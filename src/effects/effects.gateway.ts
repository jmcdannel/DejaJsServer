import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { EffectsService } from './effects.service';
import { CreateEffectDto } from './dto/create-effect.dto';
import { UpdateEffectDto } from './dto/update-effect.dto';

@WebSocketGateway()
export class EffectsGateway {
  constructor(private readonly effectsService: EffectsService) {}

  @SubscribeMessage('createEffect')
  create(@MessageBody() createEffectDto: CreateEffectDto) {
    return this.effectsService.create(createEffectDto);
  }

  @SubscribeMessage('findAllEffects')
  findAll() {
    return this.effectsService.findAll();
  }

  @SubscribeMessage('findOneEffect')
  findOne(@MessageBody() id: number) {
    return this.effectsService.findOne(id);
  }

  @SubscribeMessage('updateEffect')
  update(@MessageBody() updateEffectDto: UpdateEffectDto) {
    return this.effectsService.update(updateEffectDto.id, updateEffectDto);
  }

  @SubscribeMessage('removeEffect')
  remove(@MessageBody() id: number) {
    return this.effectsService.remove(id);
  }
}
