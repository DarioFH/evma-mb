import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import {Events} from './events.entity'
import {Users} from './users.entity'

export enum TicketStatus {
    CREATED = 'C',
    REJECTED = 'R',
    DONE = 'D'
}

@Entity()
export class CustomersTicket {

    @PrimaryColumn()
    id: string;

    @Column({type: 'double'})
    price: number;

    @Column()
    status: TicketStatus;

    @Column()
    created_at: Date;

    @Column()
    modified_at: Date;

    @ManyToOne(()=> Users, (user) => user.tickets)
    customer: Users

    @ManyToOne(() => Events, (event) => event.tickets)
    events: Events
}