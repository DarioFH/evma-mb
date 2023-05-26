import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersTicket } from 'src/entities/customers-ticket.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { Events } from 'src/entities/events.entity';
import { EncryptUtils } from 'src/utils/encrypt-util';

@Injectable()
export class TicketService {

  msgErrorCreate:string = 'Usuário e/ou Evento Informado é inválido!'
  msgErrorTicket:string = 'Ticket informado não localizado!'

  constructor(
    @InjectRepository(CustomersTicket) private customerTicketRepository: Repository<CustomersTicket>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Events) private eventRepository: Repository<Events>,
    private readonly encryptUtils: EncryptUtils
  ){}

  async create(createTicketDto: CreateTicketDto) {
    const user = await this.userRepository.findOneBy({id: createTicketDto.customerId});
    const event = await this.eventRepository.findOneBy({id: createTicketDto.eventId});
    const ticket = this.customerTicketRepository.create(createTicketDto);
    if(!user || !event){throw new NotFoundException(this.msgErrorCreate)};

    ticket.id = await this.encryptUtils.generateUuid();
    ticket.customer = user;
    ticket.events = event;

    if(!ticket.hasOwnProperty('price')){
      ticket.price = event.price
    }

    if(!ticket.hasOwnProperty('status')){
      ticket.status = 'C'
    }

    ticket.created_at = new Date();
    ticket.modified_at = new Date();

    return this.customerTicketRepository.save(ticket)
  }

  findAll() {
    return this.customerTicketRepository.find();
  }

  async findOne(id: string) {
    const ticket = await this.customerTicketRepository.findOneBy({id: id})

    if(!ticket){throw new NotFoundException(this.msgErrorTicket)}

    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.customerTicketRepository.preload({id: id, ...updateTicketDto})

    if(updateTicketDto.hasOwnProperty('customerId')){
      ticket.customer = await this.userRepository.findOneBy({id: updateTicketDto.customerId})
    }

    if(updateTicketDto.hasOwnProperty('eventId')){
      ticket.events = await this.eventRepository.findOneBy({id: updateTicketDto.eventId})
      ticket.price = ticket.events.price
    }

    if(updateTicketDto.hasOwnProperty('price')){
      ticket.price = ticket.events.price
    }

    ticket.modified_at = new Date();
    return this.customerTicketRepository.save(ticket)
  }

  async remove(id: string) {
    const ticket = await this.customerTicketRepository.findOneBy({id: id});

    if(!ticket){throw new NotFoundException(this.msgErrorTicket)}

    return this.customerTicketRepository.remove(ticket)
  }
}
