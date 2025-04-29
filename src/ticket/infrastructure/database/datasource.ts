import { Ticket } from "src/ticket/domain/entitities/Ticket";
import { DataSource } from "typeorm";

export const AppDataSource= new DataSource({
    type:'mysql',
    host:'localhost',
    
    port:3306,

    password:'',
    
    username:'root',
   database:'ticketsystem',

    synchronize:true,

    entities:[Ticket]

})