import { NestFactory } from '@nestjs/core';
import { EventQueueModule } from '../../../libs/event-queue/src';
import { SouthwindSyncModule } from './southwind-sync.module';


async function bootstrap() {
  
  const clientOptions = await EventQueueModule.getClientProviderOptions()
  console.log('My-Client-Config', clientOptions)
  const app = await NestFactory.createMicroservice(SouthwindSyncModule, clientOptions);
  app.listen()

}

bootstrap();
