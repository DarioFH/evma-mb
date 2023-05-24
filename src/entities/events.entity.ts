import { Column, Double, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import {Users} from './users.entity'
import {CustomersTicket} from './customers-ticket.entity'

@Entity()
export class Events {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;
    
    @Column()
    max_event_tickets: number;
    
    @Column({type: 'double'})
    price: number;
    
    @Column({
        type: "integer",
        default: 1
    })
    is_active: number;
    
    @Column()
    event_date: Date;
    
    @Column()
    created_at: Date;
    
    @Column()
    modified: Date;
    
    @ManyToOne(() => Users, (user) => user.events)
    organizer: Users

    @OneToMany(() => CustomersTicket, (ct) => ct.events)
    tickets: CustomersTicket[]
}