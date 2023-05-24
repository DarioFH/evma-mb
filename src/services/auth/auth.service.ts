import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/dtos/auth/login.dto';

@Injectable()
export class AuthService {
    user: LoginDto = {login: "usuario@email.com", pass: "pass"}

    login(dados: LoginDto): boolean{
        if(dados.login === this.user.login && dados.pass === this.user.pass){
            return true;
        }
        return false;
    }
    
}
