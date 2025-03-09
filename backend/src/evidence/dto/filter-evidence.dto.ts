import { Type } from "class-transformer";
import { IsOptional, IsInt, Min } from "class-validator";

export class FilterEvidencesDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    dangerId?: number;
}