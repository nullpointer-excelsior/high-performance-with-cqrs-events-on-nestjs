import { DomainEvent } from "../../shared/DomainEvent"
import { OrderSummary } from "../vo/OrderSummary";


export class OrderCreated extends DomainEvent<OrderSummary> {

    static EVENT_NAME = 'northwind-app.order-created'
    
    constructor(order: OrderSummary) {
        super(order)
    }

    getName(): string {
        return OrderCreated.EVENT_NAME
    }

}