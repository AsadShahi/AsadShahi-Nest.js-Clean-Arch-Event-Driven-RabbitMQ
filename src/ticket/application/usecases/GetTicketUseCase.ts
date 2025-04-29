import { TicketRepository } from "src/ticket/domain/repositories/TicketRepository";

export class GetTicketUseCase{
    
    constructor (private ticketRepository:TicketRepository){}

    async execute(id:number){
        return await this.ticketRepository.findById(id)
        
    }
}