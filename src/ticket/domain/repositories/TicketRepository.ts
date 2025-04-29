import { Ticket } from "../entitities/Ticket";
// this is a contract what should dodo 
// Repository Interfaces

export const TICKET_REPOSITORY =Symbol('TICKET_REPOSITORY')

export interface TicketRepository{


    create(ticket:Ticket):Promise<Ticket>
    findById(id: number): Promise<Ticket | null>;

    findAll(): Promise<Ticket[]>;

    update(ticket:Ticket):Promise<Ticket>


   delete(id:number):Promise<void>

}

