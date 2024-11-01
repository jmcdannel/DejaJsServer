import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { TurnoutsService } from './turnouts.service';
import { CreateTurnoutDto } from './dto/create-turnout.dto';
import { UpdateTurnoutDto } from './dto/update-turnout.dto';

@WebSocketGateway()
export class TurnoutsGateway {
  constructor(private readonly turnoutsService: TurnoutsService) {}

  @SubscribeMessage('createTurnout')
  create(@MessageBody() createTurnoutDto: CreateTurnoutDto) {
    return this.turnoutsService.create(createTurnoutDto);
  }

  @SubscribeMessage('findAllTurnouts')
  findAll() {
    return this.turnoutsService.findAll();
  }

  @SubscribeMessage('findOneTurnout')
  findOne(@MessageBody() id: number) {
    return this.turnoutsService.findOne(id);
  }

  @SubscribeMessage('updateTurnout')
  update(@MessageBody() updateTurnoutDto: UpdateTurnoutDto) {
    return this.turnoutsService.update(updateTurnoutDto.id, updateTurnoutDto);
  }

  @SubscribeMessage('removeTurnout')
  remove(@MessageBody() id: number) {
    return this.turnoutsService.remove(id);
  }
}
