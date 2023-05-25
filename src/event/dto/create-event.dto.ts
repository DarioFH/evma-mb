import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateEventDto {

    @IsNotEmpty()
    organizerId: number;

    @IsNotEmpty()
    name: string;

    @IsOptional()
    max_event_tickets?: number;

    @IsNotEmpty()
    price: number;

    @IsOptional()
    is_active?: number;

    @IsNotEmpty()
    event_date: Date;

}
