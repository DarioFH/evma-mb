import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from 'src/entities/events.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class EventService {

  constructor(
    @InjectRepository(Events) private eventRepository: Repository<Events>,
    @InjectRepository(Users) private userRepository: Repository<Users>
  ){}

  msgErrorEvent: string = 'Evento não localizado!'

  async create(createEventDto: CreateEventDto) {
    const user = await this.userRepository.findOneBy({id: createEventDto.organizerId})
    const event = this.eventRepository.create(createEventDto)
    console.log(createEventDto)
    if(!createEventDto.hasOwnProperty('max_event_tickets')){
      event.max_event_tickets = 0
    }

    if(!createEventDto.hasOwnProperty('is_active')){
      event.is_active = 1
    }
    event.created_at = new Date();
    event.modified_at = new Date();
    event.organizer = user
    this.eventRepository.save(event)
  }

  async findAll() {
    const events = await this.eventRepository.find();
    return events
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOneBy({id: id});
    if(!event) { throw new NotFoundException(this.msgErrorEvent)}
    return event
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.preload({id: id, ...updateEventDto})
    
    if(updateEventDto.hasOwnProperty('organizerId')){
      const user = await this.userRepository.findOneBy({id: updateEventDto.organizerId})
      event.organizer = user
    }
    
    if(!event){throw new NotFoundException(this.msgErrorEvent)}

    event.modified_at = new Date()
    return this.eventRepository.save(event);
  }

  async remove(id: number) {
    const event = await this.eventRepository.findOneBy({id: id})

    if(!event){throw new NotFoundException(this.msgErrorEvent)}

    return this.eventRepository.remove(event)
  }
}
