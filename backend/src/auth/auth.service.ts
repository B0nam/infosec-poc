import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtTokenDto } from './dtos/jwt-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<JwtTokenDto> {

    const user = await this.usersService.findOneByEmail(email);
    if (!bcrypt.compareSync(pass, user.password, 10)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}