import { Injectable } from "@nestjs/common";
import { Order } from "../../domain/Order";
import { ProductService } from "../../domain/services/ProductService";
import { OrderSummary } from "../../domain/vo/OrderSummary";

@Injectable()
export class StockUseCases {

    constructor(private product: ProductService) { }

    async updateStock(order: OrderSummary) {

        for (let detail of order.details) {
            await this.product.updateProductStock(detail.product.productId, detail.quantity)
        }

    }
    
}