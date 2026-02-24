
import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateEnterDTO {

    @IsNotEmpty()
    @IsString()
    amount: number;

}
