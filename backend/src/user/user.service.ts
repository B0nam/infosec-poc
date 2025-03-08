import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly userRepository: Repository<User>;
  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User | null = await this.userRepository.findOne({
      where: [
        {
          email: createUserDto.email
        },
        {
          username: createUserDto.username
        }
      ]
    });

    if (user != null) throw new BadRequestException('Email ou nome de usuário já cadastrado');
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);

    const newUser: User = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['company'],
      select: {
        id: true,
        email: true,
        username: true,
        company: {
          id: true
        }
      }
    });
  }

  async findOne(id: number): Promise<User> {
    const user: User | null = await this.userRepository.findOne({
      where: { id },
      relations: ['company']
    });
    
    if (!user) throw new BadRequestException(`Usuário não encontrado com o id: ${id}`);
    
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.findOne(id);
    updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
    await this.userRepository.update({ id: id }, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<User> {
    const user: User = await this.findOne(id);
    await this.userRepository.delete({ id: id });
    return user
  }

  async findOneByEmail(email: string): Promise<User> {
    const user: User | null = await this.userRepository.findOne({
      where: {
        email: email
      }
    });
    if (user == null) throw new BadRequestException(`Usuário não encontrado com o email: ${email}`);
    return user;
  }

}
