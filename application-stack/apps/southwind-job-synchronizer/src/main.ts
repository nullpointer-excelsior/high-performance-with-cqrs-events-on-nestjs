import { NestFactory } from '@nestjs/core';
import { DatabaseSyncService } from './services/database-sync.service';
import { SouthwindJobSynchronizerModule } from './southwind-job-synchronizer.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SouthwindJobSynchronizerModule);
  const job = app.get(DatabaseSyncService)
  await job.syncOrders()
  await job.syncCustomer()
  await job.syncEmployee()
  await job.syncProducts()
  await job.syncShipper()
  app.close()
}
bootstrap();
