import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';

export class PricingPaginateDTO {

    @IsNotEmpty()
    @IsString()
    search: string;

    @IsNotEmpty()
    @IsNumber()
    page: number;

    @IsNotEmpty()
    @IsNumber()
    pageSize: number;

    @IsNotEmpty()
    @IsString()
    order: string;

    @IsNotEmpty()
    @IsBoolean()
    traceable: boolean

    @IsNotEmpty()
    @IsString()
    producer_id: string;
}
