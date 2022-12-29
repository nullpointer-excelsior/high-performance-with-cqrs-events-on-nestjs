import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EntityManager } from "typeorm";
import { OrderDetailsEntity } from "@app/persistence/northwind-database/entities/order-details.entity";
import { OrdersEntity } from "@app/persistence/northwind-database/entities/orders.entity";
import { TransactionProvider } from "@app/persistence/northwind-database/providers/transaction.provider";
import { OrderDocument } from "@app/persistence/southwind-database/model/order.schema";
import { Customer } from "../../../core/domain/Customer";
import { Employee } from "../../../core/domain/Employee";
import { Order } from "../../../core/domain/Order";
import { OrderRepository } from "../../../core/domain/ports/outbound/OrderRepository";
import { Product } from "../../../core/domain/Product";
import { Detail } from "../../../core/domain/vo/Detail";
import { ShippingLocation } from "../../../core/domain/vo/ShippingLocation";

export interface DetailValues {
    productId: number;
    unitPrice: number;
    quantity: number;
    discount: number;
}

export interface OrderValues {

    orderDate: Date;
    requiredDate: Date;
    shippedDate: Date;
    freight: number;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    shipRegion: string;
    shipCountry: string;
    shipperId: number;
    customerId: string;
    employeeId: number;

}

@Injectable()
export class OrderRepositoryAdapter implements OrderRepository {

    constructor(
        private transaction: TransactionProvider,
        @InjectModel('Order') private mongo: Model<OrderDocument>,
    ) { }

    async saveOrder(manager: EntityManager, values: OrderValues) {
        
        const result = await manager
            .createQueryBuilder()
            .insert()
            .into(OrdersEntity)
            .values(values)
            .execute()

        return result.identifiers[0].orderId

    }

    async saveOrderDetails(manager: EntityManager, orderId: number, values: DetailValues[]) {

        return manager
            .createQueryBuilder()
            .insert()
            .into(OrderDetailsEntity)
            .values(values)
            .execute()

    }

    async save(order: Order): Promise<number> {

        let orderId = null

        const orderValues = {
            customerId: order.customer.customerId,
            employeeId: order.employee.employeeId,
            orderDate: order.orderDate,
            requiredDate: order.requiredDate,
            shippedDate: order.shippedDate,
            shipperId: order.shipper.shipperId,
            freight: order.freight,
            shipName: order.shippingLocation.name,
            shipAddress: order.shippingLocation.address,
            shipCity: order.shippingLocation.city,
            shipRegion: order.shippingLocation.region,
            shipCountry: order.shippingLocation.country
        }

        await this.transaction.transacction(async (em: EntityManager) => {

            orderId = await this.saveOrder(em, orderValues)

            const detailsValues = order.details.map(detail => ({
                orderId: orderId,
                productId: detail.product.productId,
                unitPrice: detail.unitPrice.getValue(),
                quantity: detail.quantity,
                discount: detail.discount.getValue()
            }))
            await this.saveOrderDetails(em, orderId, detailsValues)

        })

        return orderId

    }

    async findBySlice(limit: number, offset: number): Promise<Order[]> {
        return this.mongo
        .find()
        .skip(offset)
        .limit(limit)
        .exec()
        .then(docs => docs.map(doc => this.map(doc)));
    }

    count(): Promise<number> {
        return this.mongo
        .count()
        .exec()
    }

    map(doc: OrderDocument) {
       
        const order = new Order()
        order.orderDate = new Date()
        
        order.customer = doc.customer as Customer
        order.employee = doc.employee as Employee
       
        order.details = doc.details.map(d => new Detail({
            discount: d.discount,
            product: d.product as Product,
            quantity: d.quantity,
            unitPrice: d.unitPrice
        }))

        order.shipper = {
            shipperId:+doc.shipper.shipperId ,
            companyName:doc.shipper.companyName.toString(),
            phone:doc.shipper.phone
        }

        order.shippingLocation = new ShippingLocation (
            doc.shipping.name,
            doc.shipping.address,
            doc.shipping.city,
            doc.shipping.region,
            doc.shipping.country,
        )
        order.freight = doc.freight
        order.shippedDate = doc.shippedDate
        order.requiredDate = doc.requiredDate

        return order
    }

}