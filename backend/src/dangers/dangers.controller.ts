import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DangersService } from './dangers.service';
import { CreateDangerDto } from './dto/create-danger.dto';
import { UpdateDangerDto } from './dto/update-danger.dto';

@Controller('dangers')
export class DangersController {
  constructor(private readonly dangersService: DangersService) {}

  @Post()
  create(@Body() createDangerDto: CreateDangerDto) {
    return this.dangersService.create(createDangerDto);
  }

  @Get()
  findAll() {
    return this.dangersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dangersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDangerDto: UpdateDangerDto) {
    return this.dangersService.update(+id, updateDangerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dangersService.remove(+id);
  }
}
