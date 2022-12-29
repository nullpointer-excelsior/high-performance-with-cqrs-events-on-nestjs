import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { OrderCreatedEvent, ORDER_CREATED_PATTERN } from "@app/event-queue/rabbitmq/events/order-created-event";
import { EventQueueService } from "@app/event-queue/rabbitmq/service/event-queue.service";
import { OrderCreated } from "../../../../../domain/events/OrderCreated";

@EventsHandler(OrderCreated)
export class UpdateSouthwindHandler implements IEventHandler<OrderCreated> {

    constructor(private queue: EventQueueService) { }

    async handle(event: OrderCreated) {
        this.queue.emitTo<OrderCreatedEvent>(ORDER_CREATED_PATTERN, event.getData())
    }

}