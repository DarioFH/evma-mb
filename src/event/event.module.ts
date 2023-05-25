import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from 'src/entities/events.entity';
import { Users } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Events, Users])],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
