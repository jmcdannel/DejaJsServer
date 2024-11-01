import { WebSocketGateway } from '@nestjs/websockets';
import { DejaCloudService } from './deja-cloud.service';

@WebSocketGateway()
export class DejaCloudGateway {
  constructor(private readonly dejaCloudService: DejaCloudService) {}
}
