import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateTicketUseCase } from "src/ticket/application/usecases/CreateTicketUseCase";
import { GetTicketUseCase } from "src/ticket/application/usecases/GetTicketUseCase";

@Controller('tickets')
export class TicketController {
  constructor( 
    private readonly createTicketUseCase: CreateTicketUseCase,
    private readonly getTicketUseCase: GetTicketUseCase,
  ) {}

  @Post()
  async create(@Body() body: any, @Res() res: Response) {
    console.log('Request body:', body); 
    try {
      const ticket = await this.createTicketUseCase.execute(body);
      return res.status(HttpStatus.CREATED).json(ticket);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create ticket' });
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    try {
      const ticket = await this.getTicketUseCase.execute(Number(id));

      if (!ticket) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "Ticket Not Found" });
      }

      return res.json(ticket);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}
