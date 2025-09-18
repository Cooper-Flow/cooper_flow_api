import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';

export class LocationChangeLocationDTO {

    @IsNotEmpty()
    @IsString()
    location_id: string;

    @IsNotEmpty()
    @IsString()
    new_sector_id: string;
}
