import { Injectable, Logger } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { EmployeeService } from "./employee.service";
import { OrderService } from "./order.service";
import { ProductService } from "./product.service";
import { ShipperService } from "./shipper.service";

@Injectable()
export class DatabaseSyncService {
    
    constructor(
        private order: OrderService,
        private product: ProductService,
        private customer: CustomerService,
        private employee: EmployeeService,
        private shipper: ShipperService,
    ) { }

    async syncOrders() {
        const count = await this.order.countFromMongo()
        if (count === 0) {
            Logger.log('Staring to sync orders...')
            const records = await this.order.findAllFromPostgres()
            let result = 0
            for (let r of records) {
                await this.order.saveOnMongo({
                    ...r,
                    shipping: {
                        address: r.shipAddress,
                        city: r.shipCity,
                        country: r.shipCountry,
                        name: r.shipName,
                        region: r.shipRegion
                    },
                    details: r.orderDetails.map(d => ({
                        ...d,
                        product: {
                            productId: d.product.productId,
                            productName: d.product.productName
                        }
                    }))
                })
                result += 1
            }
            Logger.log(`Detail Records inserted on mongo: ${result}`)
        }
    }

    async syncProducts() {
        const count = await this.product.countFromMongo()
        if (count === 0) {
            Logger.log('Staring to sync products...')
            const records = await this.product.findAllFromPostgres()
            let result = 0
            for (let r of records) {
                await this.product.saveOnMongo(r)
                result += 1
            }
            Logger.log(`Products Records inserted on mongo: ${result}`)
        }
    }

    async syncCustomer() {
        const count = await this.customer.countFromMongo()
        if (count === 0) {
            Logger.log('Staring to sync customer...')
            const records = await this.customer.findAllFromPostgres()
            let result = 0
            for (let r of records) {
                await this.customer.saveOnMongo(r)
                result += 1
            }
            Logger.log(`Customer Records inserted on mongo: ${result}`)
        }
    }

    async syncEmployee() {
        const count = await this.employee.countFromMongo()
        if (count === 0) {
            Logger.log('Staring to sync employee...')
            const records = await this.employee.findAllFromPostgres()
            let result = 0
            for (let r of records) {
                await this.employee.saveOnMongo(r)
                result += 1
            }
            Logger.log(`employee Records inserted on mongo: ${result}`)
        }
    }

    async syncShipper() {
        const count = await this.shipper.countFromMongo()
        if (count === 0) {
            Logger.log('Staring to sync shipper...')
            const records = await this.shipper.findAllFromPostgres()
            let result = 0
            for (let r of records) {
                await this.shipper.saveOnMongo(r)
                result += 1
            }
            Logger.log(`shipper Records inserted on mongo: ${result}`)
        }
    }
}