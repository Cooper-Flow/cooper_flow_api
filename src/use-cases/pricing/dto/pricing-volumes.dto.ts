import { IsBoolean, IsDateString, IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';

export class PricingVolumesDTO {

    @IsNotEmpty()
    @IsString()
    producer_id: string;

    @IsOptional()
    @IsString()
    batch?: string;

    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    filter?: string;

    @IsOptional()
    @IsDateString()
    start_date?: string;

    @IsOptional()
    @IsDateString()
    end_date?: string;

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
