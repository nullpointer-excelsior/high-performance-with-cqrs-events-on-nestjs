import { Module } from '@nestjs/common';
import { SouthwindDatabaseModule } from '@app/persistence/southwind-database/southwind-database.module';
import { OrdersController } from './controllers/orders.controller';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    SouthwindDatabaseModule
  ],
  controllers: [
    OrdersController
  ],
  providers:[
    OrderService
  ]
})
export class SouthwindSyncModule {}
