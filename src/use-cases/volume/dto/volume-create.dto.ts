import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "@nestjs/class-validator";

export class VolumeCreateDTO {
    @IsOptional()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    entry_id: string;

    @IsNotEmpty()
    @IsString()
    product_id: string;

    @IsNotEmpty()
    @IsString()
    product_size: string;

    @IsNotEmpty()
    @IsString()
    product_type: string;

    @IsNotEmpty()
    @IsString()
    material_id: string;

    @IsNotEmpty()
    @IsString()
    location_id: string;

    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @IsNotEmpty()
    @IsBoolean()
    isStash: boolean;
}
