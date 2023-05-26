import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Events } from 'src/entities/events.entity';
import { CustomersTicket } from 'src/entities/customers-ticket.entity';
import { EncryptUtils } from 'src/utils/encrypt-util';

@Module({
  imports:[TypeOrmModule.forFeature([Users, Events, CustomersTicket])],
  controllers: [TicketController],
  providers: [TicketService, EncryptUtils]
})
export class TicketModule {}
