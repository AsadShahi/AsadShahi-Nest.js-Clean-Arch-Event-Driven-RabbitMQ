import { Ticket } from "src/ticket/domain/entitities/Ticket";
import { TICKET_REPOSITORY, TicketRepository } from "src/ticket/domain/repositories/TicketRepository";
import { Inject, Injectable } from "@nestjs/common";
import { RabbitMqEventBus } from "src/ticket/infrastructure/event/RabbitMqEventBus";

@Injectable()

export class CreateTicketUseCase {
  constructor(
   @Inject(TICKET_REPOSITORY)
    private ticketRepository: TicketRepository,
    private readonly eventBus: RabbitMqEventBus,  // Use the RabbitMqEventBus directly here
  ) {}

  async execute(ticket: Ticket) {
    const createdTicket = await this.ticketRepository.create(ticket);
    await this.eventBus.publish({ ticketId: createdTicket.id, title: ticket.title }, 'ticket.created');
    return createdTicket;
  }
}
