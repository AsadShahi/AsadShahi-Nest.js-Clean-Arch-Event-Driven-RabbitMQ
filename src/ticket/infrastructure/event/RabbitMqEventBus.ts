import { Injectable, OnModuleInit } from "@nestjs/common";
import { IEventBus } from "src/ticket/application/usecases/event/IEvnetBus";
import { Connection, Channel, connect } from "amqplib";

@Injectable()
export class RabbitMqEventBus implements IEventBus, OnModuleInit {
    private connection: Connection;
    private channel: Channel;

    async onModuleInit() {
        await this.init();
    }

    private async init() {
        try {
            this.connection = await connect('amqp://localhost');
            this.channel = await this.connection.createChannel();
            await this.channel.assertExchange('ticket_exchange', 'topic', { durable: true });

            // Bind the queue to the exchange with the routing key
            const queue = 'ticket_queue';
            await this.channel.assertQueue(queue, { durable: true });
            await this.channel.bindQueue(queue, 'ticket_exchange', 'ticket.created');

            console.log('RabbitMQ initialized successfully');
        } catch (error) {
            console.error('Error initializing RabbitMQ:', error);
        }
    }
    async publish(event: any, routingKey: string): Promise<void> {
        try {
            const messagePayload = {
                pattern: routingKey,
                data: event,
              };
              const message = Buffer.from(JSON.stringify(messagePayload));

            console.log(`Publishing event to exchange: ticket_exchange, routingKey: ${routingKey}, message: ${message.toString()}`);
            this.channel.publish('ticket_exchange', routingKey, message);
        } catch (error) {
            console.error('Error publishing event to RabbitMQ:', error);
        }
    }
}