import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProviderOptions, ClientProxyFactory, Transport } from '@nestjs/microservices';
import rabbitMQConfig, { RabbitMQConfig } from '@app/event-queue/config/rabbitmq.config'
import { EventQueueService } from './rabbitmq/service/event-queue.service';
import { RABBITMQ_CLIENT, RABBITMQ_PROVIDER_OPTIONS } from './config/constants';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        rabbitMQConfig
      ]
    }),
  ],
  providers: [
    EventQueueService,
    {
      provide: RABBITMQ_PROVIDER_OPTIONS,
      useFactory(config: ConfigService): ClientProviderOptions {
        const rabbitmq = config.get<RabbitMQConfig>('rabbitMQ')
        return {
          transport: Transport.RMQ,
          name: 'northwind-events',
          options: {
            urls: [rabbitmq.amqpurl],
            queue: rabbitmq.queue,
            noAck: false,
            queueOptions: {
              durable: true,
            },
          },
        }

      },
      inject: [ConfigService]
    },
    {
      provide: RABBITMQ_CLIENT,
      useFactory: (config: ConfigService) => {
        const rabbitmq = config.get<RabbitMQConfig>('rabbitMQ')
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              rabbitmq.amqpurl
            ],
            queue: rabbitmq.queue,
            queueOptions: {
              durable: true,
            }
          }
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [
    RABBITMQ_CLIENT,
    RABBITMQ_PROVIDER_OPTIONS,
    EventQueueService
  ]
})
export class EventQueueModule {

  static async getClientProviderOptions(): Promise<ClientProviderOptions> {
    
    return NestFactory
      .createApplicationContext(EventQueueModule)
      .then(app => {
        const options = app.get(RABBITMQ_PROVIDER_OPTIONS)
        app.close()
        return options
      })
    
  }

}
