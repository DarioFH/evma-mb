import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { JwtConstants } from './jwtConstants.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async signIn(user: string, pass: string){
        const u = await this.userService.auth(user, pass)

        const payload = {sub: u.id, username: u.name}

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
