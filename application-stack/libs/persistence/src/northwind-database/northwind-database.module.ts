import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import postgresConfig, { PostgresConfig } from './config/postgres.config';
import { CategoryEntity } from './entities/category.entity';
import { CustomerDemographicEntity } from './entities/customer-demographics.entity';
import { CustomersEntity } from './entities/customer.entity';
import { EmployeesEntity } from './entities/employess.entity';
import { OrderDetailsEntity } from './entities/order-details.entity';
import { OrdersEntity } from './entities/orders.entity';
import { ProductEntity } from './entities/product.entity';
import { RegionEntity } from './entities/region.entity';
import { ShippersEntity } from './entities/shippers.entity';
import { SupplierEntity } from './entities/supplier.entity';
import { TerritoriesEntity } from './entities/territories.entity';
import { TransactionProvider } from './providers/transaction.provider';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            load: [
                postgresConfig,
            ],
            validationSchema: Joi.object({
                POSTGRES_DATABASE_HOST: Joi.string().default('localhost'),
                POSTGRES_DATABASE_PORT: Joi.number().default(5432),
                POSTGRES_DATABASE_NAME: Joi.string().required(),
                POSTGRES_DATABASE_USER: Joi.string().required(),
                POSTGRES_DATABASE_PASSWORD: Joi.string().required(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: false,
            },
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => {
                const database = config.get<PostgresConfig>('postgres')
                return {
                    type: 'postgres',
                    host: database.host,
                    port: database.port,
                    username: database.user,
                    password: database.password,
                    database: database.name,
                    entities: [
                        ProductEntity,
                        CategoryEntity,
                        SupplierEntity,
                        CustomersEntity,
                        CustomerDemographicEntity,
                        OrdersEntity,
                        ShippersEntity,
                        EmployeesEntity,
                        TerritoriesEntity,
                        RegionEntity,
                        OrdersEntity,
                        OrderDetailsEntity
                    ],
                    synchronize: false,
                    // logging: ['query']
                }
            },
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([
            ProductEntity,
            CustomersEntity,
            ShippersEntity,
            EmployeesEntity,
            OrdersEntity
        ]),
    ],
    providers: [
        TransactionProvider
    ],
    exports: [
        TransactionProvider,
        TypeOrmModule.forFeature([
            ProductEntity,
            CustomersEntity,
            ShippersEntity,
            EmployeesEntity,
            OrdersEntity
        ]),
    ]
})
export class NorthwindDatabaseModule {}
