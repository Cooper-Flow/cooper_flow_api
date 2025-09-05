import { IsNotEmpty, IsNumber, IsString } from "@nestjs/class-validator";

export class PricingDetailDTO {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
