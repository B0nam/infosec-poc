import { Injectable } from '@nestjs/common';
import { CreateDangerDto } from './dto/create-danger.dto';
import { UpdateDangerDto } from './dto/update-danger.dto';

@Injectable()
export class DangersService {
  create(createDangerDto: CreateDangerDto) {
    return 'This action adds a new danger';
  }

  findAll() {
    return `This action returns all dangers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} danger`;
  }

  update(id: number, updateDangerDto: UpdateDangerDto) {
    return `This action updates a #${id} danger`;
  }

  remove(id: number) {
    return `This action removes a #${id} danger`;
  }
}
