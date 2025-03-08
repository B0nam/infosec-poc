import { ApiProperty } from "@nestjs/swagger";

export class CompanyDto {
      @ApiProperty()
      id: number;
    
      @ApiProperty()
      name?: string;
    
      @ApiProperty()
      domain?: string;

      constructor(id: number, name?: string, domain?: string) {
        this.id = id;
        this.name = name;
        this.domain = domain;
      }
}