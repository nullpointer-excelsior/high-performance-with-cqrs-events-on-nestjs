import { Module } from '@nestjs/common';
import { NorthwindDatabaseModule } from '@app/persistence/northwind-database/northwind-database.module';
import { SouthwindDatabaseModule } from '@app/persistence/southwind-database/southwind-database.module';


@Module({
  imports: [
    NorthwindDatabaseModule,
    SouthwindDatabaseModule,
  ],
  exports: [
    NorthwindDatabaseModule,
    SouthwindDatabaseModule,
  ]
})
export class PersistenceModule { }
