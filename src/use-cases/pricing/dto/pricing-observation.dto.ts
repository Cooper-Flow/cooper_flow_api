import { IsNotEmpty, IsNumber, IsString } from "@nestjs/class-validator";

export class PricingObservationDTO {
    @IsNotEmpty()
    @IsNumber()
    pricing_id: number;

    @IsNotEmpty()
    @IsString()
    observation: string;

    @IsNotEmpty()
    @IsString()
    type: string;
}
