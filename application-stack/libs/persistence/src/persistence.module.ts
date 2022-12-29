import { Module } from '@nestjs/common';
import { SouthwindDatabaseModule } from './southwind-database/southwind-database.module';
import { NorthwindDatabaseModule } from './northwind-database/northwind-database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SouthwindDatabaseModule, 
    NorthwindDatabaseModule,
    ConfigModule,
  ],
  exports: [
    SouthwindDatabaseModule, 
    NorthwindDatabaseModule
  ]
})
export class PersistenceModule {}
