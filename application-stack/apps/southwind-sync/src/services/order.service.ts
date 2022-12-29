import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderDocument } from "@app/persistence/southwind-database/model/order.schema";
import { Order } from "../model/Order";

@Injectable()
export class OrderService{

    constructor(@InjectModel('Order') private model: Model<OrderDocument>) {}
    
    async save(order: Order) {
        const orderCreated = new this.model(order);
        await orderCreated.save()
    } 

}