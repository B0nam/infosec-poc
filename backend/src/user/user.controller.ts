import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Response, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CompanyDto } from 'src/company/dto/company.dto';
import { UserDetailsDto } from './dto/user-details.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: [UserDto]})
  async findAll() {
    const users = await this.userService.findAll();
    return users.map(user =>  new UserDto(user))
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDetailsDto })
  async findOne(@Param('id') id: string) {
    const user: User = await this.userService.findOne(+id);
    return new UserDetailsDto(user);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserDto })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user: User = await this.userService.update(+id, updateUserDto);
    return new UserDto(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.userService.remove(+id)
  }
}
