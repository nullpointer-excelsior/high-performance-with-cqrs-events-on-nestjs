import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { EventBusPublisher } from "../../../core/domain/ports/outbound/EventBusPublisher";
import { EventBase } from "../../../core/shared/DomainEvent";

@Injectable()
export class EventBusPublisherService implements EventBusPublisher {
    
    constructor(private eventbus: EventBus){}

    async publish(event: EventBase): Promise<void> {
    
        await this.eventbus.publish(event)
        
    }

}