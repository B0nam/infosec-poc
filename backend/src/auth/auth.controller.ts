import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';
import { SignInDto } from './dtos/sign-in.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtTokenDto } from './dtos/jwt-token.dto';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: JwtTokenDto })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}