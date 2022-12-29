import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CoreModule } from './core/core.module';
import { HttpServerModule } from './infraestructure/http-server/http-server.module';
import { SharedModule } from './infraestructure/shared/shared.module';

@Module({
  imports: [
    SharedModule,
    CoreModule,
    HttpServerModule,
    CqrsModule,
  ]
})
export class NorthwindLegacyModule {}
