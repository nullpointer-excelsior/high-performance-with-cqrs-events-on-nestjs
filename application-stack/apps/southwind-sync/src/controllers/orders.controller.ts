import { Controller, Logger } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext, Transport } from "@nestjs/microservices";
import { OrderCreatedEvent, ORDER_CREATED_PATTERN } from "@app/event-queue/rabbitmq/events/order-created-event";
import { RabbitMQMessage } from "@app/event-queue/rabbitmq/RabbitMQMessage";
import { OrderService } from "../services/order.service";

@Controller('orders')
export class OrdersController {

    constructor(private order: OrderService) {}

    @EventPattern(ORDER_CREATED_PATTERN, Transport.RMQ)
    async onOrderCreated(@Payload() data: RabbitMQMessage<OrderCreatedEvent>, @Ctx() context: RmqContext) {
        Logger.log('Order created', data.id)
        await this.order.save(data.data)
        context.getChannelRef().ack(context.getMessage())
        
    }
}