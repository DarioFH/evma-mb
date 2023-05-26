import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateTicketDto {

    @IsOptional()
    price?: number;

    @IsOptional()
    status?: string;

    @IsNotEmpty()
    customerId: number;

    @IsNotEmpty()
    eventId: number;
}
