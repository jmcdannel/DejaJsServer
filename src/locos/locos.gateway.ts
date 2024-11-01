import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { LocosService } from './locos.service';
import { CreateLocoDto } from './dto/create-loco.dto';
import { UpdateLocoDto } from './dto/update-loco.dto';

@WebSocketGateway()
export class LocosGateway {
  constructor(private readonly locosService: LocosService) {}

  @SubscribeMessage('createLoco')
  create(@MessageBody() createLocoDto: CreateLocoDto) {
    return this.locosService.create(createLocoDto);
  }

  @SubscribeMessage('findAllLocos')
  findAll() {
    return this.locosService.findAll();
  }

  @SubscribeMessage('findOneLoco')
  findOne(@MessageBody() id: number) {
    return this.locosService.findOne(id);
  }

  @SubscribeMessage('updateLoco')
  update(@MessageBody() updateLocoDto: UpdateLocoDto) {
    return this.locosService.update(updateLocoDto.id, updateLocoDto);
  }

  @SubscribeMessage('removeLoco')
  remove(@MessageBody() id: number) {
    return this.locosService.remove(id);
  }
}
