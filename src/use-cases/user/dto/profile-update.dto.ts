import { IsArray, IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';

export class ProfileUpdateDTO {

    @IsNotEmpty()
    @IsString()
    profile_id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsArray()
    permissions: Array<string>;

}
