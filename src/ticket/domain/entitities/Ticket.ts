
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('tickets')
export class Ticket{

    @PrimaryGeneratedColumn()
    id:number


    @Column()
    title:string

    @Column()
    discreption:string


    @Column()
    price:number

}

// vlidatePrice(if price<0){
//     throw new error(
//         'price should not be lesstan zero'
//     )
// }