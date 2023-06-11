import { Body, Controller, Post, Request, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.auth.dto';
import { Public } from './auth.skipAuth';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
    ) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto){
    return this.authService.signIn(loginDto.user, loginDto.pass)
  }

  @Get('profile')
  async profile(@Request() req) {
    return req.user
  }
}
