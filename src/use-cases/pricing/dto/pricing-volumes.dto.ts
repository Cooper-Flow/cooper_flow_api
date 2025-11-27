import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';

export class PricingVolumesDTO {
    @IsNotEmpty()
    @IsString()
    producer_id: string;

    @IsOptional()
    @IsString()
    batch: string;

    @IsOptional()
    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    filter: string;

    @IsNotEmpty()
    @IsNumber()
    page: number;

    @IsNotEmpty()
    @IsNumber()
    pageSize: number;

    @IsNotEmpty()
    @IsString()
    order: string;
}
