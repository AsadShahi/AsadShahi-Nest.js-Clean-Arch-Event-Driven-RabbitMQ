import { Ticket } from "src/ticket/domain/entitities/Ticket";
import { TicketRepository } from "src/ticket/domain/repositories/TicketRepository";
export class UpdateTicketUseCases{
    constructor(private ticketRepository:TicketRepository){}
    async execute(ticket:Ticket):Promise <Ticket> {
        

        return await this.ticketRepository.update(ticket)
        
    }
}