import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Response, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map(user => new GetUserDto(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user: User = await this.userService.findOne(+id);
    return new GetUserDto(user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user: User = await this.userService.update(+id, updateUserDto);
    return new GetUserDto(user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(+id)
  }
}
