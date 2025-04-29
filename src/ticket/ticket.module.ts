    import { Module } from '@nestjs/common';
    import { TicketController } from './interface/controllers/TikcetContrller';
    import { TicketRepositoryImpls } from './infrastructure/repositories/TicketRepositoryImpls';
    import { CreateTicketUseCase } from './application/usecases/CreateTicketUseCase';
    import { GetTicketUseCase } from './application/usecases/GetTicketUseCase';
    import { RabbitMqEventBus } from './infrastructure/event/RabbitMqEventBus';
    import { TicketEventsConsumer } from './infrastructure/event/TicketEventsConsumer';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { Ticket } from './domain/entitities/Ticket';
    import { TICKET_REPOSITORY } from './domain/repositories/TicketRepository';


    @Module({
        imports:[TypeOrmModule.forFeature([Ticket])],
        controllers: [TicketController,TicketEventsConsumer],

    providers: [

        TicketRepositoryImpls,
        CreateTicketUseCase,
       
        GetTicketUseCase,
        RabbitMqEventBus,
      
        //register repository
        {
            provide:TICKET_REPOSITORY,
            useClass:TicketRepositoryImpls
        }

    ],
    })
    export class TicketModule {}
