import { IsNotEmpty, IsNumber, IsString } from "@nestjs/class-validator";

export class TransformationDTO {
    @IsNotEmpty()
    @IsNumber()
    entry_id: number;
}
