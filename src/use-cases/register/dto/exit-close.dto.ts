import { IsArray, IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { isFloat64Array } from 'util/types';

export class ExitCloseDTO {
    @IsNotEmpty()
    @IsNumber()
    exit_id: number;

    @IsNotEmpty()
    @IsString()
    date: string;

    @IsNotEmpty()
    @IsString()
    invoice: string;

    @IsNotEmpty()
    @IsArray()
    volumes: Array<string>;
}


