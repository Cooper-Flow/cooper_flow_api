import { IsArray, IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';

export class PricingCreateDTO {
    
    @IsNotEmpty()
    @IsString()
    @IsArray()
    volumes: Array<string>;
}
