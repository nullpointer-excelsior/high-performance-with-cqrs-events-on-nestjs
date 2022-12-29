import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig, { MongoConfig } from './config/mongo.config';
import { CustomerSchema } from './model/customer.schema';
import { EmployeeSchema } from './model/employee.schema';
import { OrderSchema } from './model/order.schema';
import { ProductSchema } from './model/product.schema';
import { ShipperSchema } from './model/shipper.schema';
import * as Joi from 'joi';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [
        mongoConfig,
      ],
      validationSchema: Joi.object({
        MONGO_DATABASE_HOST: Joi.string().default('localhost'),
        MONGO_DATABASE_PORT: Joi.number().default(27017),
        MONGO_DATABASE_NAME: Joi.string().required(),
        MONGO_DATABASE_USER: Joi.string().required(),
        MONGO_DATABASE_PASSWORD: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const mongo = config.get<MongoConfig>('mongo')
        const uri = `mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.name}?authSource=admin`
        return {
          uri: uri
        }
      },
      inject:[ConfigService]
    }),
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Employee', schema: EmployeeSchema },
      { name: 'Shipper', schema: ShipperSchema },
    ])
  ],
  exports: [
    MongooseModule,
  ]
})
export class SouthwindDatabaseModule {
}
