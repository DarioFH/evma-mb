import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoginDto } from 'src/dtos/auth/login.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authServices: AuthService) {}

    @Post()
    login(@Body() login: LoginDto): string{
        if(this.authServices.login(login)){
            return "logado com sucesso!"
        }else{
            return "usuário ou senha errados!"
        }
    }

    @Get(':id')
    findById(@Param() params): string {
        return `enviado na url: ${params.id}`
    }


}
