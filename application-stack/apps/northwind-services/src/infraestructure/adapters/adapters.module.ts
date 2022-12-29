import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../persistence/persistence.module';
import { CustomerRepositoryAdapter } from './domain/customer.repository.adapter';
import { EmployeeRepositoryAdapter } from './domain/employee.repository.adapter';
import { OrderRepositoryAdapter } from './domain/order.repository.adapter';
import { ProductrepositoryAdapter } from './domain/product.repository.adapter';
import { ShipperRepositoryAdapter } from './domain/shipper.repository.adapter';
import { EventBusPublisherService } from './eventbus/event-bus-publisher.service';
import { DetailsMapper } from './mapper/DetailsMapper';
import { OrderMapper } from './mapper/OrderMapper';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY'
export const ORDER_REPOSITORY = 'ORDER_REPOSITORY'
export const NORTHWIND_ORDER_REPOSITORY = 'NORTHWIND_ORDER_REPOSITORY'
export const SOUTHWIND_ORDER_REPOSITORY = 'SOUTHWIND_ORDER_REPOSITORY'
export const EMPLOYEE_REPOSITORY = 'EMPLOYEE_REPOSITORY'
export const SHIPPER_REPOSITORY = 'SHIPPER_REPOSITORY'
export const CUSTOMER_REPOSITORY = 'CUSTOMER_REPOSITORY'

const providers = [
  
    OrderRepositoryAdapter,
    ProductrepositoryAdapter,
    CustomerRepositoryAdapter,
    EmployeeRepositoryAdapter,
    ShipperRepositoryAdapter,
    OrderMapper,
    DetailsMapper,
    EventBusPublisherService,
    {
        provide: ORDER_REPOSITORY,
        useExisting: OrderRepositoryAdapter,
    },
    {
        provide: CUSTOMER_REPOSITORY,
        useExisting: CustomerRepositoryAdapter
    },
    {
        provide: EMPLOYEE_REPOSITORY,
        useExisting: EmployeeRepositoryAdapter
    },
    {
        provide: SHIPPER_REPOSITORY,
        useExisting: ShipperRepositoryAdapter
    },
    {
        provide: PRODUCT_REPOSITORY,
        useExisting: ProductrepositoryAdapter
    }
]

@Module({
    imports: [
        PersistenceModule,
        CqrsModule
    ],
    providers: [
        ...providers
    ],
    exports: [
        ...providers
    ]
})
export class AdaptersModule { }
