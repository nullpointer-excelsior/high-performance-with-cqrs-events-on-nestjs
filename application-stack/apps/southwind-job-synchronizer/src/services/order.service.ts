import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import { Model } from "mongoose";
import { Repository } from "typeorm";
import { OrdersEntity } from "@app/persistence/northwind-database/entities/orders.entity";
import { OrderSummary } from "../model/order-summary";
import { OrderDocument } from "@app/persistence/southwind-database/model/order.schema";

@Injectable()
export class OrderService {

    constructor(
        @InjectModel('Order') private mongo: Model<OrderDocument>,
        @InjectRepository(OrdersEntity) private postgres: Repository<OrdersEntity>
    ) { }

    async countFromMongo() {
        return this.mongo.count().exec()
    } 

    async findAllFromPostgres() {
        return await this.postgres
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.shipper', 'shipper')
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('order.employee', 'employee')
            .leftJoinAndSelect('order.orderDetails', 'orderDetails')
            .leftJoinAndSelect('orderDetails.product', 'products')
            .getMany()
    }

    async saveOnMongo(order: OrderSummary) {
        await new this.mongo(order).save();
    }

}