import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RabbitMQMessage } from "../RabbitMQMessage";
import { v4 as uuidv4 } from 'uuid';
import { RABBITMQ_CLIENT } from "../../config/constants";

@Injectable()
export class EventQueueService {
    
    constructor(@Inject(RABBITMQ_CLIENT) private client: ClientProxy) { }
 
    emitTo<T>(pattern: string, payload: T): RabbitMQMessage<T> {
        const message: RabbitMQMessage<T> = {
            id: uuidv4(),
            pattern: pattern,
            timestamp: new Date(),
            data: payload
        }
        this.client.emit(pattern, message)
        return message
    }

}