import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket/domain/entitities/Ticket';

@Module({
  imports: [TypeOrmModule.forRoot({

  type:'mysql',
    host:'localhost',
    
    port:3306,

    password:'',
    
    username:'root',
   database:'ticketsystem',

    synchronize:true,

    entities:[Ticket]


  }),
  
  TicketModule
],
  controllers: [AppController],
  providers: [AppService],

  
})
export class AppModule {}
