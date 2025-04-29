import { TicketRepository } from "src/ticket/domain/repositories/TicketRepository";
import { Ticket } from "src/ticket/domain/entitities/Ticket";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";



export class TicketRepositoryImpls implements TicketRepository{

  constructor(

      @InjectRepository(Ticket)
      private readonly ticketRepo: Repository<Ticket>,
  ){}





    async create(ticket: Ticket): Promise<Ticket> {
        return await this.ticketRepo.save(ticket)
    }

    async findById(id: number): Promise<Ticket | null> {
        return await this.ticketRepo.findOneBy({ id });
      }

    async findAll(): Promise<Ticket[]> {

        return await this.ticketRepo.find();

      }


    async delete(id: number): Promise<void> {
         await this.ticketRepo.delete(id)
    }

    async update(ticket: Ticket): Promise<Ticket> {
        await this.ticketRepo.update({ id: ticket.id }, ticket);
        return ticket;
    }
    
    
}