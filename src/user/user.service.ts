import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { EncryptUtils } from 'src/utils/encrypt-util';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private encryptUtil: EncryptUtils
  ){}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    
    const pass = await this.encryptUtil.generateHash(user.password)
    
    user.password = pass
    user.created_at = new Date();
    user.modified_at = new Date();
    this.userRepository.save(user)
  }

  findAll() {
    const users = this.userRepository.find()
    return users
  }

  findOne(id: number) {
    const user = this.userRepository.findOneBy({id: id})

    if(!user){
      throw new NotFoundException(`Usuário não localizado!`)
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let uuser = updateUserDto
    if(updateUserDto.hasOwnProperty('password') && updateUserDto.password.length > 0){
      uuser.password = await this.encryptUtil.generateHash(updateUserDto.password)
    }
    const user = await this.userRepository.preload({id: id, ...uuser})
    user.modified_at = new Date();

    if(!user){throw new NotFoundException('Usuário não localizado!')}

    return this.userRepository.save(user)
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({id: id})

    if(!user){throw new NotFoundException('Usuário não localizado!')}

    return this.userRepository.remove(user)
  }
}
