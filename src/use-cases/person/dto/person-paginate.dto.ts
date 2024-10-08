
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';

export class PersonPaginateDTO {

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
    isUser: boolean;

    @IsNotEmpty()
    @IsBoolean()
    isProducer: boolean;

    @IsNotEmpty()
    @IsBoolean()
    isCustomer: boolean;
}
