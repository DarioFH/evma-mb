import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Events} from './events.entity'
import {CustomersTicket} from './customers-ticket.entity'

@Entity()
export class Users {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    created_at: Date;

    @Column({ nullable: true })
    modified_at?: Date

    @OneToMany(() => Events, (event) => event.organizer)
    events: Events[]

    @OneToMany(() => CustomersTicket, (ct) => ct.customer)
    tickets: CustomersTicket[]
}