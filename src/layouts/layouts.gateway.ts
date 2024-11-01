import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { LayoutsService } from './layouts.service';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';

@WebSocketGateway()
export class LayoutsGateway {
  constructor(private readonly layoutsService: LayoutsService) {}

  @SubscribeMessage('createLayout')
  create(@MessageBody() createLayoutDto: CreateLayoutDto) {
    return this.layoutsService.create(createLayoutDto);
  }

  @SubscribeMessage('findAllLayouts')
  findAll() {
    return this.layoutsService.findAll();
  }

  @SubscribeMessage('findOneLayout')
  findOne(@MessageBody() id: number) {
    return this.layoutsService.findOne(id);
  }

  @SubscribeMessage('updateLayout')
  update(@MessageBody() updateLayoutDto: UpdateLayoutDto) {
    return this.layoutsService.update(updateLayoutDto.id, updateLayoutDto);
  }

  @SubscribeMessage('removeLayout')
  remove(@MessageBody() id: number) {
    return this.layoutsService.remove(id);
  }
}
