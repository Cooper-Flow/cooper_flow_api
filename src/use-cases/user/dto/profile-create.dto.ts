import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';

export class ProfileCreateDTO {

    @IsNotEmpty()
    @IsString()
    name: string;

}
