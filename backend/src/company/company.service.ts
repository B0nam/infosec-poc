import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  private readonly companyRepository: Repository<Company>;
  constructor(@InjectRepository(Company) companyRepository: Repository<Company>) {
    this.companyRepository = companyRepository;
  }

  async create(createCompanyDto: CreateCompanyDto) {
    const company: Company | null = await this.companyRepository.findOne({
      where: [
        {
          domain: createCompanyDto.domain
        },
        {
          name: createCompanyDto.name
        }
      ]
    });

    if (company != null) throw new BadRequestException('Nome ou dominio de empresa já cadastrado');

    const newCompany: Company = await this.companyRepository.create(createCompanyDto)
    return await this.companyRepository.save(newCompany);
  }

  async findAll() {
    return await this.companyRepository.find();
  }

  async findOne(id: number) {
    const company: Company | null = await this.companyRepository.findOne({
      where: {
        id: id
      }
    });
    if (company == null) throw new BadRequestException(`Empresa não encontrada com o id: ${id}`);
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const company: Company = await this.findOne(id);
    await this.companyRepository.update({ id: id }, updateCompanyDto)
    return await this.findOne(id);
  }

  async remove(id: number): Promise<Company> {
    const company: Company = await this.findOne(id);
    await this.companyRepository.delete({ id: id })
    return company;
  }
}
