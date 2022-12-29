import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { OrderCreated } from "../../../../../domain/events/OrderCreated";
import { StockUseCases } from "../../../../services/StockUseCases";

@EventsHandler(OrderCreated)
export class UpdateStockHandler implements IEventHandler<OrderCreated> {

    constructor(private stock: StockUseCases) { }

    async handle(event: OrderCreated) {
        this.stock.updateStock(event.getData())
    }

}