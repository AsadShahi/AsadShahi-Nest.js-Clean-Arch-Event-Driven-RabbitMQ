import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller()
export class TicketEventsConsumer {
    @EventPattern('ticket.created')
    async handleTicketCreated(@Payload() data: any) {
        console.log('Received ticket created event:', data);
        if (!data) {
            console.error('No data received in ticket.created event');
        } else {
            console.log('Event data is valid:', data);
        }
    }
}