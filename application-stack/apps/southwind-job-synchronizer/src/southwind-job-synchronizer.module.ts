import { Module } from '@nestjs/common';
import { NorthwindDatabaseModule } from '@app/persistence/northwind-database/northwind-database.module';
import { SouthwindDatabaseModule } from '@app/persistence/southwind-database/southwind-database.module';
import { CustomerService } from './services/customer.service';
import { DatabaseSyncService } from './services/database-sync.service';
import { EmployeeService } from './services/employee.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShipperService } from './services/shipper.service';

@Module({
  imports: [
    NorthwindDatabaseModule,
    SouthwindDatabaseModule,
  ],
  providers: [
    OrderService,
    ProductService,
    EmployeeService,
    CustomerService,
    DatabaseSyncService,
    ShipperService
  ]
})
export class SouthwindJobSynchronizerModule { }
