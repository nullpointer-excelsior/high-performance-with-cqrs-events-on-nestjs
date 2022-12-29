
export interface RabbitMQConfig {
    amqpurl: string;
    queue: string;
}

export default () => {
    
    const user = process.env.RABBITMQ_USER
    const password = process.env.RABBITMQ_PASSWORD
    const host = process.env.RABBITMQ_HOST
    const port = parseInt(process.env.RABBITMQ_PORT, 10)
    const vhost = process.env.RABBITMQ_VHOST
    const queue = process.env.RABBITMQ_QUEUE
    
    const amqpurl = `amqp://${user}:${password}@${host}:${port}/${vhost}`

    return {
        rabbitMQ: {
            amqpurl: amqpurl,
            queue: queue
        }
    }
};